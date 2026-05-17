import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { hasSupabaseConfig } from "@/api/supabaseClient";
import { useEffect } from "react";

import Landing from './pages/Landing';
import Templates from './pages/Templates';
import Pricing from './pages/Pricing';
import AppChat from './pages/AppChat';
import Profile from './pages/Profile';
import Payment from './pages/Payment';

const AuthenticatedApp = () => {
  const { isLoadingAuth, authError, isAuthenticated, navigateToLogin } = useAuth();
  const location = useLocation();

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
  }

  const protectedPaths = ["/app", "/profile"];
  const needsAuth = protectedPaths.some((p) => location.pathname.startsWith(p));
  useEffect(() => {
    if (!isAuthenticated && needsAuth && hasSupabaseConfig) {
      navigateToLogin();
    }
  }, [isAuthenticated, needsAuth, navigateToLogin]);

  if (!isAuthenticated && needsAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
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