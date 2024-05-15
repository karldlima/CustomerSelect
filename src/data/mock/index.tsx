enum RoleType {
  Admin = "admin",
  Manager = "manager",
}

export type Role = keyof typeof RoleType;

export interface User {
  email: string;
  id: number;
  name: string;
  role: Role;
}

export * from "./userData";
