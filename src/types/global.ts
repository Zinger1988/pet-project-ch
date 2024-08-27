export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  // ... other fields
}

export type Theme = "light" | "dark";

export type MenuItems = Array<{ label: string; url: string }>;
