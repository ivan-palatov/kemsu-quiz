import { shuffleArray } from '@/utils/shuffleArray'
import { timeout } from '@/utils/timeout'
import { IQuiz, QuestionType, QuizType } from '@/utils/types'

export class QuizService {
  private _quizes: IQuiz[] = [
    {
      id: 1,
      uid: 'wdh6q21',
      name: 'М-171 Разработка Мобильных Приложений',
      type: QuizType.PUBLIC,
      author: 'Иван',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      startedAt: Date.now() + 999999,
      closesAt: Date.now() + 9999999999,
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
        {
          id: 2,
          text: 'Выберите всё, что является языком программирования',
          type: QuestionType.MULTI,
          variants: [
            { id: 4, text: 'Visual Studio 2020' },
            { id: 5, text: 'Visual Studio Code' },
            { id: 6, text: 'HTML' },
            { id: 7, text: 'Anaconda' },
            { id: 8, text: 'NPM' },
            { id: 9, text: 'Java' },
            { id: 10, text: 'JavaScript' },
            { id: 11, text: 'C#' },
            { id: 12, text: 'Kotlin' },
          ],
        },
        {
          id: 3,
          text: 'Сколько бит в одном байте?',
          type: QuestionType.WRITTEN,
          variants: [],
        },
      ],
    },
  ]

  public async createQuiz(quiz: any) {
    return true
  }

  public async editQuiz(id: number, quiz: any) {
    return false
  }

  public async getPublicQuizes() {
    await timeout()
    return this._quizes
  }

  public async getQuizes(user: string) {
    await timeout()
    return this._quizes.filter((q) => q.author === user)
  }

  // fetch quiz info without questions
  public async getQuiz(uid: string) {
    await timeout()
    return this._quizes.find((quiz) => quiz.uid === uid)
  }

  public async getQuizForTeacher(id: number) {
    await timeout()
    return this._quizes.find((quiz) => quiz.id === id)
  }

  public async deleteQuiz(id: number) {
    await timeout()
    return true
  }

  public async appointQuiz(
    id: number,
    testDate: string,
    testTime: string,
    timeLimit: number
  ) {
    await timeout()
    return true
  }

  public async startQuiz(id: number, timeLimit: number) {
    await timeout()
    return true
  }

  public async getQuizQuestions(uid: string) {
    await timeout()
    const quiz = this._quizes.find((quiz) => quiz.uid === uid)
    if (!quiz) {
      return
    }
    // Shuffle questions and answers
    quiz.questions = quiz.questions.map((q) => ({
      ...q,
      variants: q.variants ? shuffleArray(q.variants) : q.variants,
    }))
    quiz.questions = shuffleArray(quiz.questions)

    return quiz.questions
  }
}
