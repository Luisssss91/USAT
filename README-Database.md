# School Management System Database Setup

This document explains how to set up the database for your School Management System using Supabase.

## Prerequisites

- Supabase account connected to your Lovable project
- Access to Supabase SQL Editor

## Setup Instructions

### Step 1: Execute Schema
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Click "Run" to execute the schema

### Step 2: Add Sample Data (Optional)
1. In the SQL Editor, copy and paste the contents of `database/sample_data.sql`
2. Click "Run" to populate your database with sample data

## Database Structure

### Core Tables

#### Students Table
- Student information, guardians, class assignments
- Tracks admission dates, status, and contact details

#### Teachers Table
- Teacher profiles, qualifications, salary information
- Manages experience, joining dates, and contact details

#### Classes Table
- Class definitions (grade level, section, academic year)
- Links to class teachers and capacity management

#### Subjects Table
- Subject definitions for different grade levels
- Mandatory/optional subject classification

#### Grades Table
- Student marks and automatic grade calculation
- Supports different exam types (midterm, final, assignment, quiz)
- Auto-calculates percentages and letter grades

#### Assignments Table
- Assignment management with due dates
- Links to subjects, classes, and teachers

#### Attendance Table
- Daily attendance tracking
- Supports different periods and attendance statuses

#### Announcements Table
- School-wide or class-specific announcements
- Priority levels and target audience management

#### Fee Management
- Fee structure definitions
- Payment tracking with receipt management

### Features

#### Automatic Grade Calculation
- Grades are automatically calculated based on marks
- Percentage calculation: (marks_obtained / total_marks) * 100
- Letter grades: A+ (90+), A (80+), B+ (70+), B (60+), C (50+), F (<50)

#### Row Level Security (RLS)
- Database is prepared for RLS implementation
- Secure access control for different user roles

#### Audit Trail
- All tables include created_at and updated_at timestamps
- Automatic timestamp updates on record modifications

#### Relationships
- Proper foreign key constraints
- Maintains data integrity across related tables

## Sample Data Overview

The sample data includes:
- 10 classes across grades 8-12
- 6 teachers with different specializations
- 5 staff members in various roles
- 8 students with complete profiles
- Subject assignments for all classes
- Sample grades, assignments, and attendance records
- Announcements and fee payment records

## Usage with React Components

After setting up the database, you can connect your existing React components to fetch real data instead of using hardcoded arrays. The database structure aligns with your current UI components:

- Dashboard statistics will come from actual student/teacher/staff counts
- Student management will use the students table
- Grade tracking will use the grades table
- Attendance management will use the attendance table

## Next Steps

1. Set up Row Level Security policies for different user roles
2. Create API endpoints or use Supabase client to connect your React components
3. Implement user authentication to control access to different sections
4. Add data validation and error handling in your components

## Backup and Maintenance

- Regular database backups are handled by Supabase
- Monitor query performance using Supabase dashboard
- Review and optimize indexes as data grows
- Consider archiving old academic year data periodically