import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';

interface MosqueLogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  width: number;
  height: number;
  alt?: string;
  className?: string;
  href?: string;
}

export default function MosqueLogo({
  width,
  height,
  alt = 'Logo Masjid Agung Sungailiat - Pusat Ibadah dan Dakwah Islam di Sungailiat',
  className,
  href,
  ...props
}: MosqueLogoProps) {
  const logoImage = (
    <Image
      src="/logo.png"
      alt={alt}
      width={width}
      height={height}
      priority
      className={cn(
        'h-auto w-auto object-contain transition-all duration-200 hover:drop-shadow-md',
        className
      )}
      style={{
        maxWidth: width,
        maxHeight: height,
      }}
      {...props}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="Navigasi ke halaman utama Masjid Agung Sungailiat"
        className="inline-block"
      >
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}
