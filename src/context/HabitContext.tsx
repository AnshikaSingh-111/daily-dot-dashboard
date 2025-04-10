
import React, { createContext, useState, useContext, useEffect } from "react";
import { Habit, DailyRecord, initialHabits, sampleHistoryData } from "../data/habitData";
import { format } from "date-fns";
import { toast } from "sonner";

interface HabitContextType {
  habits: Habit[];
  historyData: DailyRecord[];
  todayPoints: number;
  toggleHabit: (id: string) => void;
  resetDailyHabits: () => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : initialHabits;
  });
  
  const [historyData, setHistoryData] = useState<DailyRecord[]>(() => {
    const savedHistory = localStorage.getItem("historyData");
    return savedHistory ? JSON.parse(savedHistory) : sampleHistoryData;
  });

  // Calculate today's points
  const todayPoints = habits
    .filter(habit => habit.completed)
    .reduce((total, habit) => total + habit.points, 0);

  // Save to localStorage whenever habits or history change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("historyData", JSON.stringify(historyData));
  }, [historyData]);

  // Toggle habit completion status
  const toggleHabit = (id: string) => {
    setHabits(prevHabits => {
      const newHabits = prevHabits.map(habit => 
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      );
      
      // Show toast when habit is completed
      const habit = prevHabits.find(h => h.id === id);
      if (habit && !habit.completed) {
        toast.success(`Well done! +${habit.points} points for ${habit.name}`);
      }
      
      return newHabits;
    });
    
    // Update today's record in history
    updateTodayRecord();
  };

  // Update today's record in history data
  const updateTodayRecord = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const completedCount = habits.filter(h => h.completed).length;
    const points = habits.filter(h => h.completed).reduce((sum, h) => sum + h.points, 0);
    
    setHistoryData(prevHistory => {
      // Check if today's record exists
      const todayIndex = prevHistory.findIndex(record => record.date === today);
      
      if (todayIndex >= 0) {
        // Update existing record
        const newHistory = [...prevHistory];
        newHistory[todayIndex] = {
          ...newHistory[todayIndex],
          totalPoints: points,
          completedHabits: completedCount
        };
        return newHistory;
      } else {
        // Add new record for today
        return [
          ...prevHistory,
          {
            date: today,
            totalPoints: points,
            completedHabits: completedCount
          }
        ];
      }
    });
  };

  // Reset all habits for a new day
  const resetDailyHabits = () => {
    setHabits(prevHabits => 
      prevHabits.map(habit => ({ ...habit, completed: false }))
    );
    toast.info("All habits have been reset for a new day!");
  };

  return (
    <HabitContext.Provider value={{ 
      habits, 
      historyData, 
      todayPoints, 
      toggleHabit, 
      resetDailyHabits 
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};
