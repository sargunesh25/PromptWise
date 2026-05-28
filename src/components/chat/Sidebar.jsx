import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Clock, ChevronDown, ChevronRight, Trash2, Star as StarFilled, Plus } from "lucide-react";
import { supabase } from "@/api/supabaseClient";

export default function Sidebar({ chats, activeChat, onSelectChat, onNewChat, onRefresh }) {
  const [search, setSearch] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);
  const [showRecent, setShowRecent] = useState(true);

  const filteredChats = chats.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );
  const favourites = filteredChats.filter((c) => c.is_favourite);
  const recent = filteredChats.filter((c) => !c.is_favourite);

  const handleToggleFavourite = async (e, chat) => {
    e.stopPropagation();
    if (!supabase) return;
    await supabase
      .from("chats")
      .update({ is_favourite: !chat.is_favourite })
      .eq("id", chat.id);
    onRefresh();
  };

  const handleDelete = async (e, chat) => {
    e.stopPropagation();
    if (!supabase) return;
    await supabase.from("chats").delete().eq("id", chat.id);
    onRefresh();
  };

  return (
    <div className="h-full flex flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-sidebar-accent text-sm text-foreground transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Decision
        </button>
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search decisions..."
            className="w-full bg-input rounded-lg pl-8 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-4">
        {/* Favourites */}
        <div>
          <button
            onClick={() => setShowFavourites(!showFavourites)}
            className="flex items-center gap-2 w-full text-xs font-medium text-muted-foreground hover:text-foreground py-1.5 transition-colors"
          >
            {showFavourites ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            <Star className="w-3 h-3" />
            Favourites
          </button>
          <AnimatePresence>
            {showFavourites && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {favourites.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground pl-6 py-2">No favourites yet</p>
                ) : (
                  <div className="space-y-0.5 mt-1">
                    {favourites.map((chat) => (
                      <ChatItem
                        key={chat.id}
                        chat={chat}
                        active={activeChat === chat.id}
                        onSelect={() => onSelectChat(chat.id)}
                        onToggleFav={(e) => handleToggleFavourite(e, chat)}
                        onDelete={(e) => handleDelete(e, chat)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recent */}
        <div>
          <button
            onClick={() => setShowRecent(!showRecent)}
            className="flex items-center gap-2 w-full text-xs font-medium text-muted-foreground hover:text-foreground py-1.5 transition-colors"
          >
            {showRecent ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            <Clock className="w-3 h-3" />
            Recent Decisions
          </button>
          <AnimatePresence>
            {showRecent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {recent.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground pl-6 py-2">No decisions yet</p>
                ) : (
                  <div className="space-y-0.5 mt-1">
                    {recent.map((chat) => (
                      <ChatItem
                        key={chat.id}
                        chat={chat}
                        active={activeChat === chat.id}
                        onSelect={() => onSelectChat(chat.id)}
                        onToggleFav={(e) => handleToggleFavourite(e, chat)}
                        onDelete={(e) => handleDelete(e, chat)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ChatItem({ chat, active, onSelect, onToggleFav, onDelete }) {
  return (
    <div
      onClick={onSelect}
      className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors text-xs ${
        active ? "bg-sidebar-accent text-foreground font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
      }`}
    >
      <span className="flex-1 truncate">{chat.title || "Untitled"}</span>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onToggleFav} className="p-0.5 hover:text-yellow-400 transition-colors">
          <Star className={`w-3 h-3 ${chat.is_favourite ? "fill-yellow-400 text-yellow-400" : ""}`} />
        </button>
        <button onClick={onDelete} className="p-0.5 hover:text-destructive transition-colors">
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}