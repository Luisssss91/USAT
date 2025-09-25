import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Calendar, 
  UserPlus, 
  FileText, 
  MessageCircle,
  TrendingUp
} from "lucide-react";

const quickActions = [
  {
    title: "Add New Student",
    icon: UserPlus,
    description: "Register new student",
    action: "/students/new"
  },
  {
    title: "Schedule Meeting",
    icon: Calendar,
    description: "Create new meeting",
    action: "/meetings/new"
  },
  {
    title: "Generate Report",
    icon: FileText,
    description: "Academic reports",
    action: "/reports/generate"
  },
  {
    title: "Send Announcement",
    icon: MessageCircle,
    description: "Notify students/parents",
    action: "/communication/new"
  }
];

export function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start gap-3 p-4 h-auto"
          >
            <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
              <action.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}