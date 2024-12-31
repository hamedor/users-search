export interface Error {
  id: number;
  message: string;
}

export interface ErrorState {
  errors: Error[];
}