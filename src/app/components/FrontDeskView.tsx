import React from "react";
import { RegistrationForm } from "./RegistrationForm";
import { RecentCheckIns } from "./RecentCheckIns";
import { Search, Bell } from "lucide-react";

export function FrontDeskView() {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Top Header */}
      <header className="min-h-16 flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-200">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Front Desk</h1>
        
        <div className="flex w-full items-center gap-3 sm:w-auto sm:gap-6">
          <div className="relative flex-1 sm:w-64 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search reservations..."
              className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 dark:text-slate-200 placeholder:text-slate-400 transition-all"
            />
          </div>
          <button className="relative p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-slate-900"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 xl:flex-row xl:gap-8">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">New Registration</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Complete the 4-step process to check in a new guest.</p>
            </div>
          </div>
          <RegistrationForm />
        </div>
        
        <div className="w-full xl:w-80 xl:shrink-0 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Today's Activity</h2>
          <div className="max-h-none xl:max-h-[calc(100vh-220px)] xl:overflow-y-auto pr-0 xl:pr-1">
            <RecentCheckIns />
          </div>
        </div>
      </div>
    </div>
  );
}
