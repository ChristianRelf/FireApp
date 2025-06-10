export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface FileUploadResult {
  url: string;
  path: string;
  name: string;
  size: number;
}

export interface LoadingState {
  [key: string]: boolean;
}

export interface ErrorState {
  [key: string]: string | null;
}