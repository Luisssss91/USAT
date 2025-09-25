import { Users, GraduationCap, UserCheck, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { FeeChart } from "@/components/dashboard/FeeChart";
import { Calendar } from "@/components/dashboard/Calendar";
import { LeaveRequests } from "@/components/dashboard/LeaveRequests";
import { QuickLinks } from "@/components/dashboard/QuickLinks";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your school today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value="1,247"
          icon={Users}
          trend={{ value: "12%", isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Total Teachers"
          value="84"
          icon={GraduationCap}
          trend={{ value: "3%", isPositive: true }}
        />
        <StatCard
          title="Total Staff"
          value="23"
          icon={UserCheck}
          trend={{ value: "1%", isPositive: false }}
        />
        <StatCard
          title="This Month Revenue"
          value="₹2,48,000"
          icon={TrendingUp}
          trend={{ value: "18%", isPositive: true }}
          variant="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Chart - spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <FeeChart />
        </div>
        
        {/* Calendar Widget */}
        <div>
          <Calendar />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaveRequests />
        <QuickLinks />
      </div>
    </div>
  );
}