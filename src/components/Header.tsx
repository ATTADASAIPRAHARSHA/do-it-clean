import { CheckSquare, Sparkles } from 'lucide-react';

/**
 * Application header component
 * Features beautiful gradient text and modern design
 */
export function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="relative">
          <CheckSquare className="w-8 h-8 text-primary" />
          <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          My To-Do List
        </h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Stay organized and productive with your personal task manager
      </p>
    </header>
  );
}