export enum QuestionType {
  MULTI = 'MULTI',
  SINGLE = 'SINGLE',
  WRITTEN = 'WRITTEN',
}

export enum QuizType {
  PUBLIC = 'PUBLIC',
  AUTHENTICATED = 'AUTHENTICATED',
  HIDDEN = 'HIDDEN',
}

export interface IVariant {
  id: number
  text: string
}

export interface IQuestion {
  id: number
  text: string
  pictures?: string[]
  type: QuestionType
  variants: IVariant[]
}

export interface IQuiz {
  id: number
  uid: string
  name: string
  type: QuizType
  createdAt: number
  updatedAt: number
  author: string
  questions: IQuestion[]
  startedAt: number
  closesAt?: number
  minsForCompletion?: number
}
