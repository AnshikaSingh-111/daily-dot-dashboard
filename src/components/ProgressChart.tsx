
import React, { useMemo } from "react";
import { useHabits } from "../context/HabitContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const ProgressChart: React.FC = () => {
  const { historyData } = useHabits();
  
  // Use useMemo to avoid recalculating on every render
  const chartData = useMemo(() => {
    return [...historyData]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7)
      .map(item => ({
        ...item,
        date: format(parseISO(item.date), "MMM dd")
      }));
  }, [historyData]);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-bold">{label}</p>
          <p className="text-habit-purple">Points: {payload[0].value}</p>
          <p className="text-habit-blue">Habits: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  // Show loading state if no data
  if (!chartData.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Habit Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Habit Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="totalPoints" 
                name="Points" 
                fill="#9b87f5" 
                radius={[4, 4, 0, 0]} 
                barSize={20} 
              />
              <Bar 
                dataKey="completedHabits" 
                name="Completed Habits" 
                fill="#0EA5E9" 
                radius={[4, 4, 0, 0]} 
                barSize={20} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
