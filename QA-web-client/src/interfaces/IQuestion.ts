import { IUser } from "./IUser";

export interface IQuestion {
  id: number,
  title: string,
  description: string,
  solved: false,
  createdAt?: string,
  updatedAt?: string,
  userId: Number,
}


export interface IQuestionUser {
  id: number,
  title: string,
  description: string,
  solved: false,
  createdAt?: string,
  updatedAt?: string,
  userId: Number,
  UserInstance: IUser
}