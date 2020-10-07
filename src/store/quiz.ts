import { QuizService } from '@/services/quiz.service'
import { IQuiz } from '@/utils/types'
import { defineStore } from 'pinia'

interface IQuizState {
  quizes: IQuiz[]
  currentQuiz: IQuiz | null
  userName: string | null
}

const quizService = new QuizService()

export const useQuizStore = defineStore({
  id: 'quiz',
  state: () =>
    ({
      quizes: [],
      currentQuiz: null,
      userName: null,
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
    async startQuiz(name?: string) {
      if (name) {
        this.userName = name
      }
      // TODO: Fetch questions
    },
  },
})
