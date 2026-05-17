import React, { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { motion } from "framer-motion";
import { User, Mail, Calendar, LogOut, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, logout } = useAuth();
  const [chatCount, setChatCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id || !supabase) return;
    supabase
      .from("chats")
      .select("id,is_favourite")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const chats = data || [];
        setChatCount(chats.length);
        setFavCount(chats.filter((c) => c.is_favourite).length);
      });
  }, [user?.id]);

  const getInitial = () => {
    if (!user?.full_name) return "U";
    return user.full_name.charAt(0).toUpperCase();
  };

  const joinDate = user?.created_date
    ? new Date(user.created_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-14 px-4 py-16 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Avatar card */}
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-foreground flex items-center justify-center mb-4 shadow-md">
              <span className="text-3xl font-bold text-background">{getInitial()}</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{user?.full_name || "User"}</h1>
            <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
            <div className="mt-1">
              <span className="text-[11px] font-medium bg-accent text-muted-foreground px-3 py-1 rounded-full">
                {user?.role === "admin" ? "Admin" : "Free Plan"}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{chatCount}</p>
                <p className="text-xs text-muted-foreground">Total Chats</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Star className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{favCount}</p>
                <p className="text-xs text-muted-foreground">Favourites</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <p className="text-sm font-semibold text-foreground">Account Details</p>
            </div>
            <div className="divide-y divide-border">
              <div className="px-6 py-4 flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="text-sm font-medium text-foreground">{user?.full_name || "—"}</p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{user?.email || "—"}</p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium text-foreground">{joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-border text-foreground hover:bg-accent h-11"
              onClick={() => navigate("/pricing")}
            >
              Upgrade to Pro
            </Button>
            <Button
              className="flex-1 rounded-xl bg-destructive text-white hover:bg-destructive/85 h-11"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}