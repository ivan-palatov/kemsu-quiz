import { defineStore } from 'pinia'

export const useQuizStore = defineStore({
  id: 'quiz',
  state: () => ({
    quizes: [],
    quiz: null,
  }),
})
