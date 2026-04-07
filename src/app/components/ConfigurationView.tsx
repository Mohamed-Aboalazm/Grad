import React, { useState } from "react";
import {
  SlidersHorizontal, Bell, Shield, Package2, Hotel,
  Globe, Clock, DollarSign, Mail, MessageSquare, Smartphone,
  CheckCircle2, XCircle, ChevronRight, Plus, Trash2, Edit2,
  Users, Key, Eye, Settings2, Layers, ToggleLeft
} from "lucide-react";

const TABS = [
  { id: "general",       label: "General Config",       icon: Hotel },
  { id: "notifications", label: "Notifications",        icon: Bell },
  { id: "roles",         label: "Roles & Permissions",  icon: Shield },
  { id: "modules",       label: "Modules",              icon: Layers },
];

const defaultRoles = [
  { id: 1, name: "Super Admin",   users: 1,  color: "bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400",     perms: ["All Access"] },
  { id: 2, name: "Manager",       users: 3,  color: "bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400", perms: ["Dashboard", "Reports", "Staff", "Guests"] },
  { id: 3, name: "Front Desk",    users: 8,  color: "bg-cyan-100 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",       perms: ["Check-In", "Check-Out", "Reservations", "Guests"] },
  { id: 4, name: "Housekeeping",  users: 12, color: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400",   perms: ["Rooms", "Cleaning Schedule"] },
  { id: 5, name: "Accountant",    users: 2,  color: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400", perms: ["Accounting", "Reports", "Invoices"] },
  { id: 6, name: "Security",      users: 5,  color: "bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-400",   perms: ["CCTV", "Access Logs", "Incidents"] },
];

const modulesList = [
  { id: "frontdesk",    label: "Front Desk",          desc: "Guest check-in/out & reservations", icon: "🛎️", enabled: true,  critical: true },
  { id: "rooms",        label: "Room Management",      desc: "Room status, types & housekeeping", icon: "🛏️", enabled: true,  critical: true },
  { id: "crm",          label: "Guest CRM",            desc: "Guest profiles & loyalty program",  icon: "👥", enabled: true,  critical: false },
  { id: "inventory",    label: "Inventory",            desc: "Stock tracking & purchase orders",  icon: "📦", enabled: true,  critical: false },
  { id: "accounting",   label: "Accounting",           desc: "Invoices, payments & reports",      icon: "💰", enabled: true,  critical: true },
  { id: "hr",           label: "Employee Affairs",     desc: "Staff management & payroll",        icon: "👨‍💼", enabled: true,  critical: false },
  { id: "security",     label: "Security",             desc: "CCTV, access control & logs",      icon: "🔐", enabled: true,  critical: false },
  { id: "analytics",    label: "Analytics",            desc: "KPIs, dashboards & reports",        icon: "📊", enabled: true,  critical: false },
  { id: "restaurant",   label: "Restaurant POS",       desc: "F&B point-of-sale system",         icon: "🍽️", enabled: false, critical: false },
  { id: "spa",          label: "Spa & Wellness",       desc: "Spa bookings & treatments",         icon: "💆", enabled: false, critical: false },
  { id: "maintenance",  label: "Maintenance Mgmt",     desc: "Work orders & asset tracking",      icon: "🔧", enabled: true,  critical: false },
  { id: "conference",   label: "Conference Rooms",     desc: "Meeting room bookings & AV",        icon: "📋", enabled: false, critical: false },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`w-10 h-5.5 rounded-full flex items-center p-0.5 transition-colors ${enabled ? "bg-cyan-500" : "bg-slate-300 dark:bg-slate-600"}`}>
      <div className={`w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export function ConfigurationView() {
  const [activeTab, setActiveTab] = useState("general");
  const [notifSettings, setNotifSettings] = useState({
    emailCheckIn:       true,
    emailCheckOut:      true,
    emailPayment:       true,
    emailMaintenance:   false,
    smsCheckIn:         true,
    smsCheckOut:        false,
    smsPayment:         false,
    smsMaintenance:     false,
    pushCheckIn:        true,
    pushCheckOut:       true,
    pushPayment:        true,
    pushMaintenance:    true,
    pushLowInventory:   true,
    pushNewReservation: true,
  });
  const [modules, setModules] = useState(modulesList.map(m => ({ ...m })));
  const [roles] = useState(defaultRoles);

  const toggleNotif = (key: keyof typeof notifSettings) => {
    setNotifSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleModule = (id: string) => {
    setModules(prev => prev.map(m => m.id === id && !m.critical ? { ...m, enabled: !m.enabled } : m));
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50 dark:bg-[#1A1D24]">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1e2128] border-b border-slate-200 dark:border-slate-700/50 shrink-0 transition-colors duration-200">
        <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Configuration</h1>
        <button className="px-3 sm:px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors">
          Save Changes
        </button>
      </header>

      <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
        {/* Side Tabs */}
        <div className="w-full md:w-56 shrink-0 bg-white dark:bg-[#1e2128] border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700/50 p-4 space-y-1">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === tab.id
                  ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40"
              }`}>
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          {/* ── GENERAL CONFIG ── */}
          {activeTab === "general" && (
            <div className="max-w-2xl space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Hotel Configuration</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage core system-wide settings for your property.</p>
              </div>

              {/* Hotel Identity */}
              <section className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 space-y-5">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Hotel size={16} className="text-cyan-500" /> Hotel Identity
                </h3>
                {[
                  { label: "Property Name", placeholder: "Grand Azure Hotel", defaultVal: "Grand Azure Hotel" },
                  { label: "Property Code", placeholder: "GAH-001", defaultVal: "GAH-001" },
                  { label: "Address", placeholder: "123 Ocean Drive, Miami FL 33101" },
                  { label: "Phone Number", placeholder: "+1 (305) 555-0100" },
                  { label: "Email", placeholder: "info@grandazure.com" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{f.label}</label>
                    <input defaultValue={f.defaultVal} placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" />
                  </div>
                ))}
              </section>

              {/* Regional */}
              <section className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 space-y-5">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Globe size={16} className="text-cyan-500" /> Regional Settings
                </h3>
                {[
                  { label: "Timezone", options: ["UTC-5 (EST)", "UTC-6 (CST)", "UTC-8 (PST)", "UTC+0 (GMT)", "UTC+1 (CET)"], selected: "UTC-5 (EST)" },
                  { label: "Currency", options: ["USD — US Dollar", "EUR — Euro", "GBP — British Pound", "AED — UAE Dirham"], selected: "USD — US Dollar" },
                  { label: "Date Format", options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"], selected: "MM/DD/YYYY" },
                  { label: "Language", options: ["English (US)", "Spanish", "French", "Arabic", "German"], selected: "English (US)" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{f.label}</label>
                    <select defaultValue={f.selected}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500">
                      {f.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </section>

              {/* Check-in/out Times */}
              <section className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 space-y-5">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Clock size={16} className="text-cyan-500" /> Policies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Check-in Time",  val: "14:00" },
                    { label: "Check-out Time", val: "11:00" },
                    { label: "Late Check-out Fee", val: "$50.00" },
                    { label: "Early Check-in Fee", val: "$30.00" },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{f.label}</label>
                      <input defaultValue={f.val}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeTab === "notifications" && (
            <div className="max-w-3xl w-full space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Notification Settings</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Control when and how the system sends alerts.</p>
              </div>

              {[
                {
                  channel: "Email Notifications", icon: Mail, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-500/15",
                  items: [
                    { key: "emailCheckIn" as const,      label: "Guest Check-In",        desc: "Sent when a guest checks in" },
                    { key: "emailCheckOut" as const,     label: "Guest Check-Out",       desc: "Sent when a guest checks out" },
                    { key: "emailPayment" as const,      label: "Payment Received",      desc: "Confirmation on payment" },
                    { key: "emailMaintenance" as const,  label: "Maintenance Requests",  desc: "Room maintenance alerts" },
                  ]
                },
                {
                  channel: "SMS Notifications", icon: MessageSquare, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-500/15",
                  items: [
                    { key: "smsCheckIn" as const,       label: "Guest Check-In",    desc: "SMS to front desk" },
                    { key: "smsCheckOut" as const,      label: "Guest Check-Out",   desc: "SMS confirmation" },
                    { key: "smsPayment" as const,       label: "Payment Received",  desc: "SMS receipt" },
                    { key: "smsMaintenance" as const,   label: "Maintenance Alert", desc: "SMS to manager" },
                  ]
                },
                {
                  channel: "Push Notifications", icon: Smartphone, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-100 dark:bg-cyan-500/15",
                  items: [
                    { key: "pushCheckIn" as const,         label: "Guest Check-In",        desc: "In-app push" },
                    { key: "pushCheckOut" as const,        label: "Guest Check-Out",       desc: "In-app push" },
                    { key: "pushPayment" as const,         label: "Payment Received",      desc: "In-app push" },
                    { key: "pushMaintenance" as const,     label: "Maintenance Request",   desc: "In-app push" },
                    { key: "pushLowInventory" as const,    label: "Low Inventory Alert",   desc: "Stock warning" },
                    { key: "pushNewReservation" as const,  label: "New Reservation",       desc: "New booking alert" },
                  ]
                },
              ].map(({ channel, icon: Icon, color, bg, items }) => (
                <section key={channel} className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                      <Icon size={17} className={color} />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{channel}</h3>
                  </div>
                  <div className="space-y-4">
                    {items.map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                        </div>
                        <Toggle enabled={notifSettings[key]} onChange={() => toggleNotif(key)} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* ── ROLES ── */}
          {activeTab === "roles" && (
            <div className="max-w-3xl w-full space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Roles & Permissions</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage access levels across your team.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors">
                  <Plus size={15} /> Add Role
                </button>
              </div>

              <div className="grid gap-4">
                {roles.map(role => (
                  <div key={role.id} className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${role.color}`}>
                          {role.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                          <Users size={13} />
                          {role.users} user{role.users !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 rounded-lg transition-colors">
                          <Edit2 size={14} />
                        </button>
                        {role.id !== 1 && (
                          <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.perms.map(p => (
                        <span key={p} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs rounded-lg font-medium">
                          <Key size={10} /> {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Permission Matrix preview */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Permission Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-700/50">
                        <th className="text-left py-2 pr-4 text-slate-500 dark:text-slate-400 font-semibold text-xs">Module</th>
                        {["Admin", "Manager", "Front Desk", "Housekeeping", "Accountant"].map(r => (
                          <th key={r} className="py-2 px-3 text-slate-500 dark:text-slate-400 font-semibold text-xs text-center">{r}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { mod: "Dashboard",    perms: [true, true, true, false, true] },
                        { mod: "Rooms",        perms: [true, true, true, true, false] },
                        { mod: "Accounting",   perms: [true, true, false, false, true] },
                        { mod: "Guests",       perms: [true, true, true, false, false] },
                        { mod: "Inventory",    perms: [true, true, false, true, false] },
                        { mod: "Security",     perms: [true, false, false, false, false] },
                        { mod: "Settings",     perms: [true, false, false, false, false] },
                      ].map(row => (
                        <tr key={row.mod} className="border-b border-slate-50 dark:border-slate-700/30 hover:bg-slate-50 dark:hover:bg-slate-700/20">
                          <td className="py-2.5 pr-4 text-slate-700 dark:text-slate-300 font-medium">{row.mod}</td>
                          {row.perms.map((p, i) => (
                            <td key={i} className="py-2.5 px-3 text-center">
                              {p
                                ? <CheckCircle2 size={15} className="text-emerald-500 mx-auto" />
                                : <XCircle size={15} className="text-slate-300 dark:text-slate-600 mx-auto" />}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── MODULES ── */}
          {activeTab === "modules" && (
            <div className="max-w-3xl w-full space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Management</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enable or disable ERP modules for your property.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {modules.map(mod => (
                  <div key={mod.id} className={`bg-white dark:bg-[#22262f] border rounded-xl p-5 transition-all ${
                    mod.enabled ? "border-slate-200 dark:border-slate-700/50" : "border-slate-100 dark:border-slate-700/20 opacity-60"
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mod.icon}</span>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{mod.label}</p>
                          {mod.critical && (
                            <span className="text-xs text-rose-500 dark:text-rose-400 font-medium">Core module</span>
                          )}
                        </div>
                      </div>
                      <Toggle enabled={mod.enabled} onChange={() => toggleModule(mod.id)} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{mod.desc}</p>
                    {mod.critical && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                        ⚠️ Cannot be disabled
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-700/30 rounded-xl p-4">
                <p className="text-sm text-cyan-700 dark:text-cyan-300 font-medium">
                  {modules.filter(m => m.enabled).length} of {modules.length} modules active
                </p>
                <p className="text-xs text-cyan-600/70 dark:text-cyan-400/60 mt-1">
                  Core modules are always enabled to ensure critical operations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
