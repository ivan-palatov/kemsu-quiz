<template>
  <div class="flex flex-col items-center mx-auto">
    <h2 class="text-2xl mb-4">Ваши тесты</h2>
    <div
      class="rounded overflow-hidden shadow-lg p-4 flex flex-col"
      v-for="quiz in store.quizes"
      :key="quiz.id"
    >
      <router-link
        class="text-lg font-semibold text-center no-underline"
        :to="'/quiz-info/' + quiz.id"
      >
        {{ quiz.name }}
      </router-link>
      <div>
        <font-awesome-icon
          class="text-gray-600 mr-2"
          :icon="['far', 'clock']"
        />
        <span>{{ dayjs(quiz.createdAt).fromNow() }}</span>
      </div>
    </div>
    <base-button @click="createQuiz" class="mt-8">Создать тест</base-button>
  </div>
</template>

<script lang="ts">
import { useDashboardStore } from '@/store/dashboard'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import BaseButton from '@/components/BaseButton.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { BaseButton },
  name: 'dashboard',
  setup() {
    const store = useDashboardStore()
    const router = useRouter()

    store.fetchQuizes()

    function createQuiz() {
      router.push('/create-quiz')
    }

    return { store, dayjs, createQuiz }
  },
})
</script>
