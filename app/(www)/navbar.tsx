'use client';

import DesktopNavbar from '@/components/layout/desktop-navbar';
import MobileNavbar from '@/components/layout/mobile-navbar';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { LogoConfig, NavLink } from '@/types/navigation';
import {
  BookOpen,
  Calendar,
  Home,
  ImageIcon,
  Info,
  Newspaper,
  Phone,
} from 'lucide-react';

// Centralized navigation configuration
const navigationConfig = {
  leftLinks: [
    {
      href: '/berita',
      label: 'Berita',
      icon: Newspaper,
      description: 'Berita terkini seputar masjid',
    },
    {
      href: '/kegiatan',
      label: 'Kegiatan',
      icon: Calendar,
      description: 'Jadwal kegiatan dan acara',
    },
    {
      href: '/artikel',
      label: 'Artikel',
      icon: BookOpen,
      description: 'Artikel dan kajian islami',
    },
  ] as NavLink[],

  rightLinks: [
    {
      href: '/tentang',
      label: 'Tentang Kami',
      icon: Info,
      description: 'Sejarah dan profil masjid',
    },
    {
      href: '/galeri',
      label: 'Galeri',
      icon: ImageIcon,
      description: 'Dokumentasi kegiatan',
    },
    {
      href: '/kontak',
      label: 'Kontak',
      icon: Phone,
      description: 'Hubungi kami',
    },
  ] as NavLink[],
};

// Combine all links for mobile
const allLinks: NavLink[] = [
  {
    href: '/',
    label: 'Beranda',
    icon: Home,
    description: 'Halaman utama',
  },
  ...navigationConfig.leftLinks,
  ...navigationConfig.rightLinks,
];

export default function Navbar() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const logoConfig: LogoConfig = {
    width: isDesktop ? 50 : 40,
    height: isDesktop ? 50 : 40,
    showText: true,
    text: 'Masjid Agung Sungailiat',
  };

  if (isDesktop) {
    return (
      <DesktopNavbar
        leftLinks={navigationConfig.leftLinks}
        rightLinks={navigationConfig.rightLinks}
        logoConfig={logoConfig}
      />
    );
  }

  return <MobileNavbar allLinks={allLinks} logoConfig={logoConfig} />;
}
