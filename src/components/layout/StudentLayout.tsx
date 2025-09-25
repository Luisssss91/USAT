import { useState } from "react";
import { StudentSidebar } from "./StudentSidebar";
import { StudentHeader } from "./StudentHeader";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className="lg:pl-64">
        <StudentHeader onMenuToggle={toggleSidebar} />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}