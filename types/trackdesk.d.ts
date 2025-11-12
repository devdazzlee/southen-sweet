/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Trackdesk Global Type Definitions
// Provides TypeScript support for the Trackdesk tracking script

interface TrackdeskConfig {
  apiUrl: string;
  version: string;
  debug: boolean;
  batchSize: number;
  flushInterval: number;
  maxRetries: number;
  retryDelay: number;
  sessionId?: string;
}

interface TrackdeskInitConfig {
  apiUrl?: string;
  websiteId?: string;
  debug?: boolean;
  batchSize?: number;
  flushInterval?: number;
}

interface TrackdeskAPI {
  init: (config: TrackdeskInitConfig) => void;
  track: (eventName: string, eventData?: Record<string, any>) => void;
  identify: (userId: string, userData?: Record<string, any>) => void;
  convert: (conversionData?: Record<string, any>) => void;
  flush: (force?: boolean) => Promise<void>;
  config?: TrackdeskConfig;
}

interface Window {
  Trackdesk?: TrackdeskAPI;
}
