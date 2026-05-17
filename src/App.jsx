import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { hasSupabaseConfig } from "@/api/supabaseClient";
import { useEffect, useRef } from "react";

import Landing from './pages/Landing';
import Templates from './pages/Templates';
import Pricing from './pages/Pricing';
import AppChat from './pages/AppChat';
import Profile from './pages/Profile';
import Payment from './pages/Payment';

const AuthenticatedApp = () => {
  const { isLoadingAuth, authError, isAuthenticated, authChecked, navigateToLogin } = useAuth();
  const location = useLocation();
  const protectedPaths = ["/app", "/profile"];
  const needsAuth = protectedPaths.some((p) => location.pathname.startsWith(p));
  const attemptedLoginRef = useRef(false);

  useEffect(() => {
    if (!authChecked || isLoadingAuth || isAuthenticated || !needsAuth || !hasSupabaseConfig) {
      return;
    }

    if (!attemptedLoginRef.current) {
      attemptedLoginRef.current = true;
      navigateToLogin();
    }
  }, [authChecked, isLoadingAuth, isAuthenticated, needsAuth, navigateToLogin]);

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-muted border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center space-y-3 max-w-md px-4">
          <p className="text-sm font-medium text-foreground">Authentication error</p>
          <p className="text-xs text-muted-foreground">
            {authError.message || "Unable to restore your session after refresh."}
          </p>
          <button
            onClick={navigateToLogin}
            className="text-xs font-medium text-foreground border border-border rounded-full px-3 py-1 hover:bg-accent"
          >
            Login Again
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && needsAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
          <p className="text-xs text-muted-foreground">
            If login popup is blocked, disable ad-block/privacy extension for localhost and try again.
          </p>
          {!hasSupabaseConfig && (
            <p className="text-xs text-muted-foreground">
              Supabase env is missing. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
            </p>
          )}
          <button
            onClick={navigateToLogin}
            className="text-xs font-medium text-foreground border border-border rounded-full px-3 py-1 hover:bg-accent"
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/app" element={<AppChat />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
