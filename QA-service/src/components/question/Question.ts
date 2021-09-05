export interface IQuestion {
  id?: number;
  title: string;
  description: string;
  solved: boolean;
  userId?: number;
}
