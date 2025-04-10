
export interface Habit {
  id: string;
  name: string;
  icon: string;
  points: number;
  color: string;
  completed: boolean;
}

export interface DailyRecord {
  date: string;
  totalPoints: number;
  completedHabits: number;
}

// Sample habits
export const initialHabits: Habit[] = [
  {
    id: "1",
    name: "Morning Yoga",
    icon: "yoga",
    points: 10,
    color: "habit-purple",
    completed: false
  },
  {
    id: "2",
    name: "Waking up early",
    icon: "sunrise",
    points: 15,
    color: "habit-orange",
    completed: false
  },
  {
    id: "3",
    name: "Reading book",
    icon: "book-open",
    points: 20,
    color: "habit-blue",
    completed: false
  },
  {
    id: "4",
    name: "Drink 5L of water",
    icon: "droplets",
    points: 10,
    color: "habit-blue",
    completed: false
  },
  {
    id: "5",
    name: "Meditation",
    icon: "brain",
    points: 15,
    color: "habit-purple",
    completed: false
  },
  {
    id: "6",
    name: "Exercise",
    icon: "dumbbell",
    points: 20,
    color: "habit-green",
    completed: false
  }
];

// Sample history data for the chart
export const sampleHistoryData: DailyRecord[] = [
  { date: "2025-04-04", totalPoints: 45, completedHabits: 3 },
  { date: "2025-04-05", totalPoints: 60, completedHabits: 4 },
  { date: "2025-04-06", totalPoints: 30, completedHabits: 2 },
  { date: "2025-04-07", totalPoints: 75, completedHabits: 5 },
  { date: "2025-04-08", totalPoints: 50, completedHabits: 3 },
  { date: "2025-04-09", totalPoints: 65, completedHabits: 4 },
  { date: "2025-04-10", totalPoints: 0, completedHabits: 0 }
];
