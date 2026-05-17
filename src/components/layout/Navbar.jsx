import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, LogOut, User, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LimitModal from "../chat/LimitModal";
import { useAuth } from "@/lib/AuthContext";

export default function Navbar({ onToggleSidebar, showSidebar, hideNav }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [templatesNavContext, setTemplatesNavContext] = useState(() => {
    if (typeof window === "undefined") return "landing";
    return window.sessionStorage.getItem("templates_nav_context") || "landing";
  });
  const isTemplatesPage = location.pathname === "/templates";
  const isAppPage = location.pathname === "/app";
  const isAppNav =
    isAppPage ||
    location.pathname === "/profile" ||
    (isTemplatesPage && templatesNavContext === "app");
  const { user, isAuthenticated, navigateToLogin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getInitial = () => {
    if (!user?.full_name) return "U";
    return user.full_name.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    logout();
  };

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      navigate("/app");
    } else {
      navigateToLogin();
    }
  };

  const setNavContext = (context) => {
    setTemplatesNavContext(context);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("templates_nav_context", context);
    }
  };

  // Hide navbar when a modal/popup is open
  if (hideNav) return null;

  if (isAppNav) {
    return (
      <>
        <LimitModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
        <nav className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-border bg-background/90 backdrop-blur-xl flex items-center px-4">
          {/* Left: sidebar toggle + logo */}
          <div className="flex items-center gap-3 w-48">
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            >
              {showSidebar ? <X className="w-5 h-5 text-muted-foreground" /> : <Menu className="w-5 h-5 text-muted-foreground" />}
            </button>
            <Link to="/app" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-background" />
              </div>
              <span className="font-bold text-foreground text-sm tracking-tight">PromptWise</span>
            </Link>
          </div>

          {/* Center: Chat + Templates */}
          <div className="flex-1 flex items-center justify-center gap-6">
            <Link
              to="/app"
              onClick={() => setNavContext("app")}
              className={`text-sm transition-colors pb-1 border-b-2 ${
                isAppPage
                  ? "text-foreground border-black"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              Chat
            </Link>
            <Link
              to="/templates"
              onClick={() => setNavContext("app")}
              className={`text-sm transition-colors pb-1 border-b-2 ${
                isTemplatesPage
                  ? "text-foreground border-black"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              Templates
            </Link>
          </div>

          {/* Right: Upgrade + user menu */}
          <div className="flex items-center gap-3 w-48 justify-end" ref={menuRef}>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border text-xs h-8 px-3 hover:bg-accent text-foreground"
              onClick={() => setShowUpgradeModal(true)}
            >
              Upgrade
            </Button>
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 hover:bg-accent rounded-full p-1 pr-2 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center">
                  <span className="text-xs font-semibold text-background">{getInitial()}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-10 w-52 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-xs font-semibold text-foreground">{user?.full_name || "User"}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{user?.email || ""}</p>
                    </div>
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate("/profile"); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </>
    );
  }

  // Landing / public navbar
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto h-full flex items-center px-4">
        {/* Left: Logo */}
        <div className="w-40">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-background" />
            </div>
            <span className="font-bold text-foreground tracking-tight">PromptWise</span>
          </Link>
        </div>

        {/* Center: nav links — truly centered */}
        <div className="flex-1 flex items-center justify-center gap-8">
          <Link
            to="/templates"
            onClick={() => setNavContext("landing")}
            className={`text-sm transition-colors pb-1 border-b-2 ${
              isTemplatesPage
                ? "text-foreground border-black"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            Templates
          </Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </div>

        {/* Right: CTA */}
        <div className="w-40 flex items-center justify-end gap-3">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 hover:bg-accent rounded-full p-1 pr-2 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center">
                  <span className="text-xs font-semibold text-background">{getInitial()}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-10 w-52 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-xs font-semibold text-foreground">{user?.full_name || "User"}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{user?.email || ""}</p>
                    </div>
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate("/app"); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      Go to App
                    </button>
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate("/profile"); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              size="sm"
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs h-8 px-4 font-medium"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          )}
        </div>

        <button
          className="md:hidden p-1.5 rounded-lg hover:bg-accent transition-colors ml-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-3">
          <Link
            to="/templates"
            className="block text-sm text-muted-foreground hover:text-foreground"
            onClick={() => {
              setNavContext("landing");
              setMobileMenuOpen(false);
            }}
          >
            Templates
          </Link>
          <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Button size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs w-full" onClick={() => { handleGetStarted(); setMobileMenuOpen(false); }}>
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
}
