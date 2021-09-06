export interface IAnswer {
  id?: number;
  answer: string;
  upvotes: number;
  downvotes: number;
  solution: boolean;
  userId?: number;
  questionId?: number;
}
