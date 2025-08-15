import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Check } from 'lucide-react';
import { Task } from '@/types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Individual task item component
 * Features: Smooth animations, hover effects, completion animations
 */
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Small delay for animation before actual deletion
    setTimeout(() => {
      onDelete(task.id);
    }, 200);
  };

  const handleToggle = () => {
    onToggle(task.id);
  };

  return (
    <div 
      className={`
        group flex items-center gap-4 p-4 bg-task-bg border border-card-border 
        rounded-lg shadow-task hover:shadow-card transition-smooth
        ${isDeleting ? 'animate-[slideOut_0.2s_ease-in]' : 'task-enter'}
        ${task.completed ? 'bg-task-completed-bg border-task-completed/20' : 'hover:bg-task-hover'}
      `}
    >
      {/* Custom Checkbox */}
      <div className="relative">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggle}
          className={`
            w-5 h-5 border-2 transition-smooth
            ${task.completed 
              ? 'border-task-completed bg-task-completed' 
              : 'border-muted-foreground hover:border-primary'
            }
          `}
        />
        {task.completed && (
          <Check className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        )}
      </div>

      {/* Task Text */}
      <span 
        className={`
          flex-1 text-base transition-smooth
          ${task.completed 
            ? 'text-muted-foreground line-through' 
            : 'text-foreground'
          }
        `}
      >
        {task.text}
      </span>

      {/* Task Creation Time */}
      <span className="text-xs text-muted-foreground hidden sm:block">
        {new Date(task.createdAt).toLocaleDateString()}
      </span>

      {/* Delete Button */}
      <Button
        onClick={handleDelete}
        variant="ghost"
        size="sm"
        className="
          opacity-0 group-hover:opacity-100 transition-smooth p-2
          text-muted-foreground hover:text-destructive hover:bg-destructive/10
        "
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}