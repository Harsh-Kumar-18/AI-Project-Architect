import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      <DashboardNavbar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex h-[calc(100vh-64px)]">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8 lg:px-10 lg:py-10">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;