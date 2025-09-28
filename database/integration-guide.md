# Integrating Database with React Components

This guide shows how to update your existing React components to use the Supabase database instead of hardcoded data.

## Step 1: Install Dependencies

The Supabase client has been added to your project. Make sure your Supabase integration is connected via the green Supabase button.

## Step 2: Update Components

### Dashboard Statistics

Replace hardcoded stats in `src/pages/Dashboard.tsx`:

```tsx
// Before (hardcoded)
<StatCard title="Total Students" value="1,247" />

// After (using database)
import { dbService } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { StatCard } from "@/components/ui/stat-card"
import { Users, GraduationCap } from "lucide-react"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalStaff: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dbService.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toString()}
          icon={Users}
          variant="success"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers.toString()}
          icon={GraduationCap}
        />
        <StatCard
          title="Total Staff"
          value={stats.totalStaff.toString()}
          icon={Users}
          variant="warning"
        />
      </div>
    </div>
  )
}
```

### Students Page

Update `src/pages/Students.tsx` to fetch real student data:

```tsx
import { dbService, Student } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const data = await dbService.getStudents()
        setStudents(data || [])
      } catch (error) {
        console.error('Error fetching students:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (student.roll_number && student.roll_number.includes(searchTerm))
    
    const matchesClass = classFilter === "all" || 
                        (student.classes && student.classes.name.startsWith(classFilter))
    
    return matchesSearch && matchesClass
  })

  if (loading) {
    return <div>Loading students...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Students</h1>
        <Button>Add Student</Button>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search students..."
          className="border rounded-md px-3 py-2 w-full"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-md px-3 py-2"
          value={classFilter}
          onChange={e => setClassFilter(e.target.value)}
        >
          <option value="all">All Classes</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>
      </div>
      <Table>
        <TableCaption>A list of all students in your school.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Roll No</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Guardian</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id} className="border-b border-card-border hover:bg-secondary/50">
              <TableCell className="py-3 px-4">
                <span className="font-mono text-sm">{student.student_id}</span>
              </TableCell>
              <TableCell className="py-3 px-4">
                <div className="font-medium">{student.name}</div>
              </TableCell>
              <TableCell className="py-3 px-4">{student.classes?.name || 'N/A'}</TableCell>
              <TableCell className="py-3 px-4">{student.roll_number || 'N/A'}</TableCell>
              <TableCell className="py-3 px-4">{student.phone || 'N/A'}</TableCell>
              <TableCell className="py-3 px-4">{student.guardian_name || 'N/A'}</TableCell>
              <TableCell className="py-3 px-4">
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
              </TableCell>
              <TableCell className="py-3 px-4 text-right font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              {students.length} students
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
```

### Student Dashboard

Update `src/pages/StudentDashboard.tsx` to show real student data:

```tsx
import { dbService, Student, Grade, Announcement } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book, Bell } from "lucide-react"

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null)
  const [grades, setGrades] = useState<Grade[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  
  // You would get the student ID from authentication or route params
  const studentId = "your-student-id" // Replace with actual student ID
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [studentData, gradesData, announcementsData] = await Promise.all([
          dbService.getStudentById(studentId),
          dbService.getStudentGrades(studentId),
          dbService.getAnnouncements(3)
        ])
        
        setStudent(studentData)
        setGrades(gradesData || [])
        setAnnouncements(announcementsData || [])
      } catch (error) {
        console.error('Error fetching student data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [studentId])

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  if (!student) {
    return <div>Student not found</div>
  }

  // Calculate recent grades from database
  const recentGrades = grades.slice(0, 4).map(grade => ({
    subject: grade.subjects?.name || 'Unknown',
    grade: grade.grade,
    score: grade.percentage
  }))

  return (
    <div className="space-y-6">
      {/* Welcome Header with real data */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Welcome back, {student.name}!</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          <span>Student ID: {student.student_id}</span>
          <span>Class: {student.classes?.name || 'N/A'}</span>
          <span>Roll No: {student.roll_number || 'N/A'}</span>
        </div>
      </div>

      {/* Recent Grades using real data */}
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

      {/* Real Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-3 bg-secondary/50 rounded-lg">
                <h4 className="font-medium">{announcement.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {announcement.content}
                </p>
                <p className="text-xs text-muted-foreground">
                  Posted {new Date(announcement.published_date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

## Step 3: Add Loading States and Error Handling

Always include proper loading states and error handling:

```tsx
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dbService.getStudents()
      setStudents(data || [])
    } catch (err) {
      setError('Failed to load data. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])

if (loading) return <div className="p-4">Loading...</div>
if (error) return <div className="p-4 text-red-500">{error}</div>
```

## Step 4: Authentication Integration

When you add authentication:

```tsx
import { supabase } from '@/lib/supabase'

// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Filter data based on user role
const students = user.role === 'teacher' 
  ? await dbService.getStudents() 
  : await dbService.getStudentById(user.id)
```

## Step 5: Real-time Updates (Optional)

For real-time data updates:

```tsx
useEffect(() => {
  const channel = supabase
    .channel('students')
    .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'students' }, 
        (payload) => {
          // Handle real-time updates
          console.log('Change received!', payload)
          // Refresh your data
        }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])
```

## Next Steps

1. Update each component one by one
2. Test thoroughly with the sample data
3. Add proper error boundaries
4. Implement user authentication
5. Add form validation for data entry
6. Set up proper Row Level Security in Supabase
