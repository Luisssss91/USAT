import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  Book, 
  FileText, 
  Calendar, 
  CreditCard,
  UserCheck,
  Bell,
  Menu,
  X,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const studentMenuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/student" },
  { title: "Profile", icon: User, path: "/student/profile" },
  { title: "Grades", icon: Book, path: "/student/grades" },
  { title: "Assignments", icon: FileText, path: "/student/assignments" },
  { title: "Timetable", icon: Calendar, path: "/student/timetable" },
  { title: "Attendance", icon: UserCheck, path: "/student/attendance" },
  { title: "Fees", icon: CreditCard, path: "/student/fees" },
  { title: "Announcements", icon: Bell, path: "/student/announcements" },
];

interface StudentSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function StudentSidebar({ isOpen, onToggle }: StudentSidebarProps) {
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
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-card-foreground">Student Portal</h2>
              <p className="text-xs text-muted-foreground">Alex Johnson</p>
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
            {studentMenuItems.map((item) => (
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

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-secondary/50 rounded-lg">
            <p className="text-sm font-medium">Need Help?</p>
            <p className="text-xs text-muted-foreground mb-2">Contact your teacher or admin</p>
            <Button size="sm" variant="outline" className="w-full">
              Get Support
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}