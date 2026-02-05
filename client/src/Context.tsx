import { createContext, useState, type ReactNode } from "react";
import logData from "./Data/logs.json";
import type { LogContextType, UserRole } from "./Types/LogContextType";
import type { Log } from "./Types/Log.ts";

export const LogContext = createContext<LogContextType | null>(null);

export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [logs] = useState<Log[]>(logData as Log[]);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);

  return (
    <LogContext.Provider value={{ logs, selectedLog, setSelectedLog, userRole, setUserRole }}>
      {children}
    </LogContext.Provider>
  );
};
