'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { NavigationProps } from '@/types/navigation';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MosqueLogo from '../mosque-logo';

export default function MobileNavbar({
  allLinks = [],
  logoConfig = {
    width: 40,
    height: 40,
    showText: true,
    text: 'Masjid Agung Sungailiat',
  },
}: NavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 flex w-full items-center justify-between border-b p-4 shadow-sm backdrop-blur md:hidden">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
        aria-label="Kembali ke beranda Masjid Agung Sungailiat"
      >
        <MosqueLogo
          width={logoConfig.width || 40}
          height={logoConfig.height || 40}
          className="transition-transform duration-200"
          priority
        />
        {logoConfig.showText && (
          <span className="text-primary text-base font-bold">
            {logoConfig.text}
          </span>
        )}
      </Link>

      {/* Mobile Menu Drawer */}
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Buka menu navigasi"
            className={cn(
              'group border-primary/60 bg-background/70 relative h-10 w-10 rounded-2xl border',
              'hover:bg-primary/10 hover:border-primary/40 transition-colors duration-200 ease-out',
              'dark:border-accent dark:hover:border-primary/60 dark:hover:bg-primary/10',
              'ring-ring/10 shadow-sm ring-1 backdrop-blur-md'
            )}
          >
            <Menu className="text-primary group-hover:text-primary/80 dark:text-accent dark:group-hover:text-primary h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="fixed inset-y-0 right-0 mt-0 w-80 rounded-l-lg border-l">
          <div className="flex h-full flex-col">
            <DrawerHeader className="bg-muted/20 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <DrawerTitle className="text-left text-lg font-semibold">
                    Menu Navigasi
                  </DrawerTitle>
                  <DrawerDescription className="text-left text-sm">
                    Jelajahi halaman-halaman kami
                  </DrawerDescription>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <ScrollArea className="flex-1 px-4 py-4">
              <nav className="flex flex-col gap-1" role="navigation">
                {allLinks.map((link, index) => {
                  const isLinkActive = isActive(link.href);

                  return (
                    <div key={link.href}>
                      <Button
                        asChild
                        variant="ghost"
                        className={cn(
                          'hover:bg-primary/5 hover:text-primary w-full justify-start gap-3 py-3 text-left transition-all duration-200',
                          isLinkActive &&
                            'bg-primary/10 text-primary border-primary border-r-2 font-medium'
                        )}
                        onClick={handleLinkClick}
                      >
                        <Link
                          href={link.href}
                          className="flex items-center gap-3"
                        >
                          {link.icon && (
                            <link.icon
                              className={cn(
                                'h-5 w-5 flex-shrink-0 transition-colors',
                                isLinkActive
                                  ? 'text-primary'
                                  : 'text-muted-foreground'
                              )}
                            />
                          )}
                          <div className="flex-1">
                            <div className="font-medium">{link.label}</div>
                            {link.description && (
                              <div className="text-muted-foreground mt-0.5 text-xs">
                                {link.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      </Button>
                      {index < allLinks.length - 1 && (
                        <Separator className="my-1" />
                      )}
                    </div>
                  );
                })}
              </nav>
            </ScrollArea>

            <DrawerFooter className="bg-muted/20 border-t p-4">
              <div className="text-muted-foreground text-center text-xs">
                © 2024 Masjid Agung Sungailiat
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
