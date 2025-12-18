
export interface LogEntry {
  handler: string;
  decision: 'PASS' | 'FAIL';
  reason: string;
  logs: string;
  timestamp: string;
}

export interface Handler {
  id: string;
  name: string;
  desc: string;
}

// Fixed: Added missing Section enum used for navigation
export enum Section {
  INTRODUCTION = 'INTRODUCTION',
  PATTERN_DETAILS = 'PATTERN_DETAILS',
  QUALITY_ATTRIBUTES = 'QUALITY_ATTRIBUTES',
  DIAGRAMS = 'DIAGRAMS',
  AI_SIMULATOR = 'AI_SIMULATOR',
}

