import { IUser } from "./IUser";

export interface IAnswer {
  id: number,
  answer: string,
  positiveRating: number,
  negativeRating: number,
  createdAt?: string,
  updatedAt?: string,
  userId?: Number,
  questionId?: Number
}

export interface IAnswerUser {
  id: number,
  answer: string,
  positiveRating: number,
  negativeRating: number,
  createdAt?: string,
  updatedAt?: string,
  userId?: Number,
  questionId?: Number,
  UserInstance: IUser
}