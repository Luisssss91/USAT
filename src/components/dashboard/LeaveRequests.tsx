import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, User } from "lucide-react";

const leaveRequests = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Mathematics Teacher",
    type: "Sick Leave",
    dates: "Dec 25-26, 2024",
    status: "pending"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Physical Education",
    type: "Personal Leave",
    dates: "Jan 2-3, 2025",
    status: "pending"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Admin Assistant",
    type: "Vacation",
    dates: "Dec 30-31, 2024",
    status: "approved"
  }
];

const statusColors = {
  pending: "bg-warning-light text-warning border-warning/20",
  approved: "bg-success-light text-success border-success/20",
  rejected: "bg-destructive-light text-destructive border-destructive/20"
};

export function LeaveRequests() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Leave Requests</CardTitle>
        <p className="text-sm text-muted-foreground">Recent staff leave applications</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaveRequests.map((request) => (
          <div key={request.id} className="p-4 rounded-lg border border-card-border space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{request.name}</h4>
                  <p className="text-xs text-muted-foreground">{request.role}</p>
                </div>
              </div>
              <Badge 
                variant="outline"
                className={statusColors[request.status as keyof typeof statusColors]}
              >
                {request.status}
              </Badge>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">{request.type}</p>
              <p className="text-xs text-muted-foreground">{request.dates}</p>
            </div>
            
            {request.status === "pending" && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Check className="h-3 w-3 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <X className="h-3 w-3 mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}