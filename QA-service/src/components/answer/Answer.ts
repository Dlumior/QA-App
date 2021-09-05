export interface IAnswer {
  id?: Number;
  answer: string;
  positiveRating: number;
  negativeRating: number;
  userId?: Number;
  questionId?: Number;
}
