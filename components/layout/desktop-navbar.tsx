'use client';

import { Button } from '@/components/ui/button';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import type { NavigationProps, NavLink } from '@/types/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import MosqueLogo from '../mosque-logo';

const ListItem = forwardRef<
  React.ComponentRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string;
    description?: string;
  }
>(({ className, title, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          {description && (
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {description}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default function DesktopNavbar({
  leftLinks = [],
  rightLinks = [],
  logoConfig = {
    width: 50,
    height: 50,
    showText: true,
    text: 'Masjid Agung Sungailiat',
  },
}: NavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const renderNavLink = (link: NavLink) => {
    const isLinkActive = isActive(link.href);

    return (
      <Button
        key={link.href}
        asChild
        variant="ghost"
        className={cn(
          'hover:bg-accent/50 hover:text-accent-foreground relative h-auto px-3 py-2 text-sm font-medium transition-all duration-200',
          isLinkActive && 'bg-accent text-accent-foreground'
        )}
      >
        <Link href={link.href} className="flex items-center gap-2">
          {link.icon && <link.icon className="h-4 w-4" />}
          {link.label}
          {isLinkActive && (
            <span className="bg-primary absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full" />
          )}
        </Link>
      </Button>
    );
  };

  return (
    <nav
      className="bg-background/95 supports-[backdrop-filter]:bg-background/60 hidden w-full items-center justify-between border-b px-6 py-4 shadow-sm backdrop-blur md:flex"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Left Navigation */}
      <div className="flex items-center gap-2">
        {leftLinks.map(renderNavLink)}
      </div>

      {/* Center Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 transform">
        <Link
          href="/"
          className="flex items-center gap-3 transition-all duration-200 hover:scale-105"
          aria-label="Kembali ke beranda Masjid Agung Sungailiat"
        >
          <MosqueLogo
            width={logoConfig.width || 50}
            height={logoConfig.height || 50}
            className="transition-transform duration-200"
            priority
          />
          {logoConfig.showText && (
            <span className="text-primary hidden text-lg font-bold lg:inline-block">
              {logoConfig.text}
            </span>
          )}
        </Link>
      </div>

      {/* Right Navigation */}
      <div className="flex items-center gap-2">
        {rightLinks.map(renderNavLink)}
      </div>
    </nav>
  );
}
