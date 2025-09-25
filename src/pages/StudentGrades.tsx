import { Book, TrendingUp, Award, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StudentGrades() {
  const currentGrades = [
    { subject: "Mathematics", grade: "A+", score: 95, maxScore: 100, teacher: "Mr. Smith" },
    { subject: "Physics", grade: "A", score: 88, maxScore: 100, teacher: "Dr. Johnson" },
    { subject: "Chemistry", grade: "B+", score: 82, maxScore: 100, teacher: "Dr. Wilson" },
    { subject: "English", grade: "A", score: 90, maxScore: 100, teacher: "Ms. Brown" },
    { subject: "Biology", grade: "A-", score: 85, maxScore: 100, teacher: "Mrs. Davis" },
    { subject: "History", grade: "B+", score: 83, maxScore: 100, teacher: "Mr. Taylor" },
  ];

  const examHistory = [
    { exam: "Mid-Term Exam", date: "November 2023", percentage: 89, rank: 3 },
    { exam: "Monthly Test", date: "October 2023", percentage: 92, rank: 2 },
    { exam: "Unit Test 2", date: "September 2023", percentage: 87, rank: 5 },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'default';
    if (grade.startsWith('B')) return 'secondary';
    return 'outline';
  };

  const overallPercentage = Math.round(currentGrades.reduce((sum, grade) => sum + grade.score, 0) / currentGrades.length);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Grades & Performance</h1>
          <p className="text-muted-foreground">Track your academic progress</p>
        </div>
        <Select defaultValue="current">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Semester</SelectItem>
            <SelectItem value="previous">Previous Semester</SelectItem>
            <SelectItem value="yearly">Yearly Report</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Average</p>
                <p className="text-2xl font-bold">{overallPercentage}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <Progress value={overallPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Class Rank</p>
                <p className="text-2xl font-bold">3rd</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Out of 45 students</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subjects</p>
                <p className="text-2xl font-bold">{currentGrades.length}</p>
              </div>
              <Book className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">All subjects tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Highest Grade</p>
                <p className="text-2xl font-bold">A+</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Mathematics</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Grades */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subject Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentGrades.map((subject, index) => (
              <div key={index} className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{subject.subject}</h4>
                  <Badge variant={getGradeColor(subject.grade)}>
                    {subject.grade}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score: {subject.score}/{subject.maxScore}</span>
                    <span>{Math.round((subject.score / subject.maxScore) * 100)}%</span>
                  </div>
                  <Progress value={(subject.score / subject.maxScore) * 100} />
                  <p className="text-xs text-muted-foreground">Teacher: {subject.teacher}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exam History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Exam History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {examHistory.map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <h4 className="font-medium">{exam.exam}</h4>
                  <p className="text-sm text-muted-foreground">{exam.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{exam.percentage}%</p>
                  <p className="text-sm text-muted-foreground">Rank: {exam.rank}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-800 dark:text-green-200">Strengths</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                <li>• Excellent in Mathematics and Science</li>
                <li>• Consistent performance across terms</li>
                <li>• Strong analytical skills</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Areas for Improvement</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                <li>• Focus on Chemistry concepts</li>
                <li>• Improve History essay writing</li>
                <li>• Practice more problem-solving</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}