export interface ApiResponse<T> {
  msg: string;
  status: number;
  data?: T[];
}
