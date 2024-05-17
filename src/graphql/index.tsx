enum RoleType {
  ADMIN = "admin",
  MANAGER = "manager",
}

export type Role = keyof typeof RoleType;

export interface Customer {
  email: string;
  id: string;
  name: string;
  role: Role;
}

export * from "./helpers";
