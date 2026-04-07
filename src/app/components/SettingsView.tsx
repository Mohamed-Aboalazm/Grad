import React, { useRef, useState } from "react";
import {
  User, Lock, Bell, Palette, Database, Link, Download,
  Upload, Trash2, Shield, Eye, EyeOff, CheckCircle2,
  Globe, Smartphone, Mail, Key, RefreshCw, Save, ChevronRight
} from "lucide-react";

const TABS = [
  { id: "profile",       label: "My Profile",         icon: User },
  { id: "security",      label: "Password & Security", icon: Lock },
  { id: "appearance",    label: "Appearance",          icon: Palette },
  { id: "integrations",  label: "Integrations",        icon: Link },
  { id: "data",          label: "Data & Backup",       icon: Database },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`w-10 h-5.5 rounded-full flex items-center p-0.5 transition-colors shrink-0 ${enabled ? "bg-cyan-500" : "bg-slate-300 dark:bg-slate-600"}`}>
      <div className={`w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export function SettingsView() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPass, setShowPass] = useState(false);
  const [prefs, setPrefs] = useState({
    compactMode: false,
    animations: true,
    sidebarCollapsed: false,
    emailNotifs: true,
    pushNotifs: true,
    weeklyReport: true,
    twoFactor: false,
    sessionTimeout: true,
    loginAlerts: true,
  });

  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const handleSave = () => {
    const personalInfo = formRef.current ? Object.fromEntries(new FormData(formRef.current).entries()) : {};
    const updatedData = {
      personalInfo,
      notificationPreferences: prefs,
    };
    console.log("Saved settings:", updatedData);
    alert("Settings Saved");
  };

  const integrations = [
    { name: "Stripe Payments",    logo: "💳", desc: "Payment gateway for credit/debit processing", connected: true,  color: "bg-violet-100 dark:bg-violet-500/15" },
    { name: "Twilio SMS",         logo: "📱", desc: "SMS notifications and guest communications",  connected: true,  color: "bg-red-100 dark:bg-red-500/15" },
    { name: "SendGrid Email",     logo: "📧", desc: "Transactional email delivery service",        connected: true,  color: "bg-blue-100 dark:bg-blue-500/15" },
    { name: "Google Maps",        logo: "🗺️", desc: "Location services and local directions",     connected: true,  color: "bg-emerald-100 dark:bg-emerald-500/15" },
    { name: "Airbnb Channel",     logo: "🏠", desc: "Sync reservations from Airbnb",              connected: false, color: "bg-rose-100 dark:bg-rose-500/15" },
    { name: "Booking.com",        logo: "🌐", desc: "Sync reservations from Booking.com",         connected: false, color: "bg-cyan-100 dark:bg-cyan-500/15" },
    { name: "QuickBooks",         logo: "📊", desc: "Accounting software integration",            connected: false, color: "bg-emerald-100 dark:bg-emerald-500/15" },
    { name: "Slack Alerts",       logo: "💬", desc: "Send ERP alerts to Slack channels",          connected: false, color: "bg-amber-100 dark:bg-amber-500/15" },
  ];

  const backups = [
    { name: "Auto Backup — Mar 31",  size: "48.2 MB", type: "Full",  date: "2026-03-31 02:00", status: "Success" },
    { name: "Auto Backup — Mar 30",  size: "47.8 MB", type: "Full",  date: "2026-03-30 02:00", status: "Success" },
    { name: "Manual Export — Mar 28",size: "12.1 MB", type: "Partial",date: "2026-03-28 14:32",status: "Success" },
    { name: "Auto Backup — Mar 29",  size: "47.5 MB", type: "Full",  date: "2026-03-29 02:00", status: "Success" },
  ];

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50 dark:bg-[#1A1D24]">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#1e2128] border-b border-slate-200 dark:border-slate-700/50 shrink-0 transition-colors duration-200">
        <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Settings</h1>
        <button onClick={handleSave} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors">
          <Save size={14} /> Save Changes
        </button>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
        {/* Side Tabs */}
        <div className="w-full lg:w-56 shrink-0 bg-white dark:bg-[#1e2128] border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700/50 p-4 space-y-1">
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

          {/* ── PROFILE ── */}
          {activeTab === "profile" && (
            <form ref={formRef} className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">My Profile</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your personal account settings.</p>
              </div>

              {/* Avatar */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-2xl border-2 border-cyan-200 dark:border-cyan-800/50">
                    JS
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Jane Smith</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">System Administrator</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="px-4 py-1.5 text-sm bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors">
                        Upload Photo
                      </button>
                      <button className="px-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 space-y-5">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "First Name",   name: "firstName",   val: "Jane",             type: "text" },
                    { label: "Last Name",    name: "lastName",    val: "Smith",            type: "text" },
                    { label: "Job Title",    name: "jobTitle",    val: "System Administrator", type: "text" },
                    { label: "Department",   name: "department",  val: "Management",       type: "text" },
                    { label: "Email",        name: "email",       val: "jane@grandazure.com", type: "email" },
                    { label: "Phone",        name: "phone",       val: "+1 (305) 555-0201", type: "tel" },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{f.label}</label>
                      <input name={f.name} type={f.type} defaultValue={f.val}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Notification Preferences</h3>
                {[
                  { key: "emailNotifs" as const, label: "Email Notifications",   desc: "Receive updates via email" },
                  { key: "pushNotifs"  as const, label: "Push Notifications",    desc: "In-app alerts and reminders" },
                  { key: "weeklyReport" as const,label: "Weekly Summary Report", desc: "Automated report every Monday" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                    </div>
                    <Toggle enabled={prefs[key]} onChange={() => toggle(key)} />
                  </div>
                ))}
              </div>
            </form>
          )}

          {/* ── SECURITY ── */}
          {activeTab === "security" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Password & Security</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your credentials and security settings.</p>
              </div>

              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 space-y-5">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Change Password</h3>
                {[
                  { label: "Current Password", placeholder: "Enter current password" },
                  { label: "New Password",      placeholder: "Enter new password" },
                  { label: "Confirm Password",  placeholder: "Confirm new password" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{f.label}</label>
                    <div className="relative">
                      <input type={showPass ? "text" : "password"} placeholder={f.placeholder}
                        className="w-full px-3 pr-10 py-2.5 bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 placeholder:text-slate-400" />
                      <button onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
                <button className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors">
                  Update Password
                </button>
              </div>

              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Security Options</h3>
                {[
                  { key: "twoFactor"    as const, label: "Two-Factor Authentication", desc: "Add an extra layer of security to your login" },
                  { key: "sessionTimeout" as const, label: "Auto Session Timeout",    desc: "Log out after 30 minutes of inactivity" },
                  { key: "loginAlerts"  as const,  label: "Login Alerts",             desc: "Email notification on each new login" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                    </div>
                    <Toggle enabled={prefs[key]} onChange={() => toggle(key)} />
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-700/40 rounded-xl p-4">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Active Sessions</p>
                <p className="text-xs text-amber-600/80 dark:text-amber-400/70 mt-1 mb-3">You are currently logged in from 1 device.</p>
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors">
                  Revoke All Other Sessions
                </button>
              </div>
            </div>
          )}

          {/* ── APPEARANCE ── */}
          {activeTab === "appearance" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Appearance</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Customize how the ERP looks for you.</p>
              </div>

              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Theme</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Light", preview: "bg-white", border: "border-cyan-500", text: "text-slate-900" },
                    { name: "Dark",  preview: "bg-[#1A1D24]", border: "border-slate-600", text: "text-slate-100" },
                    { name: "System", preview: "bg-gradient-to-br from-white to-[#1A1D24]", border: "border-slate-300", text: "text-slate-500" },
                  ].map(theme => (
                    <div key={theme.name} className={`border-2 ${theme.name === "Light" ? "border-cyan-500" : "border-slate-200 dark:border-slate-700/50"} rounded-xl overflow-hidden cursor-pointer hover:border-cyan-400 transition-colors`}>
                      <div className={`h-16 ${theme.preview}`}>
                        <div className="flex h-full">
                          <div className={`w-1/4 h-full ${theme.preview === "bg-white" ? "bg-slate-100" : "bg-slate-800"}`} />
                          <div className="flex-1 p-2 space-y-1">
                            <div className={`h-2 ${theme.preview === "bg-white" ? "bg-slate-200" : "bg-slate-700"} rounded`} />
                            <div className={`h-2 w-2/3 ${theme.preview === "bg-white" ? "bg-slate-200" : "bg-slate-700"} rounded`} />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-[#1A1D24]">
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">{theme.name}</p>
                        {theme.name === "Light" && <p className="text-xs text-cyan-600 dark:text-cyan-400 text-center font-medium">Active</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Accent Color</h3>
                <div className="flex items-center gap-3">
                  {["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#f43f5e"].map((color, i) => (
                    <button key={color} className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${i === 0 ? "border-slate-800 dark:border-white scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Layout Preferences</h3>
                {[
                  { key: "compactMode"      as const, label: "Compact Mode",        desc: "Reduce spacing and padding throughout the UI" },
                  { key: "animations"       as const, label: "Enable Animations",   desc: "Smooth transitions and micro-interactions" },
                  { key: "sidebarCollapsed" as const, label: "Collapsed Sidebar",   desc: "Start with sidebar minimized by default" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700/40 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                    </div>
                    <Toggle enabled={prefs[key]} onChange={() => toggle(key)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── INTEGRATIONS ── */}
          {activeTab === "integrations" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Integrations</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Connect third-party services and APIs to your ERP.</p>
              </div>

              <div className="grid gap-4">
                {integrations.map(int => (
                  <div key={int.name} className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${int.color} flex items-center justify-center text-2xl`}>
                      {int.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="font-bold text-slate-800 dark:text-slate-100">{int.name}</p>
                        {int.connected && (
                          <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full flex items-center gap-1">
                            <CheckCircle2 size={10} /> Connected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{int.desc}</p>
                    </div>
                    <button className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors shrink-0 ${
                      int.connected
                        ? "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-rose-500/15 hover:text-rose-600 dark:hover:text-rose-400"
                        : "bg-cyan-500 hover:bg-cyan-600 text-white"
                    }`}>
                      {int.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DATA & BACKUP ── */}
          {activeTab === "data" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Data & Backup</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your data exports, backups, and storage.</p>
              </div>

              {/* Storage */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Storage Usage</h3>
                <div className="flex items-end justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-400">14.8 GB used of 50 GB</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">29.6%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: "29.6%" }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {[
                    { label: "Database",  size: "8.2 GB",  color: "bg-cyan-500" },
                    { label: "Media",     size: "5.1 GB",  color: "bg-violet-500" },
                    { label: "Backups",   size: "1.5 GB",  color: "bg-amber-500" },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <div className={`w-3 h-3 rounded-full ${s.color} mx-auto mb-1`} />
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{s.size}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export Data */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Export Data</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Guest Records (CSV)", "Financial Reports (PDF)", "Inventory Data (CSV)", "Employee Data (Excel)"].map(e => (
                    <button key={e} className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-slate-600/50 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/40 hover:border-cyan-300 dark:hover:border-cyan-700/50 transition-colors text-left">
                      <Download size={14} className="text-slate-400 shrink-0" />
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Backup History */}
              <div className="bg-white dark:bg-[#22262f] border border-slate-200 dark:border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">Backup History</h3>
                  <button className="flex items-center gap-1.5 text-sm text-cyan-600 dark:text-cyan-400 font-medium hover:underline">
                    <Upload size={13} /> Create Backup
                  </button>
                </div>
                <div className="space-y-3">
                  {backups.map(b => (
                    <div key={b.name} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-700/30 last:border-0">
                      <div className="flex items-center gap-3">
                        <Database size={16} className="text-slate-400 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{b.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{b.date} · {b.size} · {b.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 rounded-full">
                          {b.status}
                        </span>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors">
                          <Download size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-700/40 rounded-xl p-6">
                <h3 className="font-bold text-rose-700 dark:text-rose-400 mb-2">Danger Zone</h3>
                <p className="text-xs text-rose-600/80 dark:text-rose-400/70 mb-4">These actions are irreversible. Please proceed with caution.</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[#22262f] border border-rose-200 dark:border-rose-700/50 rounded-lg text-sm text-rose-700 dark:text-rose-400 font-semibold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                    <div className="flex items-center gap-2"><Trash2 size={14} /> Clear All Logs</div>
                    <ChevronRight size={14} />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[#22262f] border border-rose-200 dark:border-rose-700/50 rounded-lg text-sm text-rose-700 dark:text-rose-400 font-semibold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                    <div className="flex items-center gap-2"><Trash2 size={14} /> Reset All Settings</div>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
