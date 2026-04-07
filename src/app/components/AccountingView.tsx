import React, { useState, useMemo } from "react";
import {
  DollarSign, TrendingUp, TrendingDown, CreditCard,
  ArrowUpRight, ArrowDownRight, Download, ChevronDown,
  Search, Receipt, CheckCircle2, Clock, AlertCircle,
  RefreshCw, Link2, LayoutGrid, BedDouble, ConciergeBell,
  Package, UsersRound, ShieldCheck, Coffee, Building2,
  ExternalLink, Layers
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell
} from "recharts";
import {
  allERPTransactions,
  revenueByModule,
  expensesByModule,
  totalIncome,
  totalExpenses,
  netProfit,
  payrollByDept,
  MODULE_META,
  type SourceModule,
  type ERPTransaction,
} from "../data/erpData";

// ── Charts data ──────────────────────────────
const revenueExpenseData = [
  { month: "Oct", revenue: 124500, expenses: 72000, profit: 52500 },
  { month: "Nov", revenue: 138000, expenses: 78000, profit: 60000 },
  { month: "Dec", revenue: 182000, expenses: 98000, profit: 84000 },
  { month: "Jan", revenue: 105000, expenses: 68000, profit: 37000 },
  { month: "Feb", revenue: 119000, expenses: 71000, profit: 48000 },
  { month: "Mar", revenue: Math.round(totalIncome), expenses: Math.round(totalExpenses), profit: Math.round(netProfit) },
];

const cashFlowData = [
  { week: "W1", inflow: 38000, outflow: 21000 },
  { week: "W2", inflow: 42000, outflow: 18000 },
  { week: "W3", inflow: 35000, outflow: 24000 },
  { week: "W4", inflow: Math.round(totalIncome * 0.27), outflow: Math.round(totalExpenses * 0.29) },
];

const MODULE_ICONS: Record<SourceModule, React.ReactNode> = {
  "Room Management":  <BedDouble size={14} />,
  "Front Desk":       <ConciergeBell size={14} />,
  "Inventory":        <Package size={14} />,
  "Employee Affairs": <UsersRound size={14} />,
  "Security":         <ShieldCheck size={14} />,
  "F&B":              <Coffee size={14} />,
  "Conference":       <Building2 size={14} />,
  "General":          <Layers size={14} />,
};

const ALL_MODULES: SourceModule[] = [
  "Room Management", "Front Desk", "F&B", "Conference",
  "Employee Affairs", "Inventory", "Security", "General",
];

const PIE_COLORS_REV = ["#06b6d4", "#3b82f6", "#10b981", "#6366f1"];
const PIE_COLORS_EXP = ["#a855f7", "#f59e0b", "#f43f5e", "#64748b"];

// ── Components ───────────────────────────────
function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    Pending:   "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400",
    Failed:    "bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400",
  };
  const icons: Record<string, React.ReactNode> = {
    Completed: <CheckCircle2 size={10} />,
    Pending:   <Clock size={10} />,
    Failed:    <AlertCircle size={10} />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${map[status] ?? ""}`}>
      {icons[status]} {status}
    </span>
  );
}

function ModuleBadge({ mod }: { mod: SourceModule }) {
  const m = MODULE_META[mod];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-full ${m.bg} ${m.color} whitespace-nowrap`}>
      {MODULE_ICONS[mod]}
      {mod}
    </span>
  );
}

// ── Main View ────────────────────────────────
export function AccountingView() {
  const [search, setSearch]             = useState("");
  const [filterModule, setFilterModule] = useState<SourceModule | "All">("All");
  const [filterType, setFilterType]     = useState<"All" | "Income" | "Expense">("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeTab, setActiveTab]       = useState<"overview" | "breakdown" | "ledger">("overview");

  const filtered = useMemo(() => allERPTransactions.filter(t => {
    if (filterModule !== "All" && t.sourceModule !== filterModule) return false;
    if (filterType   !== "All" && t.type          !== filterType)   return false;
    if (filterStatus !== "All" && t.status        !== filterStatus) return false;
    if (search && !t.id.toLowerCase().includes(search.toLowerCase())
                && !t.party.toLowerCase().includes(search.toLowerCase())
                && !t.category.toLowerCase().includes(search.toLowerCase())
                && !t.sourceModule.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [search, filterModule, filterType, filterStatus]);

  const filteredNet = filtered.reduce((s, t) => s + t.amount, 0);
  const pendingAmt  = allERPTransactions.filter(t => t.status === "Pending").reduce((s, t) => s + Math.abs(t.amount), 0);

  // Revenue pie
  const revPieData = revenueByModule.filter(m => m.total > 0).map(m => ({ name: m.module, value: m.total }));
  // Expense pie
  const expPieData = expensesByModule.filter(m => m.total > 0).map(m => ({ name: m.module, value: m.total }));

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50 dark:bg-[#1A1D24]">
      {/* ── Header ── */}
      <header className="h-auto sm:h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-0 bg-white dark:bg-[#1e2128] border-b border-slate-200 dark:border-slate-700/50 shrink-0 transition-colors duration-200 gap-3 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Accounting & Finance</h1>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-cyan-50 dark:bg-cyan-500/10 rounded-full text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Link2 size={11} /> {ALL_MODULES.length} modules linked
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
            <Download size={14} /> Export
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors">
            <Receipt size={14} /> New Invoice
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6">

        {/* ── Module Source Cards (live link indicators) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {ALL_MODULES.map(mod => {
            const m = MODULE_META[mod];
            const modTxns = allERPTransactions.filter(t => t.sourceModule === mod);
            const income  = modTxns.filter(t => t.type === "Income").reduce((s, t) => s + t.amount, 0);
            const expense = modTxns.filter(t => t.type === "Expense").reduce((s, t) => s + Math.abs(t.amount), 0);
            return (
              <div key={mod}
                onClick={() => { setFilterModule(mod); setActiveTab("ledger"); }}
                className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 cursor-pointer hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <div className={`flex items-center gap-2 text-xs font-bold ${m.color}`}>
                    <span className={`w-2 h-2 rounded-full ${m.dot}`} />
                    <span>{m.icon}</span>
                    <span className="truncate">{mod}</span>
                  </div>
                  <ExternalLink size={12} className="text-slate-300 dark:text-slate-600 group-hover:text-cyan-500 transition-colors shrink-0" />
                </div>
                <div className="space-y-1 mt-2">
                  {income > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 dark:text-slate-500">Income</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">+${income.toLocaleString()}</span>
                    </div>
                  )}
                  {expense > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 dark:text-slate-500">Expense</span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">-${expense.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-700/40 mt-1">
                    <span className="text-slate-400 dark:text-slate-500">Transactions</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{modTxns.length}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {[
            { label: "Total Revenue",   value: `$${totalIncome.toLocaleString()}`,    trend: "+14.2%", pos: true,  icon: DollarSign,   color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-500/15", sub: `${allERPTransactions.filter(t=>t.type==="Income").length} income entries` },
            { label: "Total Expenses",  value: `$${totalExpenses.toLocaleString()}`,   trend: "+6.1%",  pos: false, icon: TrendingDown, color: "text-rose-600 dark:text-rose-400",     bg: "bg-rose-100 dark:bg-rose-500/15",     sub: `${allERPTransactions.filter(t=>t.type==="Expense").length} expense entries` },
            { label: "Net Profit",      value: `$${netProfit.toLocaleString()}`,       trend: "+18.4%", pos: true,  icon: TrendingUp,   color: "text-cyan-600 dark:text-cyan-400",     bg: "bg-cyan-100 dark:bg-cyan-500/15",     sub: `${Math.round((netProfit/totalIncome)*100)}% margin` },
            { label: "Pending",         value: `$${pendingAmt.toLocaleString()}`,      trend: `${allERPTransactions.filter(t=>t.status==="Pending").length} txns`, pos: false, icon: CreditCard, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-500/15", sub: "Awaiting settlement" },
          ].map(({ label, value, trend, pos, icon: Icon, color, bg, sub }) => (
            <div key={label} className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-5 hover:border-cyan-300 dark:hover:border-cyan-700/50 transition-colors">
              <div className="flex items-start justify-between mb-3 gap-3">
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon size={18} className={color} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${pos ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                  {pos ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {trend}
                </span>
              </div>
              <p className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</p>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">{label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-2">
          {([
            { id: "overview",   label: "Overview" },
            { id: "breakdown",  label: "Module Breakdown" },
            { id: "ledger",     label: "Transaction Ledger" },
          ] as const).map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${activeTab === t.id ? "bg-cyan-500 text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <>
            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* P&L 6-month */}
              <div className="lg:col-span-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">Revenue vs Expenses (P&L)</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">6-month trend — all modules combined</p>
                  </div>
                  <select className="text-xs sm:text-sm border border-slate-200 dark:border-slate-600/50 rounded-lg px-2 py-1 bg-slate-50 dark:bg-[#1A1D24] text-slate-600 dark:text-slate-300 focus:outline-none w-full sm:w-auto">
                    <option>Last 6 Months</option><option>Last Quarter</option><option>YTD</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={revenueExpenseData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                    <defs>
                      {[
                        { id: "revG",  color: "#06b6d4" },
                        { id: "expG",  color: "#f43f5e" },
                        { id: "profG", color: "#10b981" },
                      ].map(g => (
                        <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={g.color} stopOpacity={0.25} />
                          <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} formatter={(v: any) => [`$${v.toLocaleString()}`, ""]} />
                    <Legend iconType="circle" iconSize={8} />
                    <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="#06b6d4" strokeWidth={2} fill="url(#revG)" />
                    <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f43f5e" strokeWidth={2} fill="url(#expG)" />
                    <Area type="monotone" dataKey="profit"   name="Profit"   stroke="#10b981" strokeWidth={2} fill="url(#profG)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue pie by module */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Revenue by Module</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">March 2026</p>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={revPieData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} paddingAngle={3} dataKey="value">
                      {revPieData.map((_, i) => <Cell key={i} fill={PIE_COLORS_REV[i % PIE_COLORS_REV.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "11px" }} formatter={(v: any) => [`$${v.toLocaleString()}`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {revPieData.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS_REV[i % PIE_COLORS_REV.length] }} />
                        <span className="text-slate-500 dark:text-slate-400">{d.name}</span>
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">${d.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cash Flow + Expense Pie */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Weekly Cash Flow — March 2026</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Inflow vs outflow — all ERP modules</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={cashFlowData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} formatter={(v: any) => [`$${v.toLocaleString()}`, ""]} />
                    <Legend iconType="circle" iconSize={8} />
                    <Bar dataKey="inflow"  name="Inflow"  fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                    <Bar dataKey="outflow" name="Outflow" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Expenses by Module</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">March 2026</p>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={expPieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                      {expPieData.map((_, i) => <Cell key={i} fill={PIE_COLORS_EXP[i % PIE_COLORS_EXP.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "11px" }} formatter={(v: any) => [`$${v.toLocaleString()}`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {expPieData.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS_EXP[i % PIE_COLORS_EXP.length] }} />
                        <span className="text-slate-500 dark:text-slate-400 truncate">{d.name}</span>
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">${d.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── BREAKDOWN TAB ── */}
        {activeTab === "breakdown" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Revenue sources */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight size={16} className="text-emerald-500" />
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Revenue Sources</h3>
                  </div>
                  <span className="ml-auto text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    +${totalIncome.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-4">
                  {revenueByModule.map(m => {
                    const pct = Math.round((m.total / totalIncome) * 100);
                    return (
                      <div key={m.module} onClick={() => { setFilterModule(m.module as SourceModule); setActiveTab("ledger"); }}
                        className="cursor-pointer group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm mb-1.5 gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${m.dot}`} />
                            <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{m.icon} {m.module}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 dark:text-slate-400">{pct}%</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">${m.total.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                          <div className={`h-full ${m.dot} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expense sources */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <ArrowDownRight size={16} className="text-rose-500" />
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Expense Sources</h3>
                  </div>
                  <span className="ml-auto text-sm font-bold text-rose-600 dark:text-rose-400">
                    -${totalExpenses.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-4">
                  {expensesByModule.map(m => {
                    const pct = Math.round((m.total / totalExpenses) * 100);
                    return (
                      <div key={m.module} onClick={() => { setFilterModule(m.module as SourceModule); setActiveTab("ledger"); }}
                        className="cursor-pointer group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm mb-1.5 gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${m.dot}`} />
                            <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{m.icon} {m.module}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 dark:text-slate-400">{pct}%</span>
                            <span className="font-bold text-rose-600 dark:text-rose-400">-${m.total.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                          <div className={`h-full ${m.dot} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Payroll breakdown (from Employee Affairs) */}
            <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👨‍💼</span>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Payroll by Department</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">— linked from Employee Affairs</p>
                  </div>
                </div>
                <span className="ml-auto text-sm font-bold text-purple-600 dark:text-purple-400">
                  -${Object.values(payrollByDept).reduce((s, v) => s + v, 0).toLocaleString()} / month
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Object.entries(payrollByDept).map(([dept, total]) => (
                  <div key={dept} className="bg-slate-50 dark:bg-[#1A1D24] rounded-xl p-4 border border-slate-100 dark:border-slate-700/40">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{dept}</p>
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                      ${total.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Monthly payroll</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Module contribution table */}
            <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-700/50">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Module Financial Contribution Summary</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Click any row to filter the ledger by that module</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-[#1A1D24]">
                    {["Module", "Type", "Transactions", "Total Income", "Total Expense", "Net Impact"].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ALL_MODULES.map(mod => {
                    const modTxns = allERPTransactions.filter(t => t.sourceModule === mod);
                    const inc = modTxns.filter(t => t.type === "Income").reduce((s, t) => s + t.amount, 0);
                    const exp = modTxns.filter(t => t.type === "Expense").reduce((s, t) => s + Math.abs(t.amount), 0);
                    const net = inc - exp;
                    const isIncomeModule = inc > 0 && exp === 0;
                    const isExpenseModule = exp > 0 && inc === 0;
                    return (
                      <tr key={mod}
                        onClick={() => { setFilterModule(mod); setActiveTab("ledger"); }}
                        className="border-b border-slate-50 dark:border-slate-700/20 hover:bg-cyan-50 dark:hover:bg-cyan-500/5 cursor-pointer transition-colors">
                        <td className="px-5 py-3.5">
                          <ModuleBadge mod={mod} />
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">
                          {isIncomeModule ? "Revenue" : isExpenseModule ? "Cost Center" : "Mixed"}
                        </td>
                        <td className="px-5 py-3.5 font-bold text-slate-700 dark:text-slate-300">{modTxns.length}</td>
                        <td className="px-5 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                          {inc > 0 ? `+$${inc.toLocaleString()}` : "—"}
                        </td>
                        <td className="px-5 py-3.5 font-bold text-rose-600 dark:text-rose-400">
                          {exp > 0 ? `-$${exp.toLocaleString()}` : "—"}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`font-bold ${net >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                            {net >= 0 ? "+" : ""}${net.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-[#1A1D24]">
                    <td colSpan={3} className="px-5 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">TOTAL (All Modules)</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">+${totalIncome.toLocaleString()}</td>
                    <td className="px-5 py-3.5 font-bold text-rose-600 dark:text-rose-400">-${totalExpenses.toLocaleString()}</td>
                    <td className="px-5 py-3.5 font-bold text-cyan-600 dark:text-cyan-400 text-base">+${netProfit.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* ── LEDGER TAB ── */}
        {activeTab === "ledger" && (
          <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
            {/* Filters */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700/50 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 bg-slate-50/50 dark:bg-[#1A1D24]/50">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 shrink-0">Transaction Ledger</h3>
              <div className="relative flex-1 min-w-0">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-600/50 rounded-lg text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20" />
              </div>

              {/* Module filter */}
              <div className="relative w-full sm:w-auto">
                <select value={filterModule} onChange={e => setFilterModule(e.target.value as SourceModule | "All")}
                  className="appearance-none w-full sm:w-auto pl-3 pr-8 py-2 text-xs sm:text-sm bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-600/50 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">
                  <option value="All">All Modules</option>
                  {ALL_MODULES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Type filter */}
              <div className="relative w-full sm:w-auto">
                <select value={filterType} onChange={e => setFilterType(e.target.value as any)}
                  className="appearance-none w-full sm:w-auto pl-3 pr-8 py-2 text-xs sm:text-sm bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-600/50 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">
                  {["All", "Income", "Expense"].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Status filter */}
              <div className="relative w-full sm:w-auto">
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                  className="appearance-none w-full sm:w-auto pl-3 pr-8 py-2 text-xs sm:text-sm bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-600/50 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">
                  {["All", "Completed", "Pending", "Failed"].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {(filterModule !== "All" || filterType !== "All" || filterStatus !== "All" || search) && (
                <button onClick={() => { setFilterModule("All"); setFilterType("All"); setFilterStatus("All"); setSearch(""); }}
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                  Clear filters
                </button>
              )}
              <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">{filtered.length} transactions</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-[#1A1D24]">
                    {["Txn ID", "Date", "Source Module", "Type", "Category", "Party / Guest", "Linked Ref", "Method", "Amount", "Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(tx => (
                    <tr key={tx.id} className="border-b border-slate-50 dark:border-slate-700/20 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{tx.id}</td>
                      <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{tx.date}</td>
                      <td className="px-4 py-3"><ModuleBadge mod={tx.sourceModule} /></td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${tx.type === "Income" ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400"}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">{tx.category}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 max-w-[140px] truncate">{tx.party}</td>
                      <td className="px-4 py-3 text-xs font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap">{tx.linkedRef ?? "—"}</td>
                      <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{tx.method}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold whitespace-nowrap ${tx.amount > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3"><StatusPill status={tx.status} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={10} className="py-12 text-center text-slate-400 dark:text-slate-500">No transactions match your filters.</td></tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-[#1A1D24]">
                    <td colSpan={8} className="px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      NET ({filtered.length} filtered transactions)
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${filteredNet >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {filteredNet >= 0 ? "+" : ""}${Math.abs(filteredNet).toLocaleString()}
                      </span>
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
