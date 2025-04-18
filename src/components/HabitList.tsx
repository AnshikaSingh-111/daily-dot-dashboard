
import React, { memo } from "react";
import HabitItem from "./HabitItem";
import { useHabits } from "../context/HabitContext";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import AddHabitForm from "./AddHabitForm";

const HabitList: React.FC = () => {
  const { habits, toggleHabit, resetDailyHabits, deleteHabit } = useHabits();

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
      
      <div className="mb-4">
        {habits.map(habit => (
          <MemoizedHabitItem 
            key={habit.id} 
            habit={habit} 
            onToggle={toggleHabit}
            onDelete={deleteHabit}
          />
        ))}
      </div>
      
      <AddHabitForm />
    </div>
  );
};

// Memoize the HabitItem to prevent unnecessary re-renders
const MemoizedHabitItem = memo(HabitItem);

export default HabitList;
