import { useState } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const studentsData = [
  {
    id: "STU001",
    name: "Alice Johnson",
    class: "10-A",
    rollNo: "101",
    phone: "+91 98765 43210",
    guardian: "Robert Johnson",
    status: "Active"
  },
  {
    id: "STU002",
    name: "Bob Smith",
    class: "9-B",
    rollNo: "205",
    phone: "+91 87654 32109",
    guardian: "Mary Smith",
    status: "Active"
  },
  {
    id: "STU003",
    name: "Charlie Brown",
    class: "11-A",
    rollNo: "087",
    phone: "+91 76543 21098",
    guardian: "Diana Brown",
    status: "Inactive"
  },
  {
    id: "STU004",
    name: "David Wilson",
    class: "8-C",
    rollNo: "156",
    phone: "+91 65432 10987",
    guardian: "Sarah Wilson",
    status: "Active"
  },
  {
    id: "STU005",
    name: "Eva Martinez",
    class: "12-A",
    rollNo: "034",
    phone: "+91 54321 09876",
    guardian: "Carlos Martinez",
    status: "Active"
  }
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm);
    const matchesClass = classFilter === "all" || student.class.startsWith(classFilter);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">Manage student information and records</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Student
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, ID, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Students ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Student ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Class</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Roll No</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Guardian</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-card-border hover:bg-secondary/50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm">{student.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{student.name}</div>
                    </td>
                    <td className="py-3 px-4">{student.class}</td>
                    <td className="py-3 px-4">{student.rollNo}</td>
                    <td className="py-3 px-4">{student.phone}</td>
                    <td className="py-3 px-4">{student.guardian}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="outline"
                        className={
                          student.status === "Active" 
                            ? "bg-success-light text-success border-success/20"
                            : "bg-muted text-muted-foreground border-border"
                        }
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}