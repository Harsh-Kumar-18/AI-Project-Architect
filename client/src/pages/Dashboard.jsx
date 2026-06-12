import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsSection from "../components/dashboard/StatsSection";
import RecentProjects from "../components/dashboard/RecentProjects";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import QuickActions from "../components/dashboard/QuickAction";
import { getUser } from "../services/authService";

const Dashboard = () => {
  const user = getUser();
  const displayName = user?.name || user?.email?.split("@")[0] || "there";

  return (
    <DashboardLayout>
      {/* Page header block */}
      <div className="mb-8">
        <WelcomeBanner name={displayName} />
      </div>

      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Stats row */}
      <div className="mb-8">
        <StatsSection />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 min-w-0">
          <RecentProjects />
        </div>
        <div className="min-w-0">
          <ActivityTimeline />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;