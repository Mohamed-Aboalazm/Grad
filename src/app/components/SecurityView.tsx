import React, { useState } from "react";
import {
  Shield, Camera, Key, AlertTriangle, Lock, Unlock,
  User, Clock, CheckCircle2, XCircle, Eye, Activity,
  Wifi, Monitor, Bell, Search, RefreshCw, MapPin
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

const accessLogs = [
  { id: "LOG-4201", user: "Jane Smith",    role: "Admin",      action: "Login",         area: "ERP System",       time: "08:02", date: "2026-03-31", status: "Success", ip: "192.168.1.10" },
  { id: "LOG-4200", user: "Mark Chen",     role: "Front Desk", action: "Login",         area: "ERP System",       time: "07:58", date: "2026-03-31", status: "Success", ip: "192.168.1.22" },
  { id: "LOG-4199", user: "Unknown",       role: "—",          action: "Login Attempt", area: "Admin Portal",     time: "07:45", date: "2026-03-31", status: "Failed",  ip: "45.122.33.88" },
  { id: "LOG-4198", user: "Sara Lee",      role: "HK Staff",   action: "Room Access",   area: "Room 203",         time: "07:30", date: "2026-03-31", status: "Success", ip: "192.168.1.35" },
  { id: "LOG-4197", user: "James Liu",     role: "Security",   action: "CCTV View",     area: "Security Console", time: "07:00", date: "2026-03-31", status: "Success", ip: "192.168.1.40" },
  { id: "LOG-4196", user: "Unknown",       role: "—",          action: "Login Attempt", area: "Admin Portal",     time: "06:52", date: "2026-03-31", status: "Failed",  ip: "45.122.33.88" },
  { id: "LOG-4195", user: "Anna Gold",     role: "Security",   action: "Login",         area: "ERP System",       time: "22:05", date: "2026-03-30", status: "Success", ip: "192.168.1.40" },
  { id: "LOG-4194", user: "Tom Harvis",    role: "F&B Staff",  action: "Login",         area: "ERP System",       time: "08:55", date: "2026-03-30", status: "Success", ip: "192.168.1.28" },
];

const cctvCameras = [
  { id: "CAM-01", location: "Main Entrance",  status: "Live",    floor: "G",   health: 98 },
  { id: "CAM-02", location: "Lobby",          status: "Live",    floor: "G",   health: 95 },
  { id: "CAM-03", location: "Pool Area",      status: "Live",    floor: "G",   health: 91 },
  { id: "CAM-04", location: "Parking Lot A",  status: "Live",    floor: "B1",  health: 88 },
  { id: "CAM-05", location: "Parking Lot B",  status: "Offline", floor: "B1",  health: 0  },
  { id: "CAM-06", location: "Floor 1 Hallway",status: "Live",    floor: "1",   health: 97 },
  { id: "CAM-07", location: "Floor 2 Hallway",status: "Live",    floor: "2",   health: 96 },
  { id: "CAM-08", location: "Floor 3 Hallway",status: "Live",    floor: "3",   health: 94 },
  { id: "CAM-09", location: "Floor 4 / PH",   status: "Live",    floor: "4",   health: 99 },
  { id: "CAM-10", location: "Server Room",    status: "Live",    floor: "B2",  health: 100 },
  { id: "CAM-11", location: "Staff Entrance", status: "Maintenance", floor: "G", health: 0 },
  { id: "CAM-12", location: "Kitchen / F&B",  status: "Live",    floor: "G",   health: 92 },
];

const activeSessions = [
  { user: "Jane Smith",  role: "Admin",      since: "08:02", device: "Chrome / Windows", ip: "192.168.1.10", pages: 24 },
  { user: "Mark Chen",   role: "Front Desk", since: "07:58", device: "Chrome / MacOS",   ip: "192.168.1.22", pages: 12 },
  { user: "James Liu",   role: "Security",   since: "07:00", device: "Firefox / Linux",  ip: "192.168.1.40", pages: 8  },
  { user: "Tom Harvis",  role: "F&B Staff",  since: "09:02", device: "Chrome / Android", ip: "192.168.1.28", pages: 5  },
];

const alertTrendData = [
  { hour: "00:00", alerts: 0 },
  { hour: "03:00", alerts: 2 },
  { hour: "06:00", alerts: 1 },
  { hour: "09:00", alerts: 0 },
  { hour: "12:00", alerts: 1 },
  { hour: "15:00", alerts: 0 },
  { hour: "18:00", alerts: 3 },
  { hour: "21:00", alerts: 1 },
];

const securityAlerts = [
  { level: "High",   title: "Multiple Failed Login Attempts",   desc: "IP 45.122.33.88 — 3 attempts in 10 minutes",   time: "07:45", icon: AlertTriangle },
  { level: "Medium", title: "CCTV Offline — CAM-05",            desc: "Parking Lot B camera went offline",            time: "06:30", icon: Camera },
  { level: "Low",    title: "CAM-11 Under Maintenance",         desc: "Staff Entrance camera scheduled maintenance",  time: "01:00", icon: Camera },
  { level: "High",   title: "Unauthorized Area Scan Detected",  desc: "Unusual QR badge scan attempt on Floor 4",     time: "03:15", icon: Key },
];

const levelColor: Record<string, string> = {
  High:   "bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-700/40",
  Medium: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700/40",
  Low:    "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/40",
};

export function SecurityView() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const liveCams = cctvCameras.filter(c => c.status === "Live").length;
  const failedLogins = accessLogs.filter(l => l.status === "Failed").length;

  const filteredLogs = accessLogs.filter(l =>
    (filterStatus === "All" || l.status === filterStatus) &&
    (!search || l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50 dark:bg-[#1A1D24]">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1e2128] border-b border-slate-200 dark:border-slate-700/50 shrink-0 transition-colors duration-200">
        <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Security Center</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/15 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">System Secure</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            { label: "CCTV Online",       value: `${liveCams}/${cctvCameras.length}`, icon: Camera,  color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-500/15", sub: "cameras live" },
            { label: "Active Sessions",   value: activeSessions.length,              icon: Monitor, color: "text-cyan-600 dark:text-cyan-400",       bg: "bg-cyan-100 dark:bg-cyan-500/15",       sub: "logged in now" },
            { label: "Failed Logins",     value: failedLogins,                       icon: XCircle, color: "text-rose-600 dark:text-rose-400",       bg: "bg-rose-100 dark:bg-rose-500/15",       sub: "today" },
            { label: "Security Alerts",   value: securityAlerts.length,              icon: Bell,    color: "text-amber-600 dark:text-amber-400",     bg: "bg-amber-100 dark:bg-amber-500/15",     sub: "unresolved" },
          ].map(({ label, value, icon: Icon, color, bg, sub }) => (
            <div key={label} className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Alerts */}
        <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Security Alerts — Today</h3>
          <div className="space-y-3">
            {securityAlerts.map((alert, i) => (
              <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${levelColor[alert.level]}`}>
                <alert.icon size={18} className="mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">{alert.title}</p>
                    <span className="text-xs opacity-70">{alert.time}</span>
                  </div>
                  <p className="text-xs mt-0.5 opacity-80">{alert.desc}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  alert.level === "High" ? "bg-rose-500 text-white" :
                  alert.level === "Medium" ? "bg-amber-500 text-white" : "bg-slate-400 text-white"
                }`}>{alert.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Charts + Sessions Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Alert Trend */}
          <div className="xl:col-span-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Security Event Timeline — Today</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Alert frequency by hour</p>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={alertTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="alertGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} />
                <Area type="monotone" dataKey="alerts" name="Security Events" stroke="#f43f5e" strokeWidth={2} fill="url(#alertGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Active Sessions */}
          <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Active Sessions</h3>
            <div className="space-y-3">
              {activeSessions.map((s, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-[#1A1D24] rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{s.user}</p>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Live</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.role} · since {s.since}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{s.device}</p>
                  <p className="text-xs font-mono text-slate-400 dark:text-slate-500">{s.ip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CCTV Grid */}
        <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">CCTV Monitoring Grid</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{liveCams} of {cctvCameras.length} cameras online</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Live</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Offline</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Maintenance</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {cctvCameras.map(cam => (
              <div key={cam.id}
                className={`rounded-xl border overflow-hidden ${
                  cam.status === "Live" ? "border-emerald-200 dark:border-emerald-700/40" :
                  cam.status === "Offline" ? "border-rose-200 dark:border-rose-700/40" :
                  "border-amber-200 dark:border-amber-700/40"
                }`}>
                {/* Fake Camera View */}
                <div className={`h-20 relative flex items-center justify-center ${
                  cam.status === "Live" ? "bg-slate-900" :
                  cam.status === "Offline" ? "bg-slate-800" : "bg-slate-800"
                }`}>
                  {cam.status === "Live" ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-80" />
                      <Camera size={20} className="text-slate-400 relative z-10" />
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs text-white/70 font-mono">REC</span>
                      </div>
                    </>
                  ) : cam.status === "Offline" ? (
                    <XCircle size={20} className="text-rose-400" />
                  ) : (
                    <Activity size={20} className="text-amber-400" />
                  )}
                  <span className={`absolute bottom-2 right-2 text-xs px-1.5 py-0.5 rounded font-bold ${
                    cam.status === "Live" ? "bg-emerald-500 text-white" :
                    cam.status === "Offline" ? "bg-rose-500 text-white" : "bg-amber-500 text-white"
                  }`}>{cam.status}</span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{cam.id}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-slate-400" />
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{cam.location}</p>
                  </div>
                  {cam.status === "Live" && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${cam.health}%` }} />
                      </div>
                      <span className="text-xs text-slate-400">{cam.health}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Log Table */}
        <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 flex flex-col gap-3 sm:flex-row sm:items-center">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Access Logs</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:ml-auto w-full sm:w-auto">
              <div className="relative w-full sm:w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search logs..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20" />
              </div>
              <div className="relative w-full sm:w-auto">
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                  className="w-full sm:w-auto appearance-none pl-3 pr-8 py-2 text-sm bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">
                  {["All", "Success", "Failed"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-[#1A1D24]">
                {["Log ID", "User", "Role", "Action", "Area", "IP Address", "Time", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id} className="border-b border-slate-50 dark:border-slate-700/20 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400">{log.id}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{log.user}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{log.role}</td>
                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300">{log.action}</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{log.area}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400">{log.ip}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{log.time}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
                      log.status === "Success"
                        ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : "bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400"
                    }`}>
                      {log.status === "Success" ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
