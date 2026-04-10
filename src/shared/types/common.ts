/**
 * Common shared types
 */
export interface SelectOption {
  label: string;
  value: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface SiteInfo {
  name: string;
  region: string;
  currency: string;
  language: string;
}

export interface DeliveryLocation {
  label: string;
  currentValue: string;
}

