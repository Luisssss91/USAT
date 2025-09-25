import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { StudentLayout } from "@/components/layout/StudentLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentGrades from "./pages/StudentGrades";
import RoleSelection from "./pages/RoleSelection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route - Role Selection */}
          <Route path="/" element={<RoleSelection />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/admin/students" element={
            <Layout>
              <Students />
            </Layout>
          } />
          <Route path="/admin/academic" element={
            <Layout>
              <div className="p-6 text-center text-muted-foreground">Academic section coming soon...</div>
            </Layout>
          } />
          <Route path="/admin/hr" element={
            <Layout>
              <div className="p-6 text-center text-muted-foreground">HR section coming soon...</div>
            </Layout>
          } />
          <Route path="/admin/examinations" element={
            <Layout>
              <div className="p-6 text-center text-muted-foreground">Examinations section coming soon...</div>
            </Layout>
          } />
          <Route path="/admin/communication" element={
            <Layout>
              <div className="p-6 text-center text-muted-foreground">Communication section coming soon...</div>
            </Layout>
          } />
          <Route path="/admin/reports" element={
            <Layout>
              <div className="p-6 text-center text-muted-foreground">Reports section coming soon...</div>
            </Layout>
          } />
          <Route path="/admin/fees" element={
            <Layout>
              <div className="p-6 text-center text-muted-foreground">Fees section coming soon...</div>
            </Layout>
          } />

          {/* Student Routes */}
          <Route path="/student" element={
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          } />
          <Route path="/student/profile" element={
            <StudentLayout>
              <StudentProfile />
            </StudentLayout>
          } />
          <Route path="/student/grades" element={
            <StudentLayout>
              <StudentGrades />
            </StudentLayout>
          } />
          <Route path="/student/assignments" element={
            <StudentLayout>
              <div className="p-6 text-center text-muted-foreground">Assignments section coming soon...</div>
            </StudentLayout>
          } />
          <Route path="/student/timetable" element={
            <StudentLayout>
              <div className="p-6 text-center text-muted-foreground">Timetable section coming soon...</div>
            </StudentLayout>
          } />
          <Route path="/student/attendance" element={
            <StudentLayout>
              <div className="p-6 text-center text-muted-foreground">Attendance section coming soon...</div>
            </StudentLayout>
          } />
          <Route path="/student/fees" element={
            <StudentLayout>
              <div className="p-6 text-center text-muted-foreground">Fee status coming soon...</div>
            </StudentLayout>
          } />
          <Route path="/student/announcements" element={
            <StudentLayout>
              <div className="p-6 text-center text-muted-foreground">Announcements section coming soon...</div>
            </StudentLayout>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
