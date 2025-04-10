
import React from "react";
import { Habit } from "../data/habitData";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, onToggle, onDelete }) => {
  // Dynamically get the appropriate icon from Lucide
  const IconComponent = (Icons as any)[habit.icon] || Icons.Activity;
  
  const colorMap: Record<string, string> = {
    "habit-purple": "bg-habit-purple",
    "habit-blue": "bg-habit-blue",
    "habit-green": "bg-habit-green",
    "habit-orange": "bg-habit-orange",
    "habit-pink": "bg-habit-pink"
  };
  
  const bgColor = colorMap[habit.color] || "bg-habit-purple";

  return (
    <Card className={cn(
      "habit-item flex items-center p-4 mb-3 relative group overflow-hidden",
      habit.completed ? `${bgColor} bg-opacity-20 habit-item-checked` : ""
    )}>
      <div className="mr-3">
        <Checkbox
          checked={habit.completed}
          onCheckedChange={() => onToggle(habit.id)}
          className={cn(
            "h-5 w-5 rounded-full transition-all duration-200",
            habit.completed ? bgColor : "border-gray-300"
          )}
        />
      </div>
      
      <div className="flex-1">
        <h3 className={cn(
          "font-medium text-lg transition-all duration-200",
          habit.completed ? "line-through opacity-70" : ""
        )}>
          {habit.name}
        </h3>
      </div>
      
      <div className="flex items-center">
        <div className={cn(
          "habit-points text-white mr-3",
          bgColor
        )}>
          +{habit.points}
        </div>
        
        <div className={cn(
          "p-2 rounded-full",
          bgColor,
          "bg-opacity-20 text-gray-700"
        )}>
          <IconComponent size={20} className={habit.completed ? "animate-bounce-small" : ""} />
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(habit.id);
          }}
          className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
          aria-label="Delete habit"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </Card>
  );
};

export default HabitItem;
