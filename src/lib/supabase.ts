import { createClient } from '@supabase/supabase-js'

// These will be automatically set when you connect Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your database tables
export interface Student {
  id: string
  student_id: string
  name: string
  email?: string
  phone?: string
  date_of_birth?: string
  address?: string
  guardian_name?: string
  guardian_phone?: string
  guardian_email?: string
  roll_number?: string
  status: 'Active' | 'Inactive' | 'Graduated' | 'Transferred'
  class_id?: string
  created_at: string
  updated_at: string
}

export interface Teacher {
  id: string
  teacher_id: string
  name: string
  email: string
  phone?: string
  qualification?: string
  experience_years?: number
  salary?: number
  status: 'Active' | 'Inactive' | 'On Leave'
  created_at: string
  updated_at: string
}

export interface Class {
  id: string
  name: string
  grade_level: number
  section: string
  academic_year: string
  max_students?: number
  class_teacher_id?: string
  created_at: string
  updated_at: string
}

export interface Grade {
  id: string
  student_id: string
  subject_id: string
  exam_type: string
  marks_obtained: number
  total_marks: number
  percentage: number
  grade: string
  exam_date?: string
  academic_year: string
  created_at: string
}

export interface Assignment {
  id: string
  title: string
  description?: string
  subject_id: string
  class_id: string
  teacher_id: string
  due_date: string
  total_marks: number
  status: 'Active' | 'Completed' | 'Cancelled'
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  type: string
  priority: 'Low' | 'Normal' | 'High' | 'Urgent'
  target_audience: string
  published_date: string
  is_active: boolean
  created_at: string
}

// Database service functions
export const dbService = {
  // Students
  async getStudents() {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        classes (
          name,
          grade_level,
          section
        )
      `)
      .order('name')
    
    if (error) throw error
    return data
  },

  async getStudentById(id: string) {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        classes (
          name,
          grade_level,
          section
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Teachers
  async getTeachers() {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  // Classes
  async getClasses() {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        teachers (
          name,
          email
        )
      `)
      .order('grade_level', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Dashboard Statistics
  async getDashboardStats() {
    const [studentsResult, teachersResult, staffResult] = await Promise.all([
      supabase.from('students').select('id', { count: 'exact' }),
      supabase.from('teachers').select('id', { count: 'exact' }),
      supabase.from('staff').select('id', { count: 'exact' })
    ])

    return {
      totalStudents: studentsResult.count || 0,
      totalTeachers: teachersResult.count || 0,
      totalStaff: staffResult.count || 0
    }
  },

  // Grades for a specific student
  async getStudentGrades(studentId: string) {
    const { data, error } = await supabase
      .from('grades')
      .select(`
        *,
        subjects (
          name,
          code
        )
      `)
      .eq('student_id', studentId)
      .order('exam_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Assignments for a specific class
  async getClassAssignments(classId: string) {
    const { data, error } = await supabase
      .from('assignments')
      .select(`
        *,
        subjects (
          name,
          code
        ),
        teachers (
          name
        )
      `)
      .eq('class_id', classId)
      .order('due_date', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Recent announcements
  async getAnnouncements(limit: number = 5) {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .order('published_date', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  // Attendance for a specific student
  async getStudentAttendance(studentId: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('attendance')
      .select(`
        *,
        subjects (
          name,
          code
        )
      `)
      .eq('student_id', studentId)

    if (startDate) query = query.gte('date', startDate)
    if (endDate) query = query.lte('date', endDate)

    const { data, error } = await query.order('date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Leave requests
  async getLeaveRequests(status?: string) {
    let query = supabase
      .from('leave_requests')
      .select(`
        *,
        students (
          name,
          student_id
        ),
        teachers (
          name
        )
      `)

    if (status) query = query.eq('status', status)

    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}