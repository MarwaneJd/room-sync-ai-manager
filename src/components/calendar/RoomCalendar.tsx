
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";

// You would need to install moment and react-big-calendar
// <lov-add-dependency>moment@latest</lov-add-dependency>
// <lov-add-dependency>react-big-calendar@latest</lov-add-dependency>

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  roomId: number;
  userId: number;
}

interface RoomCalendarProps {
  events?: Event[];
  onEventClick?: (event: Event) => void;
  onSlotSelect?: (slotInfo: { start: Date; end: Date }) => void;
}

const RoomCalendar: React.FC<RoomCalendarProps> = ({
  events = [],
  onEventClick,
  onSlotSelect,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Sample data
  const sampleEvents: Event[] = [
    {
      id: 1,
      title: "Team Meeting",
      start: new Date(2025, 4, 20, 10, 0),
      end: new Date(2025, 4, 20, 11, 30),
      roomId: 1,
      userId: 1,
    },
    {
      id: 2,
      title: "Product Review",
      start: new Date(2025, 4, 21, 14, 0),
      end: new Date(2025, 4, 21, 15, 30),
      roomId: 2,
      userId: 2,
    },
    {
      id: 3,
      title: "Client Call",
      start: new Date(2025, 4, 22, 9, 0),
      end: new Date(2025, 4, 22, 10, 0),
      roomId: 3,
      userId: 1,
    },
  ];

  const allEvents = events.length > 0 ? events : sampleEvents;

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    if (onEventClick) {
      onEventClick(event);
    }
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    if (onSlotSelect) {
      onSlotSelect(slotInfo);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
          Room Reservations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] mt-4">
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectEvent={handleEventClick}
            onSelectSlot={handleSelectSlot}
            selectable
            views={["month", "week", "day"]}
            defaultView="week"
            eventPropGetter={() => ({
              className: "bg-primary text-white rounded-md px-2 py-1",
            })}
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4" variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" /> New Reservation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Reservation</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>Form would go here in a real implementation.</p>
            </div>
          </DialogContent>
        </Dialog>

        {selectedEvent && (
          <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p>
                  <strong>Start:</strong>{" "}
                  {moment(selectedEvent.start).format("MMMM D, YYYY h:mm A")}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {moment(selectedEvent.end).format("MMMM D, YYYY h:mm A")}
                </p>
                <p>
                  <strong>Room ID:</strong> {selectedEvent.roomId}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCalendar;
