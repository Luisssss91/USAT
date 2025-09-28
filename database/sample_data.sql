-- Sample Data for School Management System
-- Execute this SQL after running the schema.sql

-- Insert Sample Classes (Create classes first as they're referenced by other tables)
INSERT INTO classes (name, grade_level, section, academic_year) VALUES
('8-A', 8, 'A', '2024-25'),
('8-B', 8, 'B', '2024-25'),
('9-A', 9, 'A', '2024-25'),
('9-B', 9, 'B', '2024-25'),
('10-A', 10, 'A', '2024-25'),
('10-B', 10, 'B', '2024-25'),
('11-A', 11, 'A', '2024-25'),
('11-B', 11, 'B', '2024-25'),
('12-A', 12, 'A', '2024-25'),
('12-B', 12, 'B', '2024-25');

-- Insert Sample Teachers
INSERT INTO teachers (teacher_id, name, email, phone, qualification, experience_years, salary, joining_date) VALUES
('TCH001', 'Dr. John Smith', 'john.smith@school.edu', '+91-9876543210', 'PhD in Mathematics', 15, 65000.00, '2020-06-15'),
('TCH002', 'Ms. Sarah Johnson', 'sarah.johnson@school.edu', '+91-9876543211', 'MSc Physics', 8, 55000.00, '2021-07-20'),
('TCH003', 'Mr. Robert Brown', 'robert.brown@school.edu', '+91-9876543212', 'MA English Literature', 12, 60000.00, '2019-08-10'),
('TCH004', 'Dr. Emily Wilson', 'emily.wilson@school.edu', '+91-9876543213', 'PhD Chemistry', 10, 62000.00, '2020-03-25'),
('TCH005', 'Mr. David Martinez', 'david.martinez@school.edu', '+91-9876543214', 'MSc Computer Science', 6, 58000.00, '2022-01-15'),
('TCH006', 'Mrs. Lisa Davis', 'lisa.davis@school.edu', '+91-9876543215', 'MA History', 9, 56000.00, '2021-04-12');

-- Insert Sample Staff
INSERT INTO staff (staff_id, name, email, phone, position, department, salary, joining_date) VALUES
('STF001', 'Mr. Michael Chen', 'michael.chen@school.edu', '+91-9876543220', 'Principal', 'Administration', 85000.00, '2018-04-01'),
('STF002', 'Mrs. Jennifer Lee', 'jennifer.lee@school.edu', '+91-9876543221', 'Vice Principal', 'Administration', 75000.00, '2019-07-15'),
('STF003', 'Mr. Thomas Anderson', 'thomas.anderson@school.edu', '+91-9876543222', 'Librarian', 'Library', 35000.00, '2020-09-01'),
('STF004', 'Ms. Anna Rodriguez', 'anna.rodriguez@school.edu', '+91-9876543223', 'Nurse', 'Health', 40000.00, '2021-02-20'),
('STF005', 'Mr. James Wilson', 'james.wilson@school.edu', '+91-9876543224', 'Security Supervisor', 'Security', 32000.00, '2020-11-10');

-- Update classes with class teachers
UPDATE classes SET class_teacher_id = (SELECT id FROM teachers WHERE teacher_id = 'TCH001') WHERE name = '10-A';
UPDATE classes SET class_teacher_id = (SELECT id FROM teachers WHERE teacher_id = 'TCH002') WHERE name = '10-B';
UPDATE classes SET class_teacher_id = (SELECT id FROM teachers WHERE teacher_id = 'TCH003') WHERE name = '9-A';
UPDATE classes SET class_teacher_id = (SELECT id FROM teachers WHERE teacher_id = 'TCH004') WHERE name = '9-B';
UPDATE classes SET class_teacher_id = (SELECT id FROM teachers WHERE teacher_id = 'TCH005') WHERE name = '11-A';
UPDATE classes SET class_teacher_id = (SELECT id FROM teachers WHERE teacher_id = 'TCH006') WHERE name = '8-A';

-- Insert Sample Subjects
INSERT INTO subjects (name, code, grade_level, is_mandatory) VALUES
-- Grade 8
('Mathematics', 'MATH8', 8, true),
('English', 'ENG8', 8, true),
('Science', 'SCI8', 8, true),
('Social Studies', 'SS8', 8, true),
('Physical Education', 'PE8', 8, true),
-- Grade 9
('Mathematics', 'MATH9', 9, true),
('English', 'ENG9', 9, true),
('Physics', 'PHY9', 9, true),
('Chemistry', 'CHEM9', 9, true),
('Biology', 'BIO9', 9, true),
('History', 'HIST9', 9, true),
-- Grade 10
('Mathematics', 'MATH10', 10, true),
('English', 'ENG10', 10, true),
('Physics', 'PHY10', 10, true),
('Chemistry', 'CHEM10', 10, true),
('Biology', 'BIO10', 10, true),
('History', 'HIST10', 10, true),
-- Grade 11
('Mathematics', 'MATH11', 11, true),
('English', 'ENG11', 11, true),
('Physics', 'PHY11', 11, true),
('Chemistry', 'CHEM11', 11, true),
('Computer Science', 'CS11', 11, false),
-- Grade 12
('Mathematics', 'MATH12', 12, true),
('English', 'ENG12', 12, true),
('Physics', 'PHY12', 12, true),
('Chemistry', 'CHEM12', 12, true),
('Computer Science', 'CS12', 12, false);

-- Insert Sample Students
INSERT INTO students (student_id, name, email, phone, guardian_name, guardian_phone, guardian_email, roll_number, class_id, date_of_birth, address) VALUES
('STU001', 'Alice Johnson', 'alice.johnson@student.school.edu', '+91-9876540001', 'Robert Johnson', '+91-9876543210', 'robert.johnson@email.com', '101', (SELECT id FROM classes WHERE name = '10-A'), '2008-05-15', '123 Maple Street, City'),
('STU002', 'Bob Smith', 'bob.smith@student.school.edu', '+91-9876540002', 'Mary Smith', '+91-9876543211', 'mary.smith@email.com', '205', (SELECT id FROM classes WHERE name = '9-B'), '2009-03-22', '456 Oak Avenue, City'),
('STU003', 'Charlie Brown', 'charlie.brown@student.school.edu', '+91-9876540003', 'Diana Brown', '+91-9876543212', 'diana.brown@email.com', '087', (SELECT id FROM classes WHERE name = '11-A'), '2007-11-08', '789 Pine Road, City'),
('STU004', 'David Wilson', 'david.wilson@student.school.edu', '+91-9876540004', 'Sarah Wilson', '+91-9876543213', 'sarah.wilson@email.com', '156', (SELECT id FROM classes WHERE name = '8-C'), '2010-07-12', '321 Elm Street, City'),
('STU005', 'Eva Martinez', 'eva.martinez@student.school.edu', '+91-9876540005', 'Carlos Martinez', '+91-9876543214', 'carlos.martinez@email.com', '034', (SELECT id FROM classes WHERE name = '12-A'), '2006-12-03', '654 Cedar Lane, City'),
('STU006', 'Frank Thompson', 'frank.thompson@student.school.edu', '+91-9876540006', 'Linda Thompson', '+91-9876543215', 'linda.thompson@email.com', '102', (SELECT id FROM classes WHERE name = '10-A'), '2008-08-25', '987 Birch Court, City'),
('STU007', 'Grace Lee', 'grace.lee@student.school.edu', '+91-9876540007', 'Kevin Lee', '+91-9876543216', 'kevin.lee@email.com', '203', (SELECT id FROM classes WHERE name = '9-A'), '2009-01-17', '147 Spruce Drive, City'),
('STU008', 'Henry Garcia', 'henry.garcia@student.school.edu', '+91-9876540008', 'Maria Garcia', '+91-9876543217', 'maria.garcia@email.com', '088', (SELECT id FROM classes WHERE name = '11-A'), '2007-04-30', '258 Willow Way, City');

-- Insert Class-Subject assignments
WITH class_subject_data AS (
  SELECT 
    c.id as class_id,
    s.id as subject_id,
    t.id as teacher_id,
    CASE 
      WHEN s.name = 'Mathematics' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH001')
      WHEN s.name = 'Physics' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH002')
      WHEN s.name = 'English' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH003')
      WHEN s.name = 'Chemistry' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH004')
      WHEN s.name = 'Computer Science' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH005')
      ELSE (SELECT id FROM teachers WHERE teacher_id = 'TCH006')
    END as assigned_teacher_id
  FROM classes c
  CROSS JOIN subjects s
  LEFT JOIN teachers t ON t.id = (
    CASE 
      WHEN s.name = 'Mathematics' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH001')
      WHEN s.name = 'Physics' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH002')
      WHEN s.name = 'English' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH003')
      WHEN s.name = 'Chemistry' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH004')
      WHEN s.name = 'Computer Science' THEN (SELECT id FROM teachers WHERE teacher_id = 'TCH005')
      ELSE (SELECT id FROM teachers WHERE teacher_id = 'TCH006')
    END
  )
  WHERE c.grade_level = s.grade_level
)
INSERT INTO class_subjects (class_id, subject_id, teacher_id, periods_per_week)
SELECT class_id, subject_id, assigned_teacher_id, 
  CASE 
    WHEN subject_id IN (SELECT id FROM subjects WHERE name IN ('Mathematics', 'English', 'Physics', 'Chemistry')) THEN 6
    ELSE 4
  END as periods_per_week
FROM class_subject_data;

-- Insert Sample Grades
INSERT INTO grades (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date, academic_year, semester) 
SELECT 
  s.id,
  sub.id,
  'midterm',
  FLOOR(RANDOM() * 40 + 60), -- Random marks between 60-100
  100,
  '2024-09-15',
  '2024-25',
  'First'
FROM students s
CROSS JOIN subjects sub
JOIN classes c ON s.class_id = c.id
WHERE c.grade_level = sub.grade_level
AND RANDOM() < 0.8; -- Only 80% of students have grades entered

-- Insert Sample Assignments
INSERT INTO assignments (title, description, subject_id, class_id, teacher_id, due_date, total_marks) VALUES
('Quadratic Equations', 'Solve problems related to quadratic equations from Chapter 4', 
 (SELECT id FROM subjects WHERE code = 'MATH10'), 
 (SELECT id FROM classes WHERE name = '10-A'),
 (SELECT id FROM teachers WHERE teacher_id = 'TCH001'),
 '2024-12-15', 50),
('Laws of Motion', 'Assignment on Newton''s laws of motion with practical examples',
 (SELECT id FROM subjects WHERE code = 'PHY10'),
 (SELECT id FROM classes WHERE name = '10-A'),
 (SELECT id FROM teachers WHERE teacher_id = 'TCH002'),
 '2024-12-20', 40),
('Essay on Shakespeare', 'Write a 500-word essay on any Shakespeare play',
 (SELECT id FROM subjects WHERE code = 'ENG10'),
 (SELECT id FROM classes WHERE name = '10-A'),
 (SELECT id FROM teachers WHERE teacher_id = 'TCH003'),
 '2024-12-18', 30);

-- Insert Sample Assignment Submissions
INSERT INTO assignment_submissions (assignment_id, student_id, submission_text, submitted_at, status)
SELECT 
  a.id,
  s.id,
  'Sample submission text for ' || a.title,
  NOW() - INTERVAL '2 days',
  CASE WHEN RANDOM() < 0.7 THEN 'Submitted' ELSE 'Late' END
FROM assignments a
CROSS JOIN students s
JOIN classes c ON s.class_id = c.id
JOIN class_subjects cs ON cs.class_id = c.id AND cs.subject_id = a.subject_id
WHERE RANDOM() < 0.6; -- Only 60% of students have submitted

-- Insert Sample Attendance (last 30 days)
INSERT INTO attendance (student_id, class_id, subject_id, date, status, period_number, marked_by)
SELECT 
  s.id,
  s.class_id,
  cs.subject_id,
  date_series.date,
  CASE 
    WHEN RANDOM() < 0.92 THEN 'Present'
    WHEN RANDOM() < 0.05 THEN 'Late'
    ELSE 'Absent'
  END,
  FLOOR(RANDOM() * 6 + 1), -- Period 1-6
  cs.teacher_id
FROM students s
CROSS JOIN (
  SELECT generate_series(CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE - INTERVAL '1 day', '1 day')::date as date
) date_series
JOIN class_subjects cs ON cs.class_id = s.class_id
WHERE date_series.date NOT IN (
  SELECT date FROM generate_series(CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '1 week') as date
  WHERE EXTRACT(DOW FROM date) IN (0, 6) -- Exclude weekends
);

-- Insert Sample Announcements
INSERT INTO announcements (title, content, type, priority, target_audience, published_date, created_by) VALUES
('Science Exhibition 2024', 'Annual science exhibition will be held on January 25th, 2024. All students from grades 8-12 are encouraged to participate with their innovative projects. Registration deadline is January 15th.', 'Event', 'High', 'Students', CURRENT_DATE - INTERVAL '2 days', (SELECT id FROM teachers WHERE teacher_id = 'TCH001')),
('Parent-Teacher Meeting', 'Parent-teacher meeting is scheduled for January 30th, 2024, from 10:00 AM to 2:00 PM. Parents are requested to meet respective class teachers to discuss their ward''s progress.', 'Academic', 'High', 'Parents', CURRENT_DATE - INTERVAL '1 week', (SELECT id FROM teachers WHERE teacher_id = 'TCH002')),
('Library Hours Extended', 'Due to upcoming examinations, library hours have been extended. The library will now remain open until 8:00 PM on weekdays for better study facilities.', 'General', 'Normal', 'All', CURRENT_DATE - INTERVAL '1 week', (SELECT id FROM teachers WHERE teacher_id = 'TCH003')),
('Winter Holiday Notice', 'School will remain closed from December 25th to January 2nd for winter holidays. Classes will resume on January 3rd, 2024.', 'Holiday', 'High', 'All', CURRENT_DATE - INTERVAL '10 days', (SELECT id FROM teachers WHERE teacher_id = 'TCH001'));

-- Insert Sample Fee Structure
INSERT INTO fee_structure (class_id, fee_type, amount, due_date, academic_year) 
SELECT 
  c.id,
  fee_types.fee_type,
  fee_types.amount,
  '2024-04-15',
  '2024-25'
FROM classes c
CROSS JOIN (
  VALUES 
    ('Tuition Fee', 15000.00),
    ('Library Fee', 500.00),
    ('Laboratory Fee', 1000.00),
    ('Sports Fee', 750.00),
    ('Examination Fee', 800.00)
) AS fee_types(fee_type, amount);

-- Insert Sample Fee Payments
INSERT INTO fee_payments (student_id, fee_structure_id, amount_paid, payment_date, payment_method, receipt_number, status)
SELECT 
  s.id,
  fs.id,
  fs.amount,
  CURRENT_DATE - INTERVAL '30 days' + (RANDOM() * INTERVAL '25 days'),
  CASE 
    WHEN RANDOM() < 0.6 THEN 'Online'
    WHEN RANDOM() < 0.3 THEN 'Cash'
    ELSE 'Cheque'
  END,
  'RCP-' || LPAD((ROW_NUMBER() OVER())::text, 6, '0'),
  'Completed'
FROM students s
CROSS JOIN fee_structure fs
JOIN classes c ON s.class_id = c.id
WHERE fs.class_id = c.id
AND RANDOM() < 0.8; -- 80% of fees are paid

-- Insert Sample Leave Requests
INSERT INTO leave_requests (student_id, leave_type, start_date, end_date, reason, status, approved_by, approved_at)
SELECT 
  s.id,
  CASE 
    WHEN RANDOM() < 0.4 THEN 'Sick'
    WHEN RANDOM() < 0.3 THEN 'Personal'
    ELSE 'Family Function'
  END,
  CURRENT_DATE + INTERVAL '1 day' + (RANDOM() * INTERVAL '10 days'),
  CURRENT_DATE + INTERVAL '2 days' + (RANDOM() * INTERVAL '12 days'),
  'Family emergency requires immediate attention',
  CASE 
    WHEN RANDOM() < 0.7 THEN 'Approved'
    WHEN RANDOM() < 0.2 THEN 'Pending'
    ELSE 'Rejected'
  END,
  (SELECT id FROM teachers ORDER BY RANDOM() LIMIT 1),
  CASE 
    WHEN RANDOM() < 0.7 THEN NOW() - INTERVAL '1 day'
    ELSE NULL
  END
FROM students s
WHERE RANDOM() < 0.3; -- Only 30% of students have leave requests

-- Insert Sample Timetable for one class (10-A)
INSERT INTO timetable (class_id, subject_id, teacher_id, day_of_week, start_time, end_time, room_number, academic_year)
SELECT 
  (SELECT id FROM classes WHERE name = '10-A'),
  cs.subject_id,
  cs.teacher_id,
  schedule.day_of_week,
  schedule.start_time,
  schedule.end_time,
  'Room-' || (FLOOR(RANDOM() * 20) + 101)::text,
  '2024-25'
FROM class_subjects cs
CROSS JOIN (
  VALUES 
    (1, '09:00:00', '09:45:00'), -- Monday
    (1, '09:45:00', '10:30:00'),
    (1, '11:00:00', '11:45:00'),
    (2, '09:00:00', '09:45:00'), -- Tuesday
    (2, '10:30:00', '11:15:00'),
    (2, '11:15:00', '12:00:00'),
    (3, '09:00:00', '09:45:00'), -- Wednesday
    (3, '09:45:00', '10:30:00'),
    (4, '09:00:00', '09:45:00'), -- Thursday
    (4, '11:00:00', '11:45:00'),
    (5, '09:00:00', '09:45:00'), -- Friday
    (5, '10:30:00', '11:15:00')
) AS schedule(day_of_week, start_time, end_time)
WHERE cs.class_id = (SELECT id FROM classes WHERE name = '10-A')
ORDER BY RANDOM()
LIMIT 20; -- Limit to avoid too many entries