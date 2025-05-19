
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import RoomCalendar from "@/components/calendar/RoomCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User, Users, Check, X } from "lucide-react";
import { format } from "date-fns";

const Reservations = () => {
  // Sample reservations data
  const reservations = [
    {
      id: 1,
      title: "Marketing Team Meeting",
      roomName: "Conference Room A",
      date: new Date(2025, 4, 20),
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      attendees: 8,
      status: "confirmed",
      organizer: "John Smith",
    },
    {
      id: 2,
      title: "Product Review",
      roomName: "Executive Suite",
      date: new Date(2025, 4, 21),
      startTime: "2:00 PM",
      endTime: "3:30 PM",
      attendees: 5,
      status: "confirmed",
      organizer: "Emily Johnson",
    },
    {
      id: 3,
      title: "Client Call",
      roomName: "Meeting Room B",
      date: new Date(2025, 4, 22),
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      attendees: 3,
      status: "confirmed",
      organizer: "Michael Brown",
    },
    {
      id: 4,
      title: "Team Brainstorming",
      roomName: "Brainstorm Space",
      date: new Date(2025, 4, 24),
      startTime: "1:00 PM",
      endTime: "3:00 PM",
      attendees: 4,
      status: "pending",
      organizer: "Sarah Davis",
    },
  ];

  const renderReservationCard = (reservation: any) => (
    <Card key={reservation.id} className="mb-4 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{reservation.title}</CardTitle>
          <Badge
            variant={reservation.status === "confirmed" ? "default" : "outline"}
            className={reservation.status === "confirmed" ? "bg-green-500" : ""}
          >
            {reservation.status === "confirmed" ? "Confirmed" : "Pending"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 mr-2" />
            {format(reservation.date, "MMMM d, yyyy")}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {reservation.startTime} - {reservation.endTime}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            {reservation.attendees} attendees
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2" />
            {reservation.organizer}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="font-medium">{reservation.roomName}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Reservations</h1>
        <Button>
          New Reservation
        </Button>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList className="mb-6">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="my-reservations">My Reservations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-0">
          <RoomCalendar />
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Reservations</CardTitle>
                <div className="flex gap-2">
                  <Badge className="bg-green-500 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Confirmed
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <X className="h-3 w-3" /> Pending
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {reservations.map(renderReservationCard)}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-reservations" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>My Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              {reservations
                .filter(r => r.organizer === "John Smith")
                .map(renderReservationCard)}
              
              {reservations.filter(r => r.organizer === "John Smith").length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  You don't have any reservations yet.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Reservations;
