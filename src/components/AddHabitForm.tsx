
import React, { useState } from "react";
import { useHabits } from "../context/HabitContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import * as LucideIcons from "lucide-react";

const iconOptions = [
  "Activity", "Book", "BookOpen", "Brain", "Calendar", "Coffee", 
  "Dumbbell", "Droplets", "Heart", "HeartPulse", "Music", 
  "PenTool", "Smile", "Sun", "Sunrise", "Yoga"
];

const colorOptions = [
  { value: "habit-purple", label: "Purple" },
  { value: "habit-blue", label: "Blue" },
  { value: "habit-green", label: "Green" },
  { value: "habit-orange", label: "Orange" },
  { value: "habit-pink", label: "Pink" }
];

const AddHabitForm = () => {
  const { addHabit } = useHabits();
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitIcon, setHabitIcon] = useState("Activity");
  const [habitPoints, setHabitPoints] = useState(10);
  const [habitColor, setHabitColor] = useState("habit-purple");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (habitName.trim() === "") return;
    
    addHabit({
      name: habitName,
      icon: habitIcon,
      points: habitPoints,
      color: habitColor
    });
    
    // Reset form
    setHabitName("");
    setHabitIcon("Activity");
    setHabitPoints(10);
    setHabitColor("habit-purple");
    setOpen(false);
  };

  // Function to render icon component
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={16} /> : null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <Plus size={16} className="mr-2" />
          Add New Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              placeholder="e.g., Morning Meditation"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select value={habitIcon} onValueChange={setHabitIcon}>
                <SelectTrigger id="icon">
                  <SelectValue placeholder="Select Icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      <div className="flex items-center gap-2">
                        {renderIcon(icon)}
                        <span>{icon}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select value={habitColor} onValueChange={setHabitColor}>
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select Color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${color.value}`} />
                        <span>{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="points">Points (1-50)</Label>
            <Input
              id="points"
              type="number"
              min="1"
              max="50"
              value={habitPoints}
              onChange={(e) => setHabitPoints(Number(e.target.value))}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit">Create Habit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitForm;
