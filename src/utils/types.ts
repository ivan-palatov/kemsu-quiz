export enum QuestionType {
  MULTI = 'MULTI',
  SINGLE = 'SINGLE',
  WRITTEN = 'WRITTEN',
}

// const aaa = {
//   author: 'Учитель года 228',
//   name: 'Лучший опрос тысячелетия',
//   questions: [
//     {
//       text: 'Сколько будет 2+2',
//       type: QuestionType.SINGLE,
//       variants: [{ text: '4', isTrue: true }, { text: '5' }],
//     },
//     {
//       text: 'Кто чтО?',
//       type: QuestionType.MULTI,
//       variants: [
//         { text: '4', isTrue: true },
//         { text: '4', isTrue: true },
//         { text: '5' },
//       ],
//     },
//     {
//       text: 'Как тебя зовут?',
//       type: QuestionType.WRITTEN,
//       variants: [{ text: 'abc', isTrue: true }],
//     },
//   ],
// }

export enum QuizType {
  PUBLIC = 'PUBLIC',
  AUTHENTICATED = 'AUTHENTICATED',
  HIDDEN = 'HIDDEN',
}

export interface IVariant {
  id: number
  text: string
  isTrue?: boolean
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
