// Task interface for type safety throughout the application
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Filter options for task display
export type FilterType = 'all' | 'pending' | 'completed';