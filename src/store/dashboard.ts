import { QuizService } from '@/services/quiz.service'
import { IQuiz } from '@/utils/types'
import { defineStore } from 'pinia'

interface IQuizState {
  quizes: IQuiz[]
  currentQuiz: IQuiz | null
}

const quizService = new QuizService()

export const useDashboardStore = defineStore({
  id: 'dashboard',
  state: () =>
    ({
      quizes: [],
      currentQuiz: null,
    } as IQuizState),
  actions: {
    async fetchQuizes() {
      const quizes = await quizService.getQuizes(localStorage.getItem('name')!)
      this.quizes = quizes
    },
    async fetchQuiz(id: number) {
      const quiz = await quizService.getQuizForTeacher(id)
      if (!quiz) {
        console.log('Quiz not found, need to display an error')
        return
      }
      this.currentQuiz = quiz
    },
    async startQuiz(id: number, timeLimit: number) {
      quizService.startQuiz(id, timeLimit)
    },
    async deleteQuiz() {
      await quizService.deleteQuiz(this.currentQuiz!.id)
    },
    async appointQuiz(testDate: string, testTime: string, timeLimit: number) {
      await quizService.appointQuiz(
        this.currentQuiz!.id,
        testDate,
        testTime,
        timeLimit
      )
    },
  },
})
