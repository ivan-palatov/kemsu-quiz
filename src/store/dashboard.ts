import { quizService } from '@/services/quiz.service'
import { IQuiz } from '@/utils/types'
import { defineStore } from 'pinia'

interface IQuizState {
  quizes: IQuiz[]
  currentQuiz: IQuiz | null
  loading: boolean
  appointLoading: boolean
  startLoading: boolean
  deleteLoading: boolean
}

export const useDashboardStore = defineStore({
  id: 'dashboard',
  state: () =>
    ({
      quizes: [],
      currentQuiz: null,
      loading: true,
      appointLoading: false,
      startLoading: false,
      deleteLoading: false,
    } as IQuizState),
  actions: {
    async fetchQuizes() {
      const quizes = await quizService.getQuizes(localStorage.getItem('name')!)
      this.quizes = quizes
      this.loading = false
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
      this.startLoading = true
      await quizService.startQuiz(id, timeLimit)
      this.startLoading = false
    },
    async deleteQuiz() {
      this.deleteLoading = true
      await quizService.deleteQuiz(this.currentQuiz!.id)
      this.deleteLoading = false
    },
    async appointQuiz(testDate: string, testTime: string, timeLimit: number) {
      this.appointLoading = true
      await quizService.appointQuiz(
        this.currentQuiz!.id,
        testDate,
        testTime,
        timeLimit
      )
      this.appointLoading = false
    },
  },
})
