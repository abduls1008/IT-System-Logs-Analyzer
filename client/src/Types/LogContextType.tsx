import type { Log } from "./Log.ts";

export type UserRole = "admin" | "operator" | "viewer" | null;

export interface LogContextType {
  logs: Log[];
  selectedLog: Log | null;
  setSelectedLog: React.Dispatch<React.SetStateAction<Log | null>>;
  userRole: UserRole;
  setUserRole: React.Dispatch<React.SetStateAction<UserRole>>;
}