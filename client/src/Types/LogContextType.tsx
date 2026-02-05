import type { Log } from "./Log.ts";

export interface LogContextType {
  logs: Log[];
  selectedLog: Log | null;
  setSelectedLog: React.Dispatch<React.SetStateAction<Log | null>>;
}