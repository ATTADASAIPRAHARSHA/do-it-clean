import { Button } from '@/components/ui/button';
import { FilterType } from '@/types/Task';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

/**
 * Filter buttons component for switching between task views
 * Shows task counts and highlights active filter
 */
export function TaskFilter({ currentFilter, onFilterChange, taskCounts }: TaskFilterProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex gap-2 bg-card border border-card-border rounded-lg p-1 shadow-task">
      {filters.map(({ key, label, count }) => (
        <Button
          key={key}
          onClick={() => onFilterChange(key)}
          variant={currentFilter === key ? 'default' : 'ghost'}
          className={`
            flex-1 text-sm font-medium transition-smooth relative overflow-hidden
            ${currentFilter === key 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }
          `}
        >
          <span className="relative z-10">{label}</span>
          {count > 0 && (
            <span className={`
              ml-2 px-2 py-0.5 text-xs rounded-full font-semibold
              ${currentFilter === key 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
              }
            `}>
              {count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}