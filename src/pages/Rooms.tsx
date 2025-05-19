
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import RoomCard from "@/components/rooms/RoomCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState([4]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Sample room data
  const rooms = [
    {
      id: 1,
      name: "Conference Room A",
      capacity: 12,
      features: ["Projector", "Whiteboard", "Video Conferencing"],
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
      isAvailable: true,
    },
    {
      id: 2,
      name: "Executive Suite",
      capacity: 8,
      features: ["TV Screen", "Whiteboard", "Video Conferencing", "Catering"],
      image: "https://images.unsplash.com/photo-1604328471151-b52466bbf2f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
      isAvailable: false,
      nextAvailable: "Tomorrow, 10:00 AM",
    },
    {
      id: 3,
      name: "Meeting Room B",
      capacity: 6,
      features: ["Whiteboard", "Video Conferencing"],
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
      isAvailable: true,
    },
    {
      id: 4,
      name: "Brainstorm Space",
      capacity: 4,
      features: ["Whiteboard", "Standing Desks"],
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
      isAvailable: true,
    },
    {
      id: 5,
      name: "Training Room",
      capacity: 20,
      features: ["Projector", "Whiteboard", "Video Conferencing", "Microphones"],
      image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
      isAvailable: false,
      nextAvailable: "Friday, 2:00 PM",
    },
    {
      id: 6,
      name: "Open Space",
      capacity: 15,
      features: ["TV Screen", "Standing Desks", "Video Conferencing"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
      isAvailable: true,
    },
  ];

  const allFeatures = Array.from(new Set(rooms.flatMap(room => room.features)));

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  // Filter rooms based on search term, capacity and availability
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCapacity = room.capacity >= capacityFilter[0];
    const matchesAvailability = showOnlyAvailable ? room.isAvailable : true;
    const matchesFeatures = selectedFeatures.length === 0 || 
      selectedFeatures.every(feature => room.features.includes(feature));
    
    return matchesSearch && matchesCapacity && matchesAvailability && matchesFeatures;
  });

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meeting Rooms</h1>
          <p className="text-muted-foreground">Find and book the perfect space for your meetings</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="capacity">Capacity</SelectItem>
              <SelectItem value="availability">Availability</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg border p-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                <Button variant="ghost" size="sm" onClick={() => {
                  setCapacityFilter([4]);
                  setShowOnlyAvailable(false);
                  setSelectedFeatures([]);
                }}>
                  Reset
                </Button>
              </div>
              <div className="h-px bg-border my-3" />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Min. Capacity: {capacityFilter[0]} people</h4>
              <Slider
                defaultValue={[4]}
                max={20}
                min={1}
                step={1}
                value={capacityFilter}
                onValueChange={setCapacityFilter}
              />
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Switch 
                  id="available-only" 
                  checked={showOnlyAvailable}
                  onCheckedChange={setShowOnlyAvailable}
                />
                <Label htmlFor="available-only">Available rooms only</Label>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Features</h4>
              <div className="flex flex-wrap gap-2">
                {allFeatures.map((feature) => (
                  <Badge
                    key={feature}
                    variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFeature(feature)}
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {filteredRooms.length === 0 ? (
            <div className="w-full h-64 flex items-center justify-center text-muted-foreground border border-dashed rounded-lg">
              No rooms match your current filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} {...room} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Rooms;
