
import React from "react";
import { HabitProvider } from "../context/HabitContext";
import HabitList from "../components/HabitList";
import PointsSummary from "../components/PointsSummary";
import ProgressChart from "../components/ProgressChart";
import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";

const Index = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <HabitProvider>
      <div className="min-h-screen bg-habit-background">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center bg-habit-purple text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
              <CheckCircle2 size={16} className="mr-1" />
              Daily Habit Tracker
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-1">Track Your Habits</h1>
            <p className="text-gray-600">{today}</p>
          </header>

          <PointsSummary />
          <HabitList />
          <ProgressChart />
        </div>
      </div>
    </HabitProvider>
  );
};

export default Index;
