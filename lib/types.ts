export interface Viewer {
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}

export interface Task {
  id: string | null;
  amt: number | null;
  eta: string | null;
  isNew: boolean | null;
}
