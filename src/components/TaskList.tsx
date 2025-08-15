import { TaskItem } from './TaskItem';
import { Task, FilterType } from '@/types/Task';
import { CheckCircle2, Clock, List } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  filter: FilterType;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

/**
 * Task list container component
 * Handles filtering and displays appropriate empty states
 */
export function TaskList({ tasks, filter, onToggleTask, onDeleteTask }: TaskListProps) {
  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  // Empty state configuration
  const getEmptyState = () => {
    switch (filter) {
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-12 h-12 text-muted-foreground/50" />,
          title: 'No completed tasks',
          subtitle: 'Complete some tasks to see them here'
        };
      case 'pending':
        return {
          icon: <Clock className="w-12 h-12 text-muted-foreground/50" />,
          title: 'No pending tasks',
          subtitle: 'Great job! All tasks are completed'
        };
      default:
        return {
          icon: <List className="w-12 h-12 text-muted-foreground/50" />,
          title: 'No tasks yet',
          subtitle: 'Add your first task to get started'
        };
    }
  };

  if (filteredTasks.length === 0) {
    const emptyState = getEmptyState();
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {emptyState.icon}
        <h3 className="mt-4 text-lg font-medium text-foreground">
          {emptyState.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {emptyState.subtitle}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 custom-scrollbar max-h-[60vh] overflow-y-auto">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}