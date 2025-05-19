
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import Chart from "@/components/dashboard/Chart";
import Chatbot from "@/components/chatbot/Chatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChartBar, ChartPie, LayoutDashboard, Users } from "lucide-react";

const Dashboard = () => {
  const roomUsageData = [
    { name: "Mon", Conference: 12, Executive: 6, Open: 8 },
    { name: "Tue", Conference: 15, Executive: 8, Open: 10 },
    { name: "Wed", Conference: 18, Executive: 9, Open: 12 },
    { name: "Thu", Conference: 14, Executive: 7, Open: 9 },
    { name: "Fri", Conference: 10, Executive: 5, Open: 7 },
  ];

  const roomUtilizationData = [
    { name: "Conference Room A", value: 75 },
    { name: "Executive Suite", value: 60 },
    { name: "Open Space", value: 85 },
    { name: "Training Room", value: 50 },
  ];

  const reservationTrendData = [
    { month: "Jan", reservations: 120 },
    { month: "Feb", reservations: 150 },
    { month: "Mar", reservations: 200 },
    { month: "Apr", reservations: 180 },
    { month: "May", reservations: 250 },
  ];

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Rooms"
          value="12"
          icon={<LayoutDashboard className="h-5 w-5" />}
          description="Available meeting spaces"
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Total Reservations"
          value="287"
          icon={<Calendar className="h-5 w-5" />}
          description="This month"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value="96"
          icon={<Users className="h-5 w-5" />}
          description="Using the booking system"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Utilization Rate"
          value="76%"
          icon={<ChartPie className="h-5 w-5" />}
          description="Average room usage"
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Chart
          title="Room Usage (Weekly)"
          data={roomUsageData}
          type="bar"
          dataKey="name"
          categories={["Conference", "Executive", "Open"]}
          colors={["#3b82f6", "#10b981", "#f59e0b"]}
        />
        <Chart
          title="Room Utilization (%)"
          data={roomUtilizationData}
          type="pie"
          dataKey="name"
          categories={["value"]}
          colors={["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7 mb-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Reservation Trends</CardTitle>
            <CardDescription>Monthly booking patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              title=""
              data={reservationTrendData}
              type="area"
              dataKey="month"
              categories={["reservations"]}
              colors={["#3b82f6"]}
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Get room suggestions and booking help</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Chatbot />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
