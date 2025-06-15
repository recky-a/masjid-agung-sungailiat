// the component
import { BrandIcon } from '@/components/brand-icon';
import MosqueLogo from '@/components/mosque-logo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { NavLink } from '@/types/navigation';
import {
  BookOpen,
  Calendar,
  ExternalLink,
  Home,
  ImageIcon,
  Info,
  Newspaper,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import {
  siFacebook as Facebook,
  siInstagram as Instagram,
  siYoutube as Youtube,
} from 'simple-icons';

const socialLinks = [
  {
    href: 'https://facebook.com/masjidagundsungailiat',
    icon: Facebook,
    label: 'Facebook Masjid Agung Sungailiat',
  },
  {
    href: 'https://instagram.com/masjidagundsungailiat',
    icon: Instagram,
    label: 'Instagram Masjid Agung Sungailiat',
  },
  {
    href: 'https://youtube.com/@masjidagundsungailiat',
    icon: Youtube,
    label: 'Youtube Masjid Agung Sungailiat',
  },
];

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

const externalLinks = [
  {
    href: 'https://kemenag.go.id',
    label: 'Kementerian Agama RI',
  },
  {
    href: 'https://mui.or.id',
    label: 'Majelis Ulama Indonesia',
  },
  {
    href: 'https://dmibangka.org',
    label: 'DMI Bangka',
  },
  {
    href: 'https://bangka.go.id',
    label: 'Pemkab Bangka',
  },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Footer Masjid Agung Sungailiat"
      className="bg-muted/25 dark:bg-card text-foreground grid w-full grid-cols-1 gap-x-8 gap-y-12 p-8 sm:p-12 md:grid-cols-2 md:p-16 lg:grid-cols-3"
    >
      <header className="flex flex-col gap-4 lg:col-span-1">
        <div className="flex items-center gap-4">
          <MosqueLogo width={60} height={60} priority />
          <h2 className="text-primary text-lg font-bold md:text-xl">
            Masjid Agung Sungailiat
          </h2>
        </div>

        <p className="text-muted-foreground text-sm text-pretty md:text-base lg:text-lg xl:text-xl">
          Pusat kegiatan keagamaan dan pembinaan umat Islam di Sungailiat,
          Kepulauan Bangka Belitung. Melayani masyarakat dengan penuh dedikasi
          dan mengembangkan nilai-nilai Islam yang rahmatan lil alamin.
        </p>
      </header>

      <address className="flex flex-col gap-3 not-italic md:justify-self-center lg:justify-self-start">
        <h3 className="text-primary flex items-center gap-2 text-lg font-semibold md:text-xl xl:text-2xl">
          <Phone className="size-4" />
          Kontak
        </h3>

        <p className="text-muted-foreground flex flex-col text-base md:text-lg xl:text-xl">
          <strong>Email:</strong>
          <a
            className="text-muted-foreground hover:text-primary inline-block transition-colors hover:underline"
            href="mailto:masjidagung@gmail.com"
          >
            masjidagung@gmail.com
          </a>
        </p>
        <p className="text-muted-foreground flex flex-col text-base md:text-lg xl:text-xl">
          <strong>Telepon:</strong>
          <a
            className="text-muted-foreground hover:text-primary inline-block transition-colors hover:underline"
            href="tel:+62717938333"
          >
            +62 717 938333
          </a>
        </p>
        <p className="text-muted-foreground flex flex-col text-base md:text-lg xl:text-xl">
          <strong>Alamat:</strong>
          <span className="max-w-xs">
            Jl. A. Yani, Parit Padang Sungai Liat, Kabupaten Bangka Kepulauan
            Bangka Belitung 33215
          </span>
        </p>
      </address>

      <article className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
        <h3 className="text-primary flex items-center gap-2 text-lg font-semibold md:text-xl xl:text-2xl">
          <Calendar className="size-4" />
          Jam Operasional
        </h3>
        <dl className="text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-2 text-base md:text-lg xl:text-xl">
          <dt>Senin - Kamis</dt>
          <dd className="justify-self-end font-mono tracking-tighter">
            <time dateTime="04:30">04:30</time> -{' '}
            <time dateTime="21:30">21:30</time>
          </dd>

          <dt>Jumat</dt>
          <dd className="justify-self-end font-mono tracking-tighter">
            <time dateTime="04:30">04:30</time> -{' '}
            <time dateTime="22:00">22:00</time>
          </dd>

          <dt>Sabtu - Minggu</dt>
          <dd className="justify-self-end font-mono tracking-tighter">
            <time dateTime="04:30">04:30</time> -{' '}
            <time dateTime="21:30">21:30</time>
          </dd>

          <dt>Bulan Ramadan</dt>
          <dd className="justify-self-end font-mono tracking-tighter">
            Buka 24 jam
          </dd>
        </dl>
        <p className="mt-2">
          <small className="text-muted-foreground/70 text-xs italic sm:text-sm md:text-base">
            Jam operasional dapat berubah mengikuti pengumuman takmir
          </small>
        </p>
      </article>

      {/* Navigation Grid */}
      <nav
        aria-label="Footer navigation"
        className="border-border/50 col-span-full grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12"
      >
        {/* Social Media */}
        <div className="space-y-3">
          <h4 className="text-primary text-lg font-semibold md:text-xl xl:text-2xl">
            Media Sosial
          </h4>
          <ul className="flex flex-col gap-1.5">
            {socialLinks.map((social, index) => (
              <li key={index}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors md:text-base xl:text-lg"
                  aria-label={social.label}
                >
                  <BrandIcon
                    icon={social.icon}
                    className="size-4 flex-shrink-0"
                  />
                  <span className="group-hover:underline">
                    {social.label.replace('Masjid Agung Sungailiat', '').trim()}
                  </span>
                  <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-primary text-lg font-semibold md:text-xl xl:text-2xl">
            Navigasi
          </h4>
          <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
            {allLinks.slice(0, 4).map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="group text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors md:text-base xl:text-lg"
                >
                  {link.icon && <link.icon className="size-4 flex-shrink-0" />}
                  <span className="group-hover:underline">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* External Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-primary text-lg font-semibold md:text-xl xl:text-2xl">
            Link Terkait
          </h4>
          <ul className="flex flex-col gap-1.5">
            {externalLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors md:text-base xl:text-lg"
                >
                  <span className="group-hover:underline">{link.label}</span>
                  <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Google Maps */}
      <div className="border-border/50 col-span-full mt-8 border-t pt-8">
        <h4 className="text-foreground mb-4 text-lg font-semibold md:text-xl">
          Lokasi Masjid
        </h4>
        <div className="border-border overflow-hidden rounded-xl border shadow-lg dark:shadow-black/20">
          <AspectRatio ratio={16 / 9}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12354.696837345598!2d106.1021040623769!3d-1.8809640929039693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e22f24c55263de3%3A0x9dd9a567c6d0731c!2sMasjid%20Agung%20Sungai%20Liat!5e0!3m2!1sen!2sid!4v1749902630167!5m2!1sen!2sid"
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
              title="Lokasi Masjid Agung Sungailiat"
            />
          </AspectRatio>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-muted/50 dark:bg-muted/10 col-span-full -mx-8 mt-12 -mb-8 sm:-mx-12 sm:-mb-12 md:-mx-16 md:-mb-16">
        <div className="mx-auto max-w-7xl px-8 py-5">
          <small className="text-muted-foreground block text-center text-xs sm:text-sm">
            © {new Date().getFullYear()} Masjid Agung Sungailiat. Hak Cipta
            Dilindungi Undang - Undang
          </small>
        </div>
      </div>
    </footer>
  );
}
