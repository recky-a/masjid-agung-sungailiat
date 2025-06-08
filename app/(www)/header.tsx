import { cn } from '@/lib/utils';
import Navbar from './navbar';
import Topbar from './topbar';

interface HeaderProps {
  className?: string;
  sticky?: boolean;
}

export default function Header({ className, sticky = true }: HeaderProps) {
  return (
    <header
      className={cn(
        'relative z-50 w-full',
        sticky && 'sticky top-0',
        className
      )}
      role="banner"
    >
      <Topbar />
      <Navbar />
    </header>
  );
}
