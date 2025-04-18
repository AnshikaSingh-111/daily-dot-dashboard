
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
    icon: "Yoga",
    points: 10,
    color: "habit-purple",
    completed: false
  },
  {
    id: "2",
    name: "Waking up early",
    icon: "Sunrise",
    points: 15,
    color: "habit-orange",
    completed: false
  },
  {
    id: "3",
    name: "Reading book",
    icon: "BookOpen",
    points: 20,
    color: "habit-blue",
    completed: false
  },
  {
    id: "4",
    name: "Drink 5L of water",
    icon: "Droplets",
    points: 10,
    color: "habit-blue",
    completed: false
  },
  {
    id: "5",
    name: "Meditation",
    icon: "Brain",
    points: 15,
    color: "habit-purple",
    completed: false
  },
  {
    id: "6",
    name: "Exercise",
    icon: "Dumbbell",
    points: 20,
    color: "habit-green",
    completed: false
  }
];

// Empty history data for the chart - the user will build their own data
export const sampleHistoryData: DailyRecord[] = [];
