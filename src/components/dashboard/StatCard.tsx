import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  variant = "default" 
}: StatCardProps) {
  const variants = {
    default: "border-card-border",
    success: "border-success/20 bg-success-light",
    warning: "border-warning/20 bg-warning-light", 
    destructive: "border-destructive/20 bg-destructive-light"
  };

  const iconVariants = {
    default: "text-primary bg-primary-light",
    success: "text-success bg-success-light",
    warning: "text-warning bg-warning-light",
    destructive: "text-destructive bg-destructive-light"
  };

  return (
    <Card className={cn("border", variants[variant])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-card-foreground">{value}</p>
            {trend && (
              <p className={cn(
                "text-xs flex items-center gap-1",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                <span>{trend.isPositive ? "+" : ""}{trend.value}</span>
                <span className="text-muted-foreground">from last month</span>
              </p>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            iconVariants[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}