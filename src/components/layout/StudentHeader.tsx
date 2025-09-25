import { Bell, Search, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface StudentHeaderProps {
  onMenuToggle: () => void;
}

export function StudentHeader({ onMenuToggle }: StudentHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-card-border px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search assignments, grades..."
                className="pl-9 w-64"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              2
            </Badge>
          </Button>

          {/* Switch Dashboard */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/')}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Switch Dashboard
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Student - 10th A</p>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}