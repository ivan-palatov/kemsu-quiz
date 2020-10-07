import { timeout } from '@/utils/timeout'
import { IQuiz, QuestionType, QuizType } from '@/utils/types'

export class QuizService {
  private _quizes: IQuiz[] = [
    {
      id: 1,
      uid: 'wdh6q21',
      name: 'М-171 Разработка Мобильных Приложений',
      type: QuizType.PUBLIC,
      author: 'ККК',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      startedAt: Date.now() + 999999,
      closesAt: Date.now() + 99999999,
      minsForCompletion: 45,
      questions: [
        {
          id: 1,
          text: 'Как расшифровывается XML?',
          type: QuestionType.SINGLE,
          variants: [
            { id: 1, text: 'X-Men: Legion' },
            { id: 2, text: 'Extensive Machine Learning' },
            { id: 3, text: 'Extensible Markup Language' },
          ],
        },
      ],
    },
  ]

  public async getPublicQuizes() {
    await timeout()
    return this._quizes
  }

  // fetch quiz info without questions if it is timed
  public async getQuiz(uid: string) {
    await timeout()
    return this._quizes.find((quiz) => quiz.uid === uid)
  }
}
