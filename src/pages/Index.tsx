
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Easy Room Booking",
      description: "Reserve meeting rooms in just a few clicks with our intuitive booking system.",
      icon: <Calendar className="h-8 w-8 text-primary" />,
    },
    {
      title: "AI Room Suggestions",
      description: "Our smart assistant helps you find the perfect room based on your meeting needs.",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
    },
    {
      title: "Team Coordination",
      description: "Manage team schedules and ensure everyone has the right meeting space.",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <AppLayout>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Smart Meeting Room Management
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Simplify your workplace scheduling with our intelligent room booking system.
                Book the perfect space for every meeting.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate("/rooms")}>
                Browse Rooms
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")}>
                View Dashboard
              </Button>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-5xl items-start gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="animate-fade-in">
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-full w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to optimize your meeting spaces?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of companies using our platform to manage their meeting rooms efficiently.
              </p>
            </div>
            <Button size="lg" variant="default">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
