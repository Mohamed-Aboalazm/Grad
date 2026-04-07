import React, { useState } from "react";
import { 
  Building2, 
  BarChart3, 
  ConciergeBell, 
  BedDouble, 
  Users, 
  Package, 
  UsersRound, 
  Calculator, 
  ShieldCheck, 
  Settings,
  SlidersHorizontal,
  MoreVertical,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const navItems = [
  { name: "Analytics", icon: BarChart3 },
  { name: "Front Desk", icon: ConciergeBell },
  { name: "Room Management", icon: BedDouble },
  { name: "Guest CRM", icon: Users },
  { name: "Inventory", icon: Package },
  { name: "Employee Affairs", icon: UsersRound },
  { name: "Accounting", icon: Calculator },
  { name: "Security", icon: ShieldCheck },
  { name: "Configuration", icon: SlidersHorizontal },
  { name: "Settings", icon: Settings },
];

export function Sidebar({ activeView, setActiveView, isDarkMode, toggleDarkMode }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`bg-white dark:bg-[#1e2128] border-r border-slate-200 dark:border-slate-700/50 flex flex-col h-full flex-shrink-0 z-20 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      {/* Logo Area */}
      <div className={`h-16 flex items-center border-b border-slate-100 dark:border-slate-700/50 transition-colors duration-200 ${isCollapsed ? "px-3 justify-center" : "px-6 justify-between"}`}>
        <div className="flex items-center gap-2 text-cyan-500 dark:text-cyan-400 min-w-0">
          <Building2 size={24} className="stroke-[2.5]" />
          {!isCollapsed && <span className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight">ERP Suite</span>}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            aria-label="Collapse navigation"
            title="Collapse navigation"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="px-3 py-3 border-b border-slate-100 dark:border-slate-700/50">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-full flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            aria-label="Expand navigation"
            title="Expand navigation"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = item.name === activeView;
          return (
            <button
              key={item.name}
              onClick={() => setActiveView(item.name)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isCollapsed ? "justify-center" : "gap-3"
              } ${
                isActive 
                  ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon size={18} className={isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-500"} />
              {!isCollapsed && item.name}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className={`py-2 border-t border-slate-100 dark:border-slate-700/50 transition-colors duration-200 ${isCollapsed ? "px-2" : "px-4"}`}>
        <button 
          onClick={toggleDarkMode} 
          className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors ${isCollapsed ? "justify-center" : "justify-between"}`}
          title={isCollapsed ? (isDarkMode ? "Dark Mode" : "Light Mode") : undefined}
        >
          <div className={`flex items-center ${isCollapsed ? "" : "gap-3"}`}>
            {isDarkMode ? <Moon size={18} className="text-cyan-400" /> : <Sun size={18} className="text-slate-400" />}
            {!isCollapsed && (isDarkMode ? 'Dark Mode' : 'Light Mode')}
          </div>
          {!isCollapsed && (
            <div className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${isDarkMode ? 'bg-cyan-500' : 'bg-slate-300'}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          )}
        </button>
      </div>

      {/* Admin Profile */}
      <div className={`border-t border-slate-100 dark:border-slate-700/50 transition-colors duration-200 ${isCollapsed ? "p-2" : "p-4"}`}>
        <div className={`flex p-2 hover:bg-slate-50 dark:hover:bg-slate-700/40 rounded-lg cursor-pointer transition-colors ${isCollapsed ? "items-center justify-center" : "items-center justify-between"}`} title={isCollapsed ? "Jane Smith - Admin" : undefined}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-sm border border-cyan-200 dark:border-cyan-800/50">
              JS
            </div>
            {!isCollapsed && (
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-none mb-1">Jane Smith</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-none">Admin</span>
              </div>
            )}
          </div>
          {!isCollapsed && <MoreVertical size={16} className="text-slate-400 dark:text-slate-500" />}
        </div>
      </div>
    </aside>
  );
}