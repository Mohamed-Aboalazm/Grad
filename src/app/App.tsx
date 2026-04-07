import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { FrontDeskView } from "./components/FrontDeskView";
import { AnalyticsView } from "./components/AnalyticsView";
import { RoomManagementView } from "./components/RoomManagementView";
import { ConfigurationView } from "./components/ConfigurationView";
import { InventoryView } from "./components/InventoryView";
import { EmployeeAffairsView } from "./components/EmployeeAffairsView";
import { AccountingView } from "./components/AccountingView";
import { SecurityView } from "./components/SecurityView";
import { SettingsView } from "./components/SettingsView";

export default function App() {
  const [activeView, setActiveView] = useState("Analytics");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const renderView = () => {
    switch (activeView) {
      case "Analytics": return <AnalyticsView />;
      case "Front Desk": return <FrontDeskView />;
      case "Room Management": return <RoomManagementView />;
      case "Configuration": return <ConfigurationView />;
      case "Inventory": return <InventoryView />;
      case "Employee Affairs": return <EmployeeAffairsView />;
      case "Accounting": return <AccountingView />;
      case "Security": return <SecurityView />;
      case "Settings": return <SettingsView />;
      default: return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-[#1A1D24]">
          <h2 className="text-2xl font-bold text-slate-300 dark:text-slate-700 mb-2">{activeView}</h2>
          <p className="text-slate-500">This module is currently under construction.</p>
        </div>
      );
    }
  };

  return (
    <div
      className="flex h-screen bg-slate-50 dark:bg-[#1A1D24] text-slate-800 dark:text-slate-100 transition-colors duration-200"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      <main className="flex-1 flex flex-col min-w-0 relative z-0 overflow-hidden transition-colors duration-200">
        {renderView()}
      </main>
    </div>
  );
}