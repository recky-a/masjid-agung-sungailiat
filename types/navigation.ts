export interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  isExternal?: boolean;
}

export interface LogoConfig {
  width?: number;
  height?: number;
  showText?: boolean;
  text?: string;
}

export interface NavigationProps {
  leftLinks?: NavLink[];
  rightLinks?: NavLink[];
  allLinks?: NavLink[];
  logoConfig?: LogoConfig;
}
