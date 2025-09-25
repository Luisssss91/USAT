import { Book, Calendar, FileText, CreditCard, UserCheck, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function StudentDashboard() {
  const studentInfo = {
    name: "Alex Johnson",
    rollNo: "2024001",
    class: "10th Grade",
    section: "A",
    attendance: 92
  };

  const recentGrades = [
    { subject: "Mathematics", grade: "A+", score: 95 },
    { subject: "Physics", grade: "A", score: 88 },
    { subject: "Chemistry", grade: "B+", score: 82 },
    { subject: "English", grade: "A", score: 90 }
  ];

  const upcomingAssignments = [
    { subject: "Mathematics", title: "Quadratic Equations", dueDate: "2024-01-15", status: "pending" },
    { subject: "English", title: "Essay on Shakespeare", dueDate: "2024-01-18", status: "submitted" },
    { subject: "Physics", title: "Laws of Motion", dueDate: "2024-01-20", status: "pending" },
  ];

  const todaySchedule = [
    { time: "09:00 AM", subject: "Mathematics", teacher: "Mr. Smith", room: "101" },
    { time: "10:00 AM", subject: "Physics", teacher: "Dr. Johnson", room: "Lab-1" },
    { time: "11:00 AM", subject: "English", teacher: "Ms. Brown", room: "203" },
    { time: "12:00 PM", subject: "Chemistry", teacher: "Dr. Wilson", room: "Lab-2" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Welcome back, {studentInfo.name}!</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          <span>Roll No: {studentInfo.rollNo}</span>
          <span>Class: {studentInfo.class}</span>
          <span>Section: {studentInfo.section}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold">{studentInfo.attendance}%</p>
              </div>
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
            <Progress value={studentInfo.attendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assignments</p>
                <p className="text-2xl font-bold">2 Pending</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Grade</p>
                <p className="text-2xl font-bold">A-</p>
              </div>
              <Book className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fee Status</p>
                <p className="text-sm font-medium text-green-600">Paid</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{class_.subject}</h4>
                    <p className="text-sm text-muted-foreground">{class_.teacher} • Room {class_.room}</p>
                  </div>
                  <Badge variant="outline">{class_.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Recent Grades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{grade.subject}</h4>
                    <p className="text-sm text-muted-foreground">Score: {grade.score}%</p>
                  </div>
                  <Badge 
                    variant={grade.grade.startsWith('A') ? 'default' : grade.grade.startsWith('B') ? 'secondary' : 'outline'}
                  >
                    {grade.grade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={assignment.status === 'submitted' ? 'default' : 'destructive'}
                    >
                      {assignment.status}
                    </Badge>
                    {assignment.status === 'pending' && (
                      <Button size="sm" variant="outline">Submit</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-secondary/50 rounded-lg">
                <h4 className="font-medium">Science Exhibition</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Annual science exhibition will be held on January 25th. All students are encouraged to participate.
                </p>
                <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
              </div>
              
              <div className="p-3 bg-secondary/50 rounded-lg">
                <h4 className="font-medium">Parent-Teacher Meeting</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Parent-teacher meeting scheduled for January 30th from 10 AM to 2 PM.
                </p>
                <p className="text-xs text-muted-foreground">Posted 1 week ago</p>
              </div>

              <div className="p-3 bg-secondary/50 rounded-lg">
                <h4 className="font-medium">Library Hours Extended</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Library will now be open until 8 PM on weekdays for exam preparation.
                </p>
                <p className="text-xs text-muted-foreground">Posted 1 week ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}