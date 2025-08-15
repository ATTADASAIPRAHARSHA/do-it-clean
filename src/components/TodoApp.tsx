import { useMemo } from 'react';
import { Header } from './Header';
import { TaskInput } from './TaskInput';
import { TaskFilter } from './TaskFilter';
import { TaskList } from './TaskList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Task, FilterType } from '@/types/Task';

/**
 * Main To-Do application component
 * Manages all task state and localStorage persistence
 */
export function TodoApp() {
  // Persistent task storage using localStorage
  const [tasks, setTasks] = useLocalStorage<Task[]>('todoTasks', []);
  const [filter, setFilter] = useLocalStorage<FilterType>('todoFilter', 'all');

  // Generate unique ID for new tasks
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Task operations
  const addTask = (text: string) => {
    const newTask: Task = {
      id: generateId(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Calculate task counts for filter badges
  const taskCounts = useMemo(() => {
    const pending = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;
    
    return {
      all: tasks.length,
      pending,
      completed,
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Header />
        
        {/* Task Input Section */}
        <div className="mb-6">
          <TaskInput onAddTask={addTask} />
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
        </div>

        {/* Task List Section */}
        <div className="bg-card border border-card-border rounded-lg p-6 shadow-card">
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </div>

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {taskCounts.completed} of {taskCounts.all} tasks completed
            {taskCounts.completed === taskCounts.all && taskCounts.all > 0 && (
              <span className="ml-2 text-success">🎉 All done!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}