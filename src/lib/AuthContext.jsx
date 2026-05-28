import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { supabase, hasSupabaseConfig } from "@/api/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const hydrateUser = useCallback(async (authUser) => {
    if (!authUser || !hasSupabaseConfig) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    setAuthError(null);

    let profile = null;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, role, created_at")
        .eq("id", authUser.id)
        .single();

      if (error) {
        // PGRST116 = "no rows found" — the profile genuinely doesn't exist
        const isNotFound =
          error.code === "PGRST116" ||
          error.message?.includes("no rows") ||
          error.details?.includes("0 rows");

        if (isNotFound) {
          console.warn("[Auth] Profile not found for user:", authUser.id);
          setAuthError({ type: "user_not_registered", message: "Profile not found" });
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        // Any other error (network, RLS, timeout) — log it but don't block auth.
        // Fall through and use fallback data from the auth token.
        console.warn("[Auth] Profile fetch failed (non-fatal):", error.message);
      } else {
        profile = data;
      }
    } catch (fetchError) {
      // Network-level failure — still authenticate with fallback data
      console.warn("[Auth] Profile fetch threw (non-fatal):", fetchError);
    }

    setUser({
      id: authUser.id,
      email: authUser.email,
      full_name:
        profile?.full_name || authUser.user_metadata?.full_name || "User",
      role: profile?.role || "user",
      created_date: profile?.created_at || authUser.created_at,
    });
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let resolved = false;
    let listenerCleanup = null;

    const markReady = () => {
      if (!isMounted || resolved) return;
      resolved = true;
      setIsLoadingAuth(false);
      setAuthChecked(true);
    };

    if (!hasSupabaseConfig) {
      markReady();
      return;
    }

    // Safety timeout — never show spinner for more than 5s
    const safetyTimer = setTimeout(() => {
      if (!resolved) {
        console.warn("[Auth] Session restore timed out after 5s");
        markReady();
      }
    }, 5000);

    // Clean up stale localStorage entries from old Supabase projects
    try {
      const currentRef = import.meta.env.VITE_SUPABASE_URL?.match(
        /https:\/\/([^.]+)\.supabase/
      )?.[1];
      if (currentRef) {
        Object.keys(localStorage).forEach((key) => {
          if (
            key.startsWith("sb-") &&
            key.endsWith("-auth-token") &&
            !key.includes(currentRef)
          ) {
            console.log("[Auth] Removing stale session key:", key);
            localStorage.removeItem(key);
          }
        });
      }
    } catch (_) {
      // ignore
    }

    const init = async () => {
      try {
        // Step 1: Explicitly restore session from localStorage
        const {
          data: { session: restoredSession },
          error: sessionError,
        } = await supabase.auth.getSession();

        console.log(
          "[Auth] getSession result:",
          !!restoredSession?.user,
          sessionError?.message || "no error"
        );

        if (!isMounted) return;

        if (restoredSession?.user) {
          setSession(restoredSession);
          await hydrateUser(restoredSession.user);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("[Auth] getSession failed:", err);
      } finally {
        markReady();
      }

      // Step 2: Subscribe to live auth events (sign-in, sign-out, token refresh)
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, nextSession) => {
          if (!isMounted) return;
          // Skip the initial event — we already handled it via getSession()
          if (event === "INITIAL_SESSION") return;

          console.log("[Auth] onAuthStateChange:", event, !!nextSession?.user);

          try {
            setSession(nextSession);
            if (nextSession?.user) {
              await hydrateUser(nextSession.user);
            } else {
              setUser(null);
              setIsAuthenticated(false);
              setAuthError(null);
            }
          } catch (error) {
            console.error("[Auth] hydration error:", error);
            setSession(null);
            setUser(null);
            setIsAuthenticated(false);
            setAuthError({
              type: "auth_state_failed",
              message:
                error?.message || "Authentication state update failed.",
            });
          }
        }
      );
      listenerCleanup = listener;
    };

    init();

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      listenerCleanup?.subscription?.unsubscribe();
    };
  }, [hydrateUser]);

  const logout = async () => {
    // Immediately clear local auth state so UI reflects logout instantly.
    setSession(null);
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);

    if (!hasSupabaseConfig) return;

    try {
      // Local scope avoids waiting on cross-device/global revocation.
      await supabase.auth.signOut({ scope: "local" });
    } catch (error) {
      console.warn("[Auth] signOut failed:", error);
    }
  };

  const navigateToLogin = async () => {
    if (!hasSupabaseConfig) return;
    const provider = import.meta.env.VITE_SUPABASE_OAUTH_PROVIDER || "google";
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/app` },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        isLoadingAuth,
        authError,
        authChecked,
        logout,
        navigateToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
