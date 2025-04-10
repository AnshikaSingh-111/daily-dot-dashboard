
import React from "react";
import { useHabits } from "../context/HabitContext";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, CheckCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const PointsSummary: React.FC = () => {
  const { habits, todayPoints, historyData } = useHabits();
  
  // Calculate completion percentage
  const completedCount = habits.filter(h => h.completed).length;
  const completionPercentage = habits.length > 0 
    ? Math.round((completedCount / habits.length) * 100) 
    : 0;
  
  // Get yesterday's points
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayRecord = historyData.find(record => 
    new Date(record.date).toDateString() === yesterday.toDateString()
  );
  
  // Calculate total points from history
  const totalPoints = historyData.reduce((sum, day) => sum + day.totalPoints, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-habit-purple bg-opacity-10 border-habit-purple border-opacity-30">
        <CardContent className="p-6 flex items-center">
          <div className="mr-4 p-3 bg-habit-purple bg-opacity-20 rounded-full">
            <Trophy className="h-6 w-6 text-habit-purple" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Today's Points</p>
            <p className="text-3xl font-bold text-habit-purple">{todayPoints}</p>
            {yesterdayRecord && (
              <p className="text-xs text-gray-500 mt-1">
                Yesterday: {yesterdayRecord.totalPoints} pts
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-habit-green bg-opacity-10 border-habit-green border-opacity-30">
        <CardContent className="p-6 flex items-center">
          <div className="mr-4 p-3 bg-habit-green bg-opacity-20 rounded-full">
            <CheckCircle className="h-6 w-6 text-habit-green" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Completion Rate</p>
            <p className="text-3xl font-bold text-habit-green">{completionPercentage}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {completedCount} of {habits.length} completed
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-habit-blue bg-opacity-10 border-habit-blue border-opacity-30">
        <CardContent className="p-6 flex items-center">
          <div className="mr-4 p-3 bg-habit-blue bg-opacity-20 rounded-full">
            <Calendar className="h-6 w-6 text-habit-blue" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Total Points</p>
            <p className="text-3xl font-bold text-habit-blue">{totalPoints}</p>
            <p className="text-xs text-gray-500 mt-1">
              {historyData.length} day streak
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PointsSummary;
