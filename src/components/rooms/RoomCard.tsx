
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";

interface RoomProps {
  id: number;
  name: string;
  capacity: number;
  features: string[];
  image: string;
  isAvailable: boolean;
  nextAvailable?: string;
}

const RoomCard: React.FC<RoomProps> = ({
  id,
  name,
  capacity,
  features,
  image,
  isAvailable,
  nextAvailable,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md animate-fade-in">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={`Room ${name}`}
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
        />
        <Badge 
          className={`absolute top-2 right-2 ${
            isAvailable ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isAvailable ? "Available" : "Booked"}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{capacity}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-3">
          {features.map((feature, index) => (
            <Badge key={index} variant="outline" className="bg-secondary">
              {feature}
            </Badge>
          ))}
        </div>
        
        {!isAvailable && nextAvailable && (
          <div className="text-sm flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Next available: {nextAvailable}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          className="w-full" 
          variant={isAvailable ? "default" : "outline"}
          disabled={!isAvailable}
        >
          {isAvailable ? "Book Now" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
