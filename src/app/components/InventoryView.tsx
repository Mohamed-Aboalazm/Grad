import React, { useState } from "react";
import {
  Package, Search, Bell, AlertTriangle, TrendingDown, TrendingUp,
  Plus, Filter, ChevronDown, ArrowUpRight, ArrowDownRight,
  RefreshCw, ShoppingCart, Archive, Layers, DollarSign, Link2
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from "recharts";
import {
  sharedInventoryItems as inventoryItems,
  sharedInventoryTransactions as recentTransactions,
  inventoryExpenseTransactions,
} from "../data/erpData";

const categories = [
  { name: "Toiletries",   total: 42, items: 42,  icon: "🧴", value: 3240,  lowStock: 5 },
  { name: "Bedding",      total: 18, items: 18,  icon: "🛏️", value: 12400, lowStock: 1 },
  { name: "F&B Supplies", total: 67, items: 67,  icon: "🍽️", value: 8900,  lowStock: 8 },
  { name: "Cleaning",     total: 31, items: 31,  icon: "🧹", value: 2100,  lowStock: 4 },
  { name: "Electronics",  total: 12, items: 12,  icon: "💡", value: 18500, lowStock: 0 },
  { name: "Office",       total: 25, items: 25,  icon: "📁", value: 960,   lowStock: 2 },
];

const stockTrendData = [
  { month: "Oct", inflow: 4200, outflow: 3100 },
  { month: "Nov", inflow: 3800, outflow: 3600 },
  { month: "Dec", inflow: 6200, outflow: 5800 },
  { month: "Jan", inflow: 3200, outflow: 2900 },
  { month: "Feb", inflow: 4100, outflow: 3400 },
  { month: "Mar", inflow: 5100, outflow: 4200 },
];

function StockBadge({ stock, minStock }: { stock: number; minStock: number }) {
  const ratio = stock / minStock;
  if (ratio <= 0.3) return <span className="px-2 py-0.5 text-xs font-bold bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 rounded-full">Critical</span>;
  if (ratio <= 0.8) return <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-full">Low</span>;
  return <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 rounded-full">OK</span>;
}

export function InventoryView() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const filtered = inventoryItems.filter(i =>
    (filterCat === "All" || i.category === filterCat) &&
    (!search || i.name.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()))
  );

  const lowStockItems = inventoryItems.filter(i => i.stock < i.minStock);
  const totalValue = inventoryItems.reduce((sum, i) => sum + i.stock * i.cost, 0);
  const totalPurchaseCost = inventoryExpenseTransactions.reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50 dark:bg-[#1A1D24]">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-[#1e2128] border-b border-slate-200 dark:border-slate-700/50 shrink-0 transition-colors duration-200">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Inventory Management</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
            <RefreshCw size={14} /> Sync
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors">
            <Plus size={15} /> Add Item
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: "Total SKUs",     value: inventoryItems.length,           icon: Layers,       color: "text-slate-600 dark:text-slate-400",     bg: "bg-slate-100 dark:bg-slate-700/50" },
            { label: "Inventory Value",value: `$${totalValue.toLocaleString()}`, icon: Archive,    color: "text-cyan-600 dark:text-cyan-400",         bg: "bg-cyan-100 dark:bg-cyan-500/15" },
            { label: "Low Stock Alerts",value: lowStockItems.length,           icon: AlertTriangle, color: "text-rose-600 dark:text-rose-400",       bg: "bg-rose-100 dark:bg-rose-500/15" },
            { label: "Pending Orders",  value: 3,                              icon: ShoppingCart,  color: "text-amber-600 dark:text-amber-400",     bg: "bg-amber-100 dark:bg-amber-500/15" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Accounting Impact Banner ── */}
        <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-700/30 rounded-xl">
          <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
            <DollarSign size={18} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link2 size={13} className="text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">Linked to Accounting</span>
              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">{inventoryExpenseTransactions.length} purchase entries</span>
            </div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/70 mt-0.5">
              Purchase orders are generating <span className="font-bold">-${totalPurchaseCost.toLocaleString()}</span> in inventory expenses — automatically posted to the Accounting ledger.
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">-${totalPurchaseCost.toLocaleString()}</p>
            <p className="text-xs text-amber-500/70 dark:text-amber-400/60">Expenses · March 2026</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Stock Movement */}
          <div className="col-span-2 bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Stock Movement</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">6-month inflow vs outflow trend</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stockTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#f8fafc", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="inflow" name="Inflow" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={18} />
                <Bar dataKey="outflow" name="Outflow" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Categories</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Stock health by category</p>
            <div className="space-y-3">
              {categories.map(cat => (
                <div key={cat.name} className="flex items-center gap-3">
                  <span className="text-lg">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300 truncate">{cat.name}</span>
                      {cat.lowStock > 0 && (
                        <span className="text-rose-500 font-semibold shrink-0 ml-2">{cat.lowStock} low</span>
                      )}
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cat.lowStock > 3 ? "bg-rose-500" : cat.lowStock > 0 ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${Math.min(100, 100 - (cat.lowStock / cat.items) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-700/40 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-rose-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-rose-700 dark:text-rose-400">⚠️ {lowStockItems.length} items below minimum stock level</p>
              <p className="text-xs text-rose-600/80 dark:text-rose-400/70 mt-0.5">
                {lowStockItems.map(i => i.name).join(", ")}
              </p>
            </div>
            <button className="ml-auto shrink-0 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg transition-colors">
              Auto-Order
            </button>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20" />
            </div>
            <div className="relative">
              <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">
                <option value="All">All Categories</option>
                {categories.map(c => <option key={c.name}>{c.name}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">{filtered.length} items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-[#1A1D24]">
                  {["ID", "Item Name", "Category", "Stock", "Min. Stock", "Status", "Unit Cost", "Last Order", "Supplier"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} className="border-b border-slate-50 dark:border-slate-700/20 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400">{item.id}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">{item.name}</td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{item.category}</td>
                    <td className="px-5 py-3.5">
                      <span className={`font-bold ${item.stock < item.minStock ? "text-rose-600 dark:text-rose-400" : "text-slate-800 dark:text-slate-200"}`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{item.minStock}</td>
                    <td className="px-5 py-3.5"><StockBadge stock={item.stock} minStock={item.minStock} /></td>
                    <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300">${item.cost.toFixed(2)}</td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-xs">{item.lastOrder}</td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">{item.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-700/30 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === "IN" ? "bg-emerald-100 dark:bg-emerald-500/15" : "bg-rose-100 dark:bg-rose-500/15"}`}>
                    {tx.type === "IN"
                      ? <ArrowUpRight size={14} className="text-emerald-600 dark:text-emerald-400" />
                      : <ArrowDownRight size={14} className="text-rose-600 dark:text-rose-400" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{tx.item}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tx.id} · {tx.by}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.type === "IN" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {tx.type === "IN" ? "+" : "-"}{tx.qty} units
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}