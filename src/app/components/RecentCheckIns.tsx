import React from "react";
import { CheckCircle2, Clock, MoreHorizontal } from "lucide-react";

export function RecentCheckIns() {
  const checkins = [
    {
      id: "R-1029",
      guestName: "Emma Thompson",
      room: "402",
      type: "Executive Suite",
      time: "10:15 AM",
      status: "checked-in",
      avatar: "ET",
      color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800",
    },
    {
      id: "R-1030",
      guestName: "Michael Chen",
      room: "215",
      type: "Deluxe King",
      time: "11:30 AM",
      status: "checked-in",
      avatar: "MC",
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800",
    },
    {
      id: "R-1031",
      guestName: "Sarah & John Davis",
      room: "305",
      type: "Twin Standard",
      time: "12:45 PM",
      status: "pending",
      avatar: "SD",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
    },
    {
      id: "R-1032",
      guestName: "Robert Wilson",
      room: "510",
      type: "Deluxe King",
      time: "1:20 PM",
      status: "checked-in",
      avatar: "RW",
      color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800",
    },
    {
      id: "R-1033",
      guestName: "Elena Rodriguez",
      room: "208",
      type: "Deluxe King",
      time: "2:05 PM",
      status: "pending",
      avatar: "ER",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">5 Arrivals Today</span>
        <button className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">View All</button>
      </div>

      <div className="space-y-3">
        {checkins.map((checkin) => (
          <div key={checkin.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors duration-200 group relative cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${checkin.color}`}>
                  {checkin.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-tight">{checkin.guestName}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{checkin.id}</p>
                </div>
              </div>
              <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs mb-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2.5 transition-colors">
              <div>
                <span className="text-slate-400 block mb-0.5">Room</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{checkin.room}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Type</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 truncate block">{checkin.type}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Clock size={14} />
                <span>{checkin.time}</span>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md ${
                checkin.status === 'checked-in' 
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50' 
                  : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50'
              }`}>
                {checkin.status === 'checked-in' ? (
                  <>
                    <CheckCircle2 size={12} />
                    <span>Checked In</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    <span>Expected</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-2 py-2.5 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 dark:hover:border-cyan-700 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 transition-colors duration-200">
        + Walk-in Registration
      </button>
    </div>
  );
}
