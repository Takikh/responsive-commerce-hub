
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-1 lg:ml-[280px] animate-in transition-all duration-300">
        <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
