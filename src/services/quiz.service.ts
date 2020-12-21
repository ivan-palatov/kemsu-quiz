import { shuffleArray } from '@/utils/shuffleArray'
import { timeout } from '@/utils/timeout'
import { IQuiz, QuestionType, QuizType } from '@/utils/types'
import axios from 'axios'

const BASE_URL = 'https://quiz-backe.herokuapp.com/api/v1'

class QuizService {
  private _quizes: IQuiz[] = [
    {
      id: 1,
      uid: 'wdh6q21',
      name: 'М-171 Разработка Мобильных Приложений',
      type: QuizType.PUBLIC,
      author: 'Иван',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      startedAt: Date.now() - 999999,
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

  /* Запрос на создание квиза quiz: {name: 'Test #1', author: 'Pedro', questions: [
    {text: 'Сколько см пипи?', type: 'WRITTEN', answer: '3'}
    {text: 'Лучший в мире?', type: 'SINGLE', variants: [
      {text: 'Папич', isTrue: true}, {text: 'Бабич', isTrue: false}
    ]}
  ]}
  */
  public async createQuiz(quiz: any) {
    return true
  }

  /* Запрос на редактирование квиза id: int, quiz: {name: 'Test #1', author: 'Pedro', questions: [
    {text: 'Сколько см пипи?', type: 'WRITTEN', answer: '3'}
    {text: 'Лучший в мире?', type: 'SINGLE', variants: [
      {text: 'Папич', isTrue: true}, {text: 'Бабич', isTrue: false}
    ]}
  ]}
  */
  public async editQuiz(id: number, quiz: any) {
    return true
  }

  // получить все активные квизы для студента
  public async getPublicQuizes() {
    return (await axios.get(BASE_URL + '/getQuizes')).data
  }

  // получить все квизы для препода (здесь по имени, можно по ид автора, без разницы)
  public async getQuizes(user: string) {
    await timeout()
    return this._quizes.filter((q) => q.author === user)
  }

  // получить квиз вообще БЕЗ ВОПРОСОВ, хз, может и не нужен такой роут, могу из другого взять инфу
  public async getQuiz(uid: string) {
    await timeout()
    return this._quizes.find((quiz) => quiz.uid === uid)
  }

  // получить квиз для учителя, с вопросами, вариантами ответа и правильными ответами
  public async getQuizForTeacher(id: number) {
    await timeout()
    return this._quizes.find((quiz) => quiz.id === id)
  }

  // ну понятно, по ид квиз дропнуть, правда тут конечно без авторизации кекв получиться может, но да ладно
  public async deleteQuiz(id: number) {
    await timeout()
    return true
  }

  // это роут для назначения квизов на определённую дату и время, чтоб автоматом стартовали
  // но хз нужно ли это, или ну его нахуй. Лучше в конце самом делать
  public async appointQuiz(
    id: number,
    testDate: string,
    testTime: string,
    timeLimit: number
  ) {
    await timeout()
    return true
  }

  // Это роут для того, чтоб квиз начать преподу, timeLimit - время в минутах на его прохождение
  public async startQuiz(id: number, timeLimit: number) {
    await timeout()
    return true
  }

  // Это роут для получения студентами квиза со всеми его вопросами, но без правильных ответов
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

  // Еще нужны роуты для просмотра результатов преподом, ответа на вопрос учеником, ответа на сразу все вопросы учеником, завершение квиза преподом
}

export const quizService = new QuizService()
