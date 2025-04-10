
import React from "react";
import HabitItem from "./HabitItem";
import { useHabits } from "../context/HabitContext";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const HabitList: React.FC = () => {
  const { habits, toggleHabit, resetDailyHabits } = useHabits();

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Today's Habits</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetDailyHabits}
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Reset All
        </Button>
      </div>
      
      <div>
        {habits.map(habit => (
          <HabitItem 
            key={habit.id} 
            habit={habit} 
            onToggle={toggleHabit} 
          />
        ))}
      </div>
    </div>
  );
};

export default HabitList;
