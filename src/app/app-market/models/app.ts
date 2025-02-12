export interface App {
  id: string;
  name: string;
  iconUrl: string;
  description: string;
  currentVersion: string;
  versions: string[];
  tags: string[];
  price: number;
  regions: AppRegion[];
  status: string;
  resposible: string;
  support: boolean;
  docUrl: string;
  config: any;
}

export enum AppStatus {
  Unknown = 'unknown',
  InProgress = 'inprogress',
  Ready = 'ready',
  Suspended = 'suspended',
  Cancelled = 'cancelled',
}

export enum AppRegion {
  Unknown = 'Unknown',
  Trondheim = 'Trondheim',
  Oslo = 'Oslo',
}
