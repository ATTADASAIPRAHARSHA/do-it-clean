import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

/**
 * Input component for adding new tasks
 * Features: Enter key support, automatic focus clearing, smooth animations
 */
export function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    
    if (trimmedText) {
      onAddTask(trimmedText);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-task-bg border-card-border text-foreground placeholder:text-muted-foreground 
                   focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth
                   text-base py-3 px-4 rounded-lg shadow-task"
          autoFocus
        />
        <Button
          type="submit"
          disabled={!text.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 
                   rounded-lg shadow-task transition-smooth disabled:opacity-50 
                   disabled:cursor-not-allowed hover:shadow-card"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}