import { QuizService } from '@/services/quiz.service'
import { QuestionType } from '@/utils/types'
import { defineStore } from 'pinia'

interface IVariant {
  id: number
  text: string
  isTrue: boolean
}

interface IQuestion {
  id: number
  text: string
  type: QuestionType
  variants: IVariant[]
  answer?: string
}

interface IState {
  name: string
  author: string
  questions: IQuestion[]
}

const quizService = new QuizService()

export const useEditQuiz = defineStore({
  id: 'createQuiz',
  state: () =>
    ({
      name: '',
      author: localStorage.getItem('name') ?? '',
      questions: [],
    } as IState),
  actions: {
    addQuestion() {
      this.questions.push({
        id:
          this.questions.length === 0
            ? 1
            : this.questions[this.questions.length - 1].id + 1,
        text: '',
        type: QuestionType.SINGLE,
        variants: [
          { id: 1, text: '', isTrue: false },
          { id: 2, text: '', isTrue: false },
        ],
      })
    },
    addVariant(i: number) {
      const question = this.questions.find(({ id }) => id === i)!
      const variants = question.variants!
      question.variants.push({
        id: variants.length === 0 ? 1 : variants[variants.length - 1].id + 1,
        text: '',
        isTrue: false,
      })
    },
    removeVariant(i: number, j: number) {
      const question = this.questions.find(({ id }) => id === i)!
      question.variants = question.variants.filter(({ id }) => id !== j)
    },
    removeQuestion(i: number) {
      this.questions = this.questions.filter(({ id }) => id !== i)
    },
    updateSingleVariant(i: number, j: number) {
      const question = this.questions.find(({ id }) => id === i)!
      question.variants = question.variants.map((variant) => ({
        ...variant,
        isTrue: variant.id === j ? true : false,
      }))
    },
    async saveQuiz() {
      console.log('createQuiz.ts:71 SAVING QUIZ', {
        author: this.author,
        name: this.name,
        questions: this.questions,
      })
      await quizService.createQuiz({
        name: this.name,
        author: localStorage.getItem('name'),
        questions: this.questions,
      })
    },
    async fetchQuiz(id: number) {
      const quiz = await quizService.getQuizForTeacher(id)
      this.name = quiz!.name
      this.questions = quiz!.questions as any
    },
    async editQuiz(id: number) {
      await quizService.editQuiz(id, {
        name: this.name,
        author: localStorage.getItem('name'),
        questions: this.questions,
      })
    },
  },
})
