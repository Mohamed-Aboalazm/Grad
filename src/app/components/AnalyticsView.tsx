import React from "react";
import { 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  CalendarDays,
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Legend
} from 'recharts';

const revenueData = [
  { name: '1 Oct', revenue: 12400, target: 10000 },
  { name: '5 Oct', revenue: 14500, target: 11000 },
  { name: '10 Oct', revenue: 11200, target: 10500 },
  { name: '15 Oct', revenue: 15600, target: 12000 },
  { name: '20 Oct', revenue: 18900, target: 13000 },
  { name: '25 Oct', revenue: 16800, target: 14000 },
  { name: '30 Oct', revenue: 21400, target: 15000 },
];

const occupancyData = [
  { name: 'Deluxe King', occupied: 45, available: 5 },
  { name: 'Twin Std', occupied: 60, available: 20 },
  { name: 'Suite', occupied: 12, available: 3 },
  { name: 'Penthouse', occupied: 2, available: 0 },
];

type CardKind = "kpi" | "chart";
type CardId = "revenue-kpi" | "occupancy-kpi" | "guests-kpi" | "revpar-kpi" | "revenue-chart" | "occupancy-chart";

interface LayoutCard {
  id: CardId;
  kind: CardKind;
}

const DEFAULT_LAYOUT: LayoutCard[] = [
  { id: "revenue-kpi", kind: "kpi" },
  { id: "occupancy-kpi", kind: "kpi" },
  { id: "guests-kpi", kind: "kpi" },
  { id: "revpar-kpi", kind: "kpi" },
  { id: "revenue-chart", kind: "chart" },
  { id: "occupancy-chart", kind: "chart" },
];

interface CardFrameProps {
  card: LayoutCard;
  children: React.ReactNode;
}

function CardFrame({ card, children }: CardFrameProps) {
  return (
    <div
      className={`col-span-1 min-w-0 self-start ${card.kind === "chart" ? "lg:col-span-8" : "lg:col-span-3"}`}
    >
      <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 ${card.kind === "chart" ? "h-[420px]" : "h-[160px]"}`}>
        <div className="flex h-full flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AnalyticsView() {
  return (
    <div className="flex h-full min-h-0 flex-col">
        <header className="shrink-0 border-b border-slate-200 bg-white px-8 py-4 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-6">
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">ERP Analytics</h1>

            <div className="flex items-center gap-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full h-10 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-cyan-400"
                />
              </div>
              <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
                <Bell size={20} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-white bg-rose-500 dark:border-slate-900" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Overview</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Property performance summary for October 2023.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                  <CalendarDays size={16} className="text-slate-400 dark:text-slate-500" />
                  Last 30 Days
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 items-start auto-rows-max">
              {DEFAULT_LAYOUT.map((card) => (
                <CardFrame
                  key={card.id}
                  card={card}
                >
                  {card.id === "revenue-kpi" && (
                    <MetricCard
                      value="$124,500"
                      trend="+12.5%"
                      isPositive={true}
                      icon={DollarSign}
                      color="text-emerald-600 dark:text-emerald-400"
                      bg="bg-emerald-100 dark:bg-emerald-900/30"
                    />
                  )}
                  {card.id === "occupancy-kpi" && (
                    <MetricCard
                      value="84.2%"
                      trend="+5.2%"
                      isPositive={true}
                      icon={Activity}
                      color="text-cyan-600 dark:text-cyan-400"
                      bg="bg-cyan-100 dark:bg-cyan-900/30"
                    />
                  )}
                  {card.id === "guests-kpi" && (
                    <MetricCard
                      value="342"
                      trend="-2.1%"
                      isPositive={false}
                      icon={Users}
                      color="text-amber-600 dark:text-amber-400"
                      bg="bg-amber-100 dark:bg-amber-900/30"
                    />
                  )}
                  {card.id === "revpar-kpi" && (
                    <MetricCard
                      value="$145.20"
                      trend="+8.4%"
                      isPositive={true}
                      icon={TrendingUp}
                      color="text-blue-600 dark:text-blue-400"
                      bg="bg-blue-100 dark:bg-blue-900/30"
                    />
                  )}
                  {card.id === "revenue-chart" && <RevenueChartCard />}
                  {card.id === "occupancy-chart" && <OccupancyChartCard />}
                </CardFrame>
              ))}
            </div>
          </div>
        </div>
      </div>

  );
}

function MetricCard({ value, trend, isPositive, icon: Icon, color, bg }: any) {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg} ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{value}</span>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </div>
      </div>
    </div>
  );
}

function RevenueChartCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between gap-4">
        <select className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="min-h-[280px] flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} dx={-10} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)' }}
              itemStyle={{ fontSize: '14px', fontWeight: 500 }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Area type="monotone" dataKey="target" name="Target Revenue" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorTarget)" />
            <Area type="monotone" dataKey="revenue" name="Actual Revenue" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function OccupancyChartCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-[280px] flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={occupancyData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" opacity={0.5} />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} width={85} />
            <Tooltip
              cursor={{ fill: '#334155', opacity: 0.2 }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Bar dataKey="occupied" name="Occupied" stackId="occupancy" fill="#06b6d4" radius={[0, 0, 0, 0]} barSize={24} />
            <Bar dataKey="available" name="Available" stackId="occupancy" fill="#334155" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
