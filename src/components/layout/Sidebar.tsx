import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  UserCheck, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  CreditCard,
  Menu,
  X,
  School
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Students", icon: Users, path: "/students" },
  { title: "Academic", icon: GraduationCap, path: "/academic" },
  { title: "Human Resource", icon: UserCheck, path: "/hr" },
  { title: "Examinations", icon: FileText, path: "/examinations" },
  { title: "Communication", icon: MessageSquare, path: "/communication" },
  { title: "Reports", icon: BarChart3, path: "/reports" },
  { title: "Fees", icon: CreditCard, path: "/fees" },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-card border-r border-card-border z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-card-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <School className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-card-foreground">EduManage</h2>
              <p className="text-xs text-muted-foreground">School Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  )}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}