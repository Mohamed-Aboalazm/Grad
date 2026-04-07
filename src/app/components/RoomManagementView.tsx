import React, { useState, useMemo } from "react";
import {
  Search, Bell, BedDouble, CheckCircle2, XCircle, Wrench,
  Sparkles, Filter, ChevronDown, Eye, X, TrendingUp,
  Users, Clock, Star, Wifi, Wind, Coffee, Tv, DollarSign, Link2
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend,
  BarChart, Bar
} from "recharts";
import { sharedRoomsData, roomRevenueTransactions } from "../data/erpData";

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  Available:   { bg: "bg-emerald-100 dark:bg-emerald-500/15", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500", border: "border-emerald-200 dark:border-emerald-700/50" },
  Occupied:    { bg: "bg-cyan-100 dark:bg-cyan-500/15",    text: "text-cyan-700 dark:text-cyan-400",    dot: "bg-cyan-500",    border: "border-cyan-200 dark:border-cyan-700/50" },
  Cleaning:    { bg: "bg-amber-100 dark:bg-amber-500/15",  text: "text-amber-700 dark:text-amber-400",  dot: "bg-amber-500",  border: "border-amber-200 dark:border-amber-700/50" },
  Maintenance: { bg: "bg-rose-100 dark:bg-rose-500/15",   text: "text-rose-700 dark:text-rose-400",   dot: "bg-rose-500",   border: "border-rose-200 dark:border-rose-700/50" },
};

const ROOM_TYPES = ["Standard", "Deluxe", "Suite", "Penthouse"] as const;
const FLOORS = [1, 2, 3, 4] as const;

// Use shared data instead of local
const roomsData = sharedRoomsData;

const occupancyTrendData = [
  { day: "Mon", occupied: 14, available: 10 },
  { day: "Tue", occupied: 16, available: 8 },
  { day: "Wed", occupied: 18, available: 6 },
  { day: "Thu", occupied: 15, available: 9 },
  { day: "Fri", occupied: 20, available: 4 },
  { day: "Sat", occupied: 22, available: 2 },
  { day: "Sun", occupied: 19, available: 5 },
];

const revenueByTypeData = [
  { type: "Standard", revenue: 2400 },
  { type: "Deluxe",   revenue: 5800 },
  { type: "Suite",    revenue: 8900 },
  { type: "Penthouse",revenue: 13600 },
];

const PIE_COLORS = ["#10b981", "#06b6d4", "#f59e0b", "#f43f5e"];
const AMENITY_ICONS: Record<string, React.ReactNode> = {
  Wifi:   <Wifi size={12} />,
  AC:     <Wind size={12} />,
  Coffee: <Coffee size={12} />,
  TV:     <Tv size={12} />,
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function RoomCard({ room, onClick }: { room: typeof roomsData[0]; onClick: () => void }) {
  const s = STATUS_COLORS[room.status];
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#22262f] border ${s.border} rounded-xl p-4 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 group`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
            <BedDouble size={16} className={s.text} />
          </div>
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">Room {room.id}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Floor {room.floor}</p>
          </div>
        </div>
        <Eye size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-cyan-500 transition-colors" />
      </div>

      <div className="mb-3">
        <StatusBadge status={room.status} />
      </div>

      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">{room.type}</div>

      {room.guest && (
        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 mb-2">
          <Users size={11} />
          <span className="truncate">{room.guest}</span>
        </div>
      )}

      {room.checkOut && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Clock size={11} />
          <span>Until {room.checkOut}</span>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1">
          {room.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-slate-400 dark:text-slate-500">{AMENITY_ICONS[a]}</span>
          ))}
        </div>
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">${room.rate}<span className="font-normal text-slate-400">/n</span></span>
      </div>
    </div>
  );
}

function RoomDetailPanel({ room, onClose }: { room: typeof roomsData[0]; onClose: () => void }) {
  const s = STATUS_COLORS[room.status];
  return (
    <div className="w-80 shrink-0 bg-white dark:bg-[#1e2128] border-l border-slate-200 dark:border-slate-700/50 flex flex-col overflow-y-auto">
      <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 dark:text-slate-100">Room {room.id} Details</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-5 flex-1">
        {/* Status Banner */}
        <div className={`rounded-xl p-4 ${s.bg} border ${s.border}`}>
          <div className="flex items-center justify-between mb-2">
            <StatusBadge status={room.status} />
            <span className={`text-xs font-bold ${room.status === "Occupied" ? "text-cyan-600 dark:text-cyan-400" : "text-slate-500"}`}>
              {room.status === "Occupied" ? "🔴 BUSY" : room.status === "Available" ? "🟢 FREE" : room.status === "Cleaning" ? "🟡 IN PROGRESS" : "🔴 BLOCKED"}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            {room.status === "Occupied" && room.guest ? `Hosted by ${room.guest}` : 
             room.status === "Available" ? "Ready for check-in" :
             room.status === "Cleaning" ? "Housekeeping in progress" : "Out of service"}
          </p>
        </div>

        {/* Room Info */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Room Info</h4>
          <div className="space-y-2">
            {[
              { label: "Room Number", value: `#${room.id}` },
              { label: "Floor",       value: `Floor ${room.floor}` },
              { label: "Type",        value: room.type },
              { label: "Rate",        value: `$${room.rate} / night` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">{label}</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Info */}
        {room.guest && (
          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Current Guest</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#22262f] rounded-lg">
                <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                  {room.guest.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{room.guest}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{room.nights} nights stay</p>
                </div>
              </div>
              {[
                { label: "Check-in",  value: room.checkIn },
                { label: "Check-out", value: room.checkOut },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{value}</span>
                </div>
              ))}
              {room.rating && (
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < room.rating! ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"} />
                  ))}
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">Guest rating</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map(a => (
              <span key={a} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-[#22262f] text-slate-600 dark:text-slate-300 text-xs rounded-lg">
                {AMENITY_ICONS[a]} {a}
              </span>
            ))}
          </div>
        </div>

        {/* Revenue */}
        {room.status === "Occupied" && room.nights && (
          <div className="bg-cyan-50 dark:bg-cyan-500/10 rounded-xl p-4 border border-cyan-200 dark:border-cyan-700/30">
            <h4 className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 uppercase tracking-wide mb-2">Current Stay Revenue</h4>
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">${(room.rate * room.nights).toLocaleString()}</p>
            <p className="text-xs text-cyan-600/70 dark:text-cyan-400/60 mt-1">{room.nights} nights × ${room.rate}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            {room.status === "Available" && (
              <button className="col-span-2 px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold rounded-lg transition-colors">
                Check In Guest
              </button>
            )}
            {room.status === "Occupied" && (
              <button className="col-span-2 px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg transition-colors">
                Check Out Guest
              </button>
            )}
            <button className="px-3 py-2 bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-lg hover:bg-amber-200 dark:hover:bg-amber-500/25 transition-colors">
              Request Clean
            </button>
            <button className="px-3 py-2 bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 text-xs font-semibold rounded-lg hover:bg-rose-200 dark:hover:bg-rose-500/25 transition-colors">
              Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoomManagementView() {
  const [search, setSearch] = useState("");
  const [filterFloor, setFilterFloor] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState<typeof roomsData[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"grid" | "analytics">("grid");

  const filtered = useMemo(() => {
    return roomsData.filter(r => {
      if (search && !String(r.id).includes(search) && !r.type.toLowerCase().includes(search.toLowerCase()) && !(r.guest?.toLowerCase().includes(search.toLowerCase()))) return false;
      if (filterFloor !== "All" && String(r.floor) !== filterFloor) return false;
      if (filterType !== "All" && r.type !== filterType) return false;
      if (filterStatus !== "All" && r.status !== filterStatus) return false;
      return true;
    });
  }, [search, filterFloor, filterType, filterStatus]);

  const kpi = useMemo(() => ({
    total:       roomsData.length,
    available:   roomsData.filter(r => r.status === "Available").length,
    occupied:    roomsData.filter(r => r.status === "Occupied").length,
    cleaning:    roomsData.filter(r => r.status === "Cleaning").length,
    maintenance: roomsData.filter(r => r.status === "Maintenance").length,
  }), []);

  const pieData = [
    { name: "Available",   value: kpi.available },
    { name: "Occupied",    value: kpi.occupied },
    { name: "Cleaning",    value: kpi.cleaning },
    { name: "Maintenance", value: kpi.maintenance },
  ];

  const occupancyRate = Math.round((kpi.occupied / kpi.total) * 100);

  // Accounting link data
  const totalRoomRevenue = roomRevenueTransactions.reduce((s, t) => s + t.amount, 0);
  const accountingEntries = roomRevenueTransactions.length;

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50 dark:bg-[#1A1D24]">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-[#1e2128] border-b border-slate-200 dark:border-slate-700/50 shrink-0 z-10 transition-colors duration-200">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Room Management</h1>
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search room, guest..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-[#22262f] border border-slate-200 dark:border-slate-600/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:text-slate-200 placeholder:text-slate-400 transition-all"
            />
          </div>
          <button className="relative p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-[#1e2128]" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <div className="p-8 flex flex-col gap-6">
            {/* Page Title + Tabs */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">All Rooms</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                  {kpi.total} rooms · {occupancyRate}% occupancy rate
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-lg p-1">
                {(["grid", "analytics"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${activeTab === tab ? "bg-cyan-500 text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"}`}>
                    {tab === "grid" ? "Room Grid" : "Analytics"}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Total Rooms",  value: kpi.total,       icon: BedDouble,    color: "text-slate-600 dark:text-slate-400",    bg: "bg-slate-100 dark:bg-slate-700/50" },
                { label: "Available",    value: kpi.available,   icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-500/15" },
                { label: "Occupied",     value: kpi.occupied,    icon: Users,        color: "text-cyan-600 dark:text-cyan-400",       bg: "bg-cyan-100 dark:bg-cyan-500/15" },
                { label: "Cleaning",     value: kpi.cleaning,    icon: Sparkles,     color: "text-amber-600 dark:text-amber-400",     bg: "bg-amber-100 dark:bg-amber-500/15" },
                { label: "Maintenance",  value: kpi.maintenance, icon: Wrench,       color: "text-rose-600 dark:text-rose-400",       bg: "bg-rose-100 dark:bg-rose-500/15" },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 flex items-center gap-3 hover:border-cyan-300 dark:hover:border-cyan-700/50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={color} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                    <p className={`text-xl font-bold ${color}`}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Accounting Impact Banner ── */}
            <div className="flex items-center gap-4 p-4 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-700/30 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center shrink-0">
                <DollarSign size={18} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Link2 size={13} className="text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-bold text-cyan-700 dark:text-cyan-400">Linked to Accounting</span>
                  <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs font-bold rounded-full">{accountingEntries} entries</span>
                </div>
                <p className="text-xs text-cyan-600/80 dark:text-cyan-400/70 mt-0.5">
                  Room Management is generating <span className="font-bold">${totalRoomRevenue.toLocaleString()}</span> in room revenue — flowing live into the Accounting ledger.
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">+${totalRoomRevenue.toLocaleString()}</p>
                <p className="text-xs text-cyan-500/70 dark:text-cyan-400/60">March 2026</p>
              </div>
            </div>

            {activeTab === "grid" ? (
              <>
                {/* Filters */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Filter size={15} />
                    <span className="font-medium">Filters:</span>
                  </div>
                  {[
                    { label: "Floor", value: filterFloor, setter: setFilterFloor, options: ["All", "1", "2", "3", "4"] },
                    { label: "Type",  value: filterType,  setter: setFilterType,  options: ["All", ...ROOM_TYPES] },
                    { label: "Status",value: filterStatus, setter: setFilterStatus, options: ["All", "Available", "Occupied", "Cleaning", "Maintenance"] },
                  ].map(({ label, value, setter, options }) => (
                    <div key={label} className="relative">
                      <select value={value} onChange={e => setter(e.target.value)}
                        className="appearance-none pl-3 pr-8 py-2 text-sm bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-600/50 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 cursor-pointer">
                        {options.map(o => <option key={o} value={o}>{label === "Floor" && o !== "All" ? `Floor ${o}` : o}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  ))}
                  {(filterFloor !== "All" || filterType !== "All" || filterStatus !== "All" || search) && (
                    <button onClick={() => { setFilterFloor("All"); setFilterType("All"); setFilterStatus("All"); setSearch(""); }}
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                      Clear filters
                    </button>
                  )}
                  <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">{filtered.length} rooms shown</span>
                </div>

                {/* Room Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {filtered.map(room => (
                    <RoomCard key={room.id} room={room} onClick={() => setSelectedRoom(selectedRoom?.id === room.id ? null : room)} />
                  ))}
                  {filtered.length === 0 && (
                    <div className="col-span-full py-16 flex flex-col items-center text-slate-400 dark:text-slate-500">
                      <BedDouble size={40} className="mb-3 opacity-40" />
                      <p className="font-medium">No rooms match your filters</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Analytics Tab */
              <div className="grid grid-cols-3 gap-6">
                {/* Occupancy Pie */}
                <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Room Status Distribution</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Real-time breakdown</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                        {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {pieData.map((d, i) => (
                      <div key={d.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                          <span className="text-slate-600 dark:text-slate-300">{d.name}</span>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-100">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Occupancy */}
                <div className="col-span-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100">Weekly Occupancy Trend</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Occupied vs Available rooms</p>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                      <TrendingUp size={13} className="text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+8.4%</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={occupancyTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#06b6d4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="avGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} />
                      <Legend iconType="circle" iconSize={8} />
                      <Area type="monotone" dataKey="occupied" name="Occupied" stroke="#06b6d4" strokeWidth={2} fill="url(#occGrad)" />
                      <Area type="monotone" dataKey="available" name="Available" stroke="#10b981" strokeWidth={2} fill="url(#avGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Revenue by Type */}
                <div className="col-span-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Revenue by Room Type</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">This week's revenue breakdown</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueByTypeData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} formatter={(v: any) => [`$${v.toLocaleString()}`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={36} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* PowerBI-style Control Panel */}
                <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-yellow-100 dark:bg-yellow-500/15 flex items-center justify-center">
                      <span className="text-yellow-600 dark:text-yellow-400 text-xs font-bold">BI</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">PowerBI Controls</h3>
                      <p className="text-xs text-slate-400">Live data controls</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Occupancy Rate",  value: occupancyRate, max: 100, color: "bg-cyan-500" },
                      { label: "Rooms Available", value: Math.round((kpi.available / kpi.total) * 100), max: 100, color: "bg-emerald-500" },
                      { label: "In Maintenance",  value: Math.round((kpi.maintenance / kpi.total) * 100), max: 100, color: "bg-rose-500" },
                      { label: "In Cleaning",     value: Math.round((kpi.cleaning / kpi.total) * 100), max: 100, color: "bg-amber-500" },
                    ].map(({ label, value, color }) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">{label}</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">{value}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                          <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">Quick Metrics</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "RevPAR",  value: "$187" },
                        { label: "ADR",     value: "$224" },
                        { label: "Avg Stay",value: "5.2d" },
                        { label: "GoRev%",  value: "94%" },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-slate-50 dark:bg-[#1A1D24] rounded-lg p-2 text-center">
                          <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floor Heatmap */}
                <div className="col-span-3 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Floor Map Overview</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Visual status per floor — click a room for details</p>
                  <div className="space-y-3">
                    {FLOORS.map(f => (
                      <div key={f} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-14 shrink-0">Floor {f}</span>
                        <div className="flex gap-2 flex-wrap">
                          {roomsData.filter(r => r.floor === f).map(r => (
                            <div key={r.id} title={`Room ${r.id} - ${r.status}`}
                              className={`w-12 h-10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform border ${STATUS_COLORS[r.status].bg} ${STATUS_COLORS[r.status].border}`}
                              onClick={() => setSelectedRoom(r)}>
                              <span className={`text-xs font-bold ${STATUS_COLORS[r.status].text}`}>{r.id}</span>
                              <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${STATUS_COLORS[r.status].dot}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-5 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    {Object.entries(STATUS_COLORS).map(([status, s]) => (
                      <div key={status} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} /> {status}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Room Detail Panel */}
        {selectedRoom && (
          <RoomDetailPanel room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
      </div>
    </div>
  );
}