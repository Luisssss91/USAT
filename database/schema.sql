-- School Management System Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- Enable Row Level Security
-- Students table
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  date_of_birth DATE,
  address TEXT,
  guardian_name VARCHAR(100),
  guardian_phone VARCHAR(20),
  guardian_email VARCHAR(100),
  class_id UUID REFERENCES classes(id),
  roll_number VARCHAR(10),
  admission_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Graduated', 'Transferred')),
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  date_of_birth DATE,
  qualification VARCHAR(200),
  experience_years INTEGER,
  salary DECIMAL(10,2),
  joining_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'On Leave')),
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff table
CREATE TABLE staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  salary DECIMAL(10,2),
  joining_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'On Leave')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL, -- e.g., "10-A", "9-B"
  grade_level INTEGER NOT NULL, -- e.g., 10, 9, 8
  section VARCHAR(5) NOT NULL, -- e.g., "A", "B", "C"
  class_teacher_id UUID REFERENCES teachers(id),
  academic_year VARCHAR(10) NOT NULL, -- e.g., "2023-24"
  max_students INTEGER DEFAULT 40,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(grade_level, section, academic_year)
);

-- Subjects table
CREATE TABLE subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) UNIQUE NOT NULL,
  description TEXT,
  grade_level INTEGER NOT NULL,
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class Subjects (Many-to-Many relationship)
CREATE TABLE class_subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id),
  periods_per_week INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(class_id, subject_id)
);

-- Grades/Marks table
CREATE TABLE grades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id),
  exam_type VARCHAR(50) NOT NULL, -- 'midterm', 'final', 'assignment', 'quiz'
  marks_obtained DECIMAL(5,2) NOT NULL,
  total_marks DECIMAL(5,2) NOT NULL,
  percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN total_marks > 0 THEN (marks_obtained / total_marks) * 100 
      ELSE 0 
    END
  ) STORED,
  grade VARCHAR(5) GENERATED ALWAYS AS (
    CASE 
      WHEN (marks_obtained / total_marks) * 100 >= 90 THEN 'A+'
      WHEN (marks_obtained / total_marks) * 100 >= 80 THEN 'A'
      WHEN (marks_obtained / total_marks) * 100 >= 70 THEN 'B+'
      WHEN (marks_obtained / total_marks) * 100 >= 60 THEN 'B'
      WHEN (marks_obtained / total_marks) * 100 >= 50 THEN 'C'
      ELSE 'F'
    END
  ) STORED,
  exam_date DATE,
  academic_year VARCHAR(10) NOT NULL,
  semester VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assignments table
CREATE TABLE assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  subject_id UUID REFERENCES subjects(id),
  class_id UUID REFERENCES classes(id),
  teacher_id UUID REFERENCES teachers(id),
  due_date DATE NOT NULL,
  total_marks DECIMAL(5,2) DEFAULT 100,
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'Cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assignment Submissions table
CREATE TABLE assignment_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  submission_text TEXT,
  file_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  marks_obtained DECIMAL(5,2),
  feedback TEXT,
  status VARCHAR(20) DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Graded', 'Late', 'Missing')),
  graded_by UUID REFERENCES teachers(id),
  graded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(assignment_id, student_id)
);

-- Attendance table
CREATE TABLE attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id),
  subject_id UUID REFERENCES subjects(id),
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Present', 'Absent', 'Late', 'Excused')),
  period_number INTEGER,
  notes TEXT,
  marked_by UUID REFERENCES teachers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, date, subject_id, period_number)
);

-- Announcements table
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'General', -- 'General', 'Academic', 'Event', 'Holiday', 'Emergency'
  priority VARCHAR(20) DEFAULT 'Normal' CHECK (priority IN ('Low', 'Normal', 'High', 'Urgent')),
  target_audience VARCHAR(50) DEFAULT 'All', -- 'All', 'Students', 'Teachers', 'Parents', 'Staff'
  class_id UUID REFERENCES classes(id), -- NULL for all classes
  published_date DATE DEFAULT CURRENT_DATE,
  expiry_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES teachers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fee Structure table
CREATE TABLE fee_structure (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  fee_type VARCHAR(100) NOT NULL, -- 'Tuition', 'Library', 'Lab', 'Transport', 'Exam'
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE,
  academic_year VARCHAR(10) NOT NULL,
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fee Payments table
CREATE TABLE fee_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  fee_structure_id UUID REFERENCES fee_structure(id),
  amount_paid DECIMAL(10,2) NOT NULL,
  payment_date DATE DEFAULT CURRENT_DATE,
  payment_method VARCHAR(50) DEFAULT 'Cash', -- 'Cash', 'Online', 'Cheque', 'Card'
  transaction_id VARCHAR(100),
  receipt_number VARCHAR(50) UNIQUE,
  status VARCHAR(20) DEFAULT 'Completed' CHECK (status IN ('Pending', 'Completed', 'Failed', 'Refunded')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leave Requests table
CREATE TABLE leave_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE, -- NULL if student request
  staff_id UUID REFERENCES staff(id) ON DELETE CASCADE, -- NULL if not staff request
  leave_type VARCHAR(50) NOT NULL, -- 'Sick', 'Personal', 'Emergency', 'Vacation'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  approved_by UUID, -- Can reference teachers, staff, or admin
  approved_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timetable table
CREATE TABLE timetable (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  subject_id UUID REFERENCES subjects(id),
  teacher_id UUID REFERENCES teachers(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Monday, 7=Sunday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room_number VARCHAR(20),
  academic_year VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(class_id, day_of_week, start_time, academic_year)
);

-- Create indexes for better performance
CREATE INDEX idx_students_class_id ON students(class_id);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_grades_student_id ON grades(student_id);
CREATE INDEX idx_grades_subject_id ON grades(subject_id);
CREATE INDEX idx_attendance_student_id ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_assignments_class_id ON assignments(class_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
CREATE INDEX idx_fee_payments_student_id ON fee_payments(student_id);
CREATE INDEX idx_announcements_published_date ON announcements(published_date);
CREATE INDEX idx_timetable_class_day ON timetable(class_id, day_of_week);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables with updated_at column
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN
        SELECT table_name FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
        AND table_schema = 'public'
    LOOP
        EXECUTE format('CREATE TRIGGER update_%I_updated_at 
                       BEFORE UPDATE ON %I 
                       FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', t, t);
    END LOOP;
END;
$$;