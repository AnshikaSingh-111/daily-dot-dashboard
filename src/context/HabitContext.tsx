
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { Habit, DailyRecord, initialHabits, sampleHistoryData } from "../data/habitData";
import { format } from "date-fns";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface HabitContextType {
  habits: Habit[];
  historyData: DailyRecord[];
  todayPoints: number;
  toggleHabit: (id: string) => void;
  resetDailyHabits: () => void;
  addHabit: (habit: Omit<Habit, "id" | "completed">) => void;
  deleteHabit: (id: string) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  HABITS: "habits",
  HISTORY: "historyData"
};

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const savedHabits = localStorage.getItem(LOCAL_STORAGE_KEYS.HABITS);
      return savedHabits ? JSON.parse(savedHabits) : initialHabits;
    } catch (error) {
      console.error("Error loading habits from localStorage:", error);
      return initialHabits;
    }
  });
  
  const [historyData, setHistoryData] = useState<DailyRecord[]>(() => {
    try {
      const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEYS.HISTORY);
      return savedHistory ? JSON.parse(savedHistory) : sampleHistoryData;
    } catch (error) {
      console.error("Error loading history data from localStorage:", error);
      return sampleHistoryData;
    }
  });

  // Calculate today's points - memoize calculation to improve performance
  const todayPoints = habits
    .filter(habit => habit.completed)
    .reduce((total, habit) => total + habit.points, 0);

  // Save to localStorage whenever habits or history change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.HABITS, JSON.stringify(habits));
    } catch (error) {
      console.error("Error saving habits to localStorage:", error);
    }
  }, [habits]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.HISTORY, JSON.stringify(historyData));
    } catch (error) {
      console.error("Error saving history data to localStorage:", error);
    }
  }, [historyData]);

  // Update today's record in history data
  const updateTodayRecord = useCallback(() => {
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
  }, [habits]);

  // Toggle habit completion status
  const toggleHabit = useCallback((id: string) => {
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
    
    // Use setTimeout to delay the update slightly to improve perceived performance
    setTimeout(() => {
      updateTodayRecord();
    }, 0);
  }, [updateTodayRecord]);

  // Add a new habit
  const addHabit = useCallback((habitData: Omit<Habit, "id" | "completed">) => {
    const newHabit: Habit = {
      ...habitData,
      id: uuidv4(),
      completed: false
    };
    
    setHabits(prevHabits => [...prevHabits, newHabit]);
    toast.success(`New habit "${habitData.name}" added`);
  }, []);

  // Delete a habit
  const deleteHabit = useCallback((id: string) => {
    setHabits(prevHabits => {
      const habitToDelete = prevHabits.find(h => h.id === id);
      const filteredHabits = prevHabits.filter(habit => habit.id !== id);
      
      if (habitToDelete) {
        toast.info(`"${habitToDelete.name}" has been deleted`);
      }
      
      return filteredHabits;
    });
    
    // Update today's record after deleting a habit
    setTimeout(() => {
      updateTodayRecord();
    }, 0);
  }, [updateTodayRecord]);

  // Reset all habits for a new day
  const resetDailyHabits = useCallback(() => {
    setHabits(prevHabits => 
      prevHabits.map(habit => ({ ...habit, completed: false }))
    );
    toast.info("All habits have been reset for a new day!");
  }, []);

  return (
    <HabitContext.Provider value={{ 
      habits, 
      historyData, 
      todayPoints, 
      toggleHabit, 
      resetDailyHabits,
      addHabit,
      deleteHabit
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
