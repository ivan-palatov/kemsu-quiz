<template>
  <div class="flex justify-center pt-10" v-if="store.loading">
    <font-awesome-icon
      class="animate-spin text-5xl text-gray-900"
      :icon="['fas', 'spinner']"
    />
  </div>
  <div v-else class="flex flex-col items-center mx-auto">
    <h2 class="text-2xl mb-4">Активные тесты</h2>
    <div
      class="rounded overflow-hidden shadow-lg p-4 flex flex-col"
      v-for="quiz in store.quizes"
      :key="quiz.id"
    >
      <router-link
        class="text-lg font-semibold text-center no-underline"
        :to="'/quiz/' + quiz.uid"
      >
        {{ quiz.name }}
      </router-link>
      <div>
        <font-awesome-icon class="text-gray-600 mr-2" :icon="['fas', 'user']" />
        <span class="mr-4">{{ quiz.author }}</span>
        <font-awesome-icon
          class="text-gray-600 mr-2"
          :icon="['far', 'clock']"
        />
        <span>{{ dayjs(quiz.createdAt).fromNow() }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuizStore } from '@/store/quiz'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'home',
  setup() {
    const store = useQuizStore()

    store.fetchQuizes()

    return { store, dayjs }
  },
})
</script>
