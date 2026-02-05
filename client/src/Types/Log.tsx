export interface Log {
  id: string;
  timestamp: string; 
  severity: string;
  type: string;
  source: string;
  message: string;
  hostName: string;
  ipAddress: string;
  environment: string;
  user: string;
  module: string;
  eventCode: string;
  durationMs: number;
  resolved: boolean;
}
