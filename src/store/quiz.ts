import { QuizService } from '@/services/quiz.service'
import { IQuestion, IQuiz } from '@/utils/types'
import { defineStore } from 'pinia'

interface IQuizState {
  quizes: IQuiz[]
  questions: IQuestion[]
  questionIndex: number
  currentQuiz: IQuiz | null
  userName: string | null
  answers: {
    [x: string]: number | number[] | string
  }
}

const quizService = new QuizService()

export const useQuizStore = defineStore({
  id: 'quiz',
  state: () =>
    ({
      quizes: [],
      currentQuiz: null,
      questionIndex: 0,
      questions: [],
      userName: null,
      answers: {},
    } as IQuizState),
  actions: {
    async fetchQuizes() {
      const quizes = await quizService.getPublicQuizes()
      this.quizes = quizes
    },
    async fetchQuiz(uid: string) {
      const quiz = await quizService.getQuiz(uid)
      if (!quiz) {
        console.log('Quiz not found, need to display an error')
        return
      }
      this.patch({ currentQuiz: quiz })
    },
    async startQuiz(uid: string, name?: string) {
      if (name) {
        this.userName = name
      }
      this.patch({
        questions: await quizService.getQuizQuestions(uid),
        questionIndex: 0,
      })
    },
    nextQuestion(answer: number | number[] | string) {
      console.log(`POST: /answer/:id  {answer: ${answer}}`)
      this.patch({
        answers: {
          ...this.answers,
          [this.questions[this.questionIndex].id]: answer,
        },
        questionIndex: this.questionIndex + 1,
      })
    },
    answerAll() {
      console.log(`POST: /answer/all`, this.answers)
    },
  },
})
