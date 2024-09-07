export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  // ... other fields
}

export type Theme = "light" | "dark";

export type MenuItems = Array<{ label: string; url: string }>;

export interface StatusBannerItem {
  status?: "operational" | "issue";
  statusText?: string;
}

export interface SystemStatusItem {
  description: string;
  label: string;
  status: "operational" | "issue";
  statusText: string;
}

export interface SystemIncidentItem {
  date: string;
  description: string;
  label: string;
  status: "investigating" | "resolved";
}
