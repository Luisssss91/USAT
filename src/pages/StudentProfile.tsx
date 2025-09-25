import { User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function StudentProfile() {
  const studentData = {
    name: "Alex Johnson",
    rollNo: "2024001",
    class: "10th Grade",
    section: "A",
    email: "alex.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Oak Street, Springfield, IL 62701",
    dateOfBirth: "May 15, 2008",
    bloodGroup: "O+",
    guardian: {
      name: "Michael Johnson",
      relationship: "Father",
      phone: "+1 (555) 987-6543",
      email: "michael.johnson@email.com"
    },
    emergencyContact: {
      name: "Sarah Johnson",
      relationship: "Mother",
      phone: "+1 (555) 456-7890"
    }
  };

  const academicInfo = {
    admissionDate: "August 15, 2020",
    currentSession: "2023-2024",
    previousSchool: "Springfield Elementary",
    achievements: [
      "Mathematics Olympiad - Gold Medal 2023",
      "Science Fair - First Prize 2023",
      "Perfect Attendance Award 2022"
    ]
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Student Profile</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>
        <Button className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarFallback className="text-2xl">{studentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle>{studentData.name}</CardTitle>
            <div className="flex justify-center gap-2 mt-2">
              <Badge variant="outline">Roll No: {studentData.rollNo}</Badge>
              <Badge variant="outline">{studentData.class} - {studentData.section}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{studentData.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{studentData.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">DOB: {studentData.dateOfBirth}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{studentData.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
              <p className="font-medium">{studentData.bloodGroup}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Current Session</label>
              <p className="font-medium">{academicInfo.currentSession}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Admission Date</label>
              <p className="font-medium">{academicInfo.admissionDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Previous School</label>
              <p className="font-medium">{academicInfo.previousSchool}</p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-secondary/50 rounded-lg">
              <h4 className="font-medium">{studentData.guardian.name}</h4>
              <p className="text-sm text-muted-foreground">{studentData.guardian.relationship}</p>
              <div className="flex items-center gap-2 mt-2">
                <Phone className="h-3 w-3" />
                <span className="text-xs">{studentData.guardian.phone}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-3 w-3" />
                <span className="text-xs">{studentData.guardian.email}</span>
              </div>
            </div>
            
            <div className="p-3 bg-secondary/50 rounded-lg">
              <h4 className="font-medium">{studentData.emergencyContact.name}</h4>
              <p className="text-sm text-muted-foreground">{studentData.emergencyContact.relationship}</p>
              <div className="flex items-center gap-2 mt-2">
                <Phone className="h-3 w-3" />
                <span className="text-xs">{studentData.emergencyContact.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements & Awards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {academicInfo.achievements.map((achievement, index) => (
              <div key={index} className="p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">🏆</span>
                  </div>
                  <p className="text-sm font-medium">{achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}