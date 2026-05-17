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

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("full_name, role, created_at")
      .eq("id", authUser.id)
      .single();

    if (error) {
      setAuthError({ type: "user_not_registered", message: "Profile not found" });
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
    if (!hasSupabaseConfig) {
      setIsLoadingAuth(false);
      setAuthChecked(true);
      return;
    }

    const bootstrapAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        setSession(data.session);
        if (data.session?.user) {
          await hydrateUser(data.session.user);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setSession(null);
        setUser(null);
        setIsAuthenticated(false);
        setAuthError({
          type: "auth_init_failed",
          message: error?.message || "Failed to initialize authentication.",
        });
      } finally {
        setIsLoadingAuth(false);
        setAuthChecked(true);
      }
    };

    bootstrapAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, nextSession) => {
        try {
          setSession(nextSession);
          setAuthError(null);
          if (nextSession?.user) {
            await hydrateUser(nextSession.user);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          setSession(null);
          setUser(null);
          setIsAuthenticated(false);
          setAuthError({
            type: "auth_state_failed",
            message: error?.message || "Authentication state update failed.",
          });
        } finally {
          setIsLoadingAuth(false);
          setAuthChecked(true);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [hydrateUser]);

  const logout = async () => {
    if (!hasSupabaseConfig) return;
    await supabase.auth.signOut();
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
