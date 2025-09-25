import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    time: "10:00 AM",
    date: "Today",
    type: "meeting"
  },
  {
    id: 2,
    title: "Math Exam - Class 10",
    time: "9:00 AM",
    date: "Tomorrow",
    type: "exam"
  },
  {
    id: 3,
    title: "Science Fair",
    time: "2:00 PM",
    date: "Dec 28",
    type: "event"
  },
  {
    id: 4,
    title: "Staff Training",
    time: "11:00 AM",
    date: "Dec 30",
    type: "meeting"
  }
];

const eventTypes = {
  meeting: "bg-primary-light text-primary border-primary/20",
  exam: "bg-warning-light text-warning border-warning/20",
  event: "bg-success-light text-success border-success/20"
};

export function Calendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border border-card-border">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">{event.title}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{event.time}</span>
                <span>•</span>
                <span>{event.date}</span>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={eventTypes[event.type as keyof typeof eventTypes]}
            >
              {event.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}