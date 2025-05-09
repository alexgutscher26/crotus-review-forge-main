
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

/**
 * Renders the main dashboard layout with sidebar and content area.
 */
const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
