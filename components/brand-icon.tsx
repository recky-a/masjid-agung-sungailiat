import type { SimpleIcon as Icon } from 'simple-icons';

type BrandIconProps = {
  icon: Icon;
  size?: number; // in pixels
  className?: string; // for Tailwind utility classes
};

export function BrandIcon({ icon, size = 24, className = '' }: BrandIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={`#${icon.hex}`}
      aria-label={icon.title}
      width={size}
      height={size}
      className={`inline-block ${className}`}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
