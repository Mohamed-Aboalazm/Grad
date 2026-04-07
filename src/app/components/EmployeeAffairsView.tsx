import React, { useState } from "react";
import {
  Users, UserCheck, Clock, Award, TrendingUp,
  Search, Plus, Filter, Star, Calendar,
  MoreVertical, ChevronDown, ArrowUpRight, Briefcase,
  DollarSign, Link2
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend
} from "recharts";
import {
  sharedEmployees as employees,
  totalMonthlyPayroll,
  payrollByDept,
  payrollExpenseTransactions,
} from "../data/erpData";

const departments = [
  { name: "Front Desk",    staff: 8,  present: 7, icon: "🛎️", color: "bg-cyan-100 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400" },
  { name: "Housekeeping",  staff: 14, present: 12, icon: "🧹", color: "bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  { name: "F&B",           staff: 10, present: 9,  icon: "🍽️", color: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  { name: "Security",      staff: 6,  present: 6,  icon: "🔐", color: "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400" },
  { name: "Maintenance",   staff: 5,  present: 4,  icon: "🔧", color: "bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400" },
  { name: "Management",    staff: 4,  present: 4,  icon: "💼", color: "bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400" },
];

const attendanceTrend = [
  { day: "Mon", present: 44, absent: 3 },
  { day: "Tue", present: 45, absent: 2 },
  { day: "Wed", present: 43, absent: 4 },
  { day: "Thu", present: 46, absent: 1 },
  { day: "Fri", present: 42, absent: 5 },
  { day: "Sat", present: 40, absent: 7 },
  { day: "Sun", present: 38, absent: 9 },
];

const performanceData = [
  { dept: "Front Desk",  score: 88 },
  { dept: "Housekeeping",score: 92 },
  { dept: "F&B",         score: 85 },
  { dept: "Security",    score: 90 },
  { dept: "Maintenance", score: 78 },
  { dept: "Management",  score: 95 },
];

const PIE_COLORS = ["#06b6d4", "#f59e0b", "#10b981", "#64748b", "#f43f5e", "#a855f7"];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "On Duty":  "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    "Off Duty": "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400",
    "On Leave": "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400",
  };
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${map[status] || ""}`}>{status}</span>
  );
}

export function EmployeeAffairsView() {
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const totalStaff = departments.reduce((s, d) => s + d.staff, 0);
  const presentToday = departments.reduce((s, d) => s + d.present, 0);
  const onLeave = employees.filter(e => e.status === "On Leave").length;

  const filtered = employees.filter(e =>
    (filterDept === "All" || e.dept === filterDept) &&
    (!search || e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()))
  );

  const pieData = departments.map(d => ({ name: d.name, value: d.staff }));

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50 dark:bg-[#1A1D24]">
      {/* Header */}
      <header className="h-auto sm:h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-0 bg-white dark:bg-[#1e2128] border-b border-slate-200 dark:border-slate-700/50 shrink-0 transition-colors duration-200 gap-3 sm:gap-0">
        <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Employee Affairs</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
            <Calendar size={14} /> Schedule
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors">
            <Plus size={14} /> Add Employee
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6">
        {/* Admin Dashboard KPIs */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">HR Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Abstract overview for the admin — today's workforce at a glance.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {[
              { label: "Total Staff",    value: totalStaff,                                    icon: Users,      color: "text-slate-600 dark:text-slate-300",      bg: "bg-slate-100 dark:bg-slate-700/50", sub: "Across all departments" },
              { label: "Present Today",  value: `${presentToday}/${totalStaff}`,                icon: UserCheck,  color: "text-emerald-600 dark:text-emerald-400",  bg: "bg-emerald-100 dark:bg-emerald-500/15", sub: `${Math.round((presentToday/totalStaff)*100)}% attendance rate` },
              { label: "On Leave",       value: onLeave,                                        icon: Clock,      color: "text-amber-600 dark:text-amber-400",     bg: "bg-amber-100 dark:bg-amber-500/15",     sub: "Active leave requests" },
              { label: "Avg Performance",value: "88%",                                          icon: Award,      color: "text-cyan-600 dark:text-cyan-400",        bg: "bg-cyan-100 dark:bg-cyan-500/15",       sub: "Monthly avg. score" },
            ].map(({ label, value, icon: Icon, color, bg, sub }) => (
              <div key={label} className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-5">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                    <Icon size={18} className={color} />
                  </div>
                  <ArrowUpRight size={14} className="text-emerald-500" />
                </div>
                <p className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Accounting Impact Banner ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-700/30 rounded-xl">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center shrink-0">
            <DollarSign size={16} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <Link2 size={12} className="text-purple-600 dark:text-purple-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-purple-700 dark:text-purple-400">Linked to Accounting</span>
              <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full shrink-0">{payrollExpenseTransactions.length} entries</span>
            </div>
            <p className="text-xs text-purple-600/80 dark:text-purple-400/70 mt-1 sm:mt-0.5">
              Monthly payroll of <span className="font-bold">${totalMonthlyPayroll.toLocaleString()}</span> across {Object.keys(payrollByDept).length} departments.
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0 w-full sm:w-auto">
            <p className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">-${totalMonthlyPayroll.toLocaleString()}</p>
            <p className="text-xs text-purple-500/70 dark:text-purple-400/60">Payroll · March 2026</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Attendance Trend */}
          <div className="lg:col-span-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Weekly Attendance Trend</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Present vs absent this week</p>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={attendanceTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="presGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="absGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} />
                <Area type="monotone" dataKey="present" name="Present" stroke="#06b6d4" strokeWidth={2} fill="url(#presGrad)" />
                <Area type="monotone" dataKey="absent"  name="Absent"  stroke="#f43f5e" strokeWidth={2} fill="url(#absGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Staff by Dept Pie */}
          <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-4">Staff by Department</h3>
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {departments.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-slate-500 dark:text-slate-400 truncate">{d.name}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300 ml-auto">{d.staff}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Cards */}
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-4">Department Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {departments.map(dept => (
              <div key={dept.name} className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
                <span className="text-2xl">{dept.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{dept.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{dept.present}/{dept.staff} present today</p>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(dept.present / dept.staff) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Bar Chart */}
        <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-6">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Department Performance Scores</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Monthly average based on guest reviews & KPIs</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
              <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} domain={[60, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} formatter={(v: any) => [`${v}%`, "Score"]} />
              <Bar dataKey="score" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employee Table */}
        <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden flex flex-col">
          <div className="p-3 sm:p-4 lg:p-5 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Employee Directory</h3>
            </div>
            <div className="relative flex-1 min-w-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20" />
            </div>
            <div className="relative w-full sm:w-auto">
              <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
                className="appearance-none w-full sm:w-auto pl-3 pr-8 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">
                <option value="All">All Depts</option>
                {departments.map(d => <option key={d.name}>{d.name}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-[#1A1D24]">
                  {["Employee", "Role", "Department", "Shift", "Status", "Rating", "Salary", ""].map((h, index) => (
                    <th key={h} className={`text-left px-3 sm:px-5 py-2 sm:py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 ${index === 2 ? "hidden sm:table-cell" : ""} ${index === 5 ? "hidden sm:table-cell" : ""} ${index === 6 ? "hidden lg:table-cell" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(emp => (
                  <tr key={emp.id} className="border-b border-slate-50 dark:border-slate-700/20 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-3 sm:px-5 py-2 sm:py-3.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xs font-bold shrink-0">
                          {emp.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{emp.name}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-5 py-2 sm:py-3.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm">{emp.role}</td>
                    <td className="px-3 sm:px-5 py-2 sm:py-3.5 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{emp.dept}</td>
                    <td className="px-3 sm:px-5 py-2 sm:py-3.5 text-xs text-slate-500 dark:text-slate-400 font-mono">{emp.shift}</td>
                    <td className="px-3 sm:px-5 py-2 sm:py-3.5"><StatusBadge status={emp.status} /></td>
                    <td className="px-3 sm:px-5 py-2 sm:py-3.5 hidden sm:table-cell">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className={i < emp.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-600"} />
                        ))}
                      </div>
                    </td>
                    <td className="px-3 sm:px-5 py-2 sm:py-3.5 font-semibold text-slate-700 dark:text-slate-300 hidden lg:table-cell">${emp.salary.toLocaleString()}</td>
                    <td className="px-3 sm:px-5 py-2 sm:py-3.5 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                        <MoreVertical size={14} />
                      </button>
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