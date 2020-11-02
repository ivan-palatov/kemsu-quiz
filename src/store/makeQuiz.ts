import { defineStore } from 'pinia'

export const useMakeQuiz = defineStore({
  id: 'makeQuiz',
  state: () => ({
    name: '',
    questions: [],
  }),
})
