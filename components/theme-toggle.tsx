'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch on SSR
  useEffect(() => setMounted(true), []);

  // Pre-rendering a fixed size button to avoid layout shift
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Ganti tema"
          title={
            mounted ? `Tema sekarang: ${resolvedTheme || theme}` : 'Ganti tema'
          }
          className="relative size-10"
        >
          {mounted ? (
            <>
              {/* Only show the appropriate icon when mounted */}
              {resolvedTheme === 'dark' && <Moon className="size-5" />}
              {resolvedTheme === 'light' && <Sun className="size-5" />}
              {resolvedTheme !== 'dark' && resolvedTheme !== 'light' && (
                <Laptop className="size-5" />
              )}
            </>
          ) : (
            // Use a transparent placeholder with the same dimensions to reserve space
            <div className="size-5" aria-hidden="true" />
          )}
          <span className="sr-only">Ganti tema</span>
        </Button>
      </DropdownMenuTrigger>
      {mounted && (
        <DropdownMenuContent align="end" sideOffset={4}>
          <DropdownMenuItem
            onClick={() => setTheme('light')}
            aria-label="Ganti ke tema terang"
          >
            <Sun className="mr-2 size-4" />
            <span>Terang</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            aria-label="Ganti ke tema gelap"
          >
            <Moon className="mr-2 size-4" />
            <span>Gelap</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('system')}
            aria-label="Gunakan tema sistem"
          >
            <Laptop className="mr-2 size-4" />
            <span>Sistem</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
