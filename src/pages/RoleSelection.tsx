import { Users, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">EduManage</h1>
          <p className="text-xl text-muted-foreground">Choose your dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Dashboard */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Access administrative features including student management, staff oversight, fee collection, and comprehensive reporting.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Manage students and staff</li>
                <li>• View comprehensive reports</li>
                <li>• Handle fee collections</li>
                <li>• Academic administration</li>
              </ul>
              <Button 
                className="w-full" 
            onClick={() => navigate('/admin')}
          >
            Enter Admin Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Student Dashboard */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-8 w-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Student Portal</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Access your personal academic information including grades, assignments, timetable, and announcements.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• View grades and performance</li>
                <li>• Check assignments and submissions</li>
                <li>• Access class timetable</li>
                <li>• Monitor attendance</li>
              </ul>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate('/student')}
              >
                Enter Student Portal
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Need help? Contact your system administrator or IT support.
          </p>
        </div>
      </div>
    </div>
  );
}