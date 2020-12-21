<template>
  <div class="flex justify-center pt-10" v-if="store.currentQuiz == null">
    <font-awesome-icon
      class="animate-spin text-5xl text-gray-900"
      :icon="['fas', 'spinner']"
    />
  </div>
  <div class="flex flex-col items-center" v-else>
    <h1
      class="text-xl font-semibold tracking-wide text-gray-900 text-center mb-4"
    >
      {{ store.currentQuiz.name }}
    </h1>
    <p class="text-gray-700 tracking-wide mb-2">
      <span class="font-bold">Начало</span>:
      {{ formatDate(store.currentQuiz.startedAt) }}
    </p>
    <p
      v-if="store.currentQuiz.closesAt"
      class="text-gray-700 tracking-wide mb-2"
    >
      <span class="font-bold">Окончание</span>:
      {{ formatDate(store.currentQuiz.closesAt) }}
    </p>
    <p
      v-if="store.currentQuiz.minsForCompletion"
      class="text-gray-700 tracking-wide mb-2"
    >
      <span class="font-bold">Время на прохождение теста</span>:
      {{ store.currentQuiz.minsForCompletion }} минут
    </p>
    <div class="flex justify-between items-end">
      <base-input
        placeholder="Иванов Иван"
        label="Ваши фамилия и имя"
        name="name"
        v-model:input.trim="name"
      >
        <font-awesome-icon :icon="['far', 'user']" />
      </base-input>
      <base-button :disabled="!isJoinable" @click="startTest" class="ml-4">
        Приступить
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuizStore } from '@/store/quiz'
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  name: 'quiz-view',
  components: { BaseInput, BaseButton },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useQuizStore()
    const name = ref('')

    store.fetchQuiz(route.params.id as string)

    function formatDate(timestamp: number) {
      return dayjs(timestamp).fromNow()
    }

    function startTest() {
      store.startQuiz(route.params.id as string, name.value)
      router.push('/begin-quiz/' + route.params.id)
    }

    return {
      store,
      formatDate,
      startTest,
      name,
      isJoinable: computed(
        () =>
          dayjs(store.currentQuiz!.startedAt).isBefore(dayjs()) &&
          name.value.length > 1
      ),
    }
  },
})
</script>
