<template>
  <div class="flex justify-center pt-10" v-if="store.currentQuiz == null">
    <font-awesome-icon
      class="animate-spin text-5xl text-gray-900"
      :icon="['fas', 'spinner']"
    />
  </div>
  <div
    class="flex flex-col items-center mx-2 md:w-3/4 lg:w-1/3 md:mx-auto"
    v-else
  >
    <h1
      class="text-xl font-semibold tracking-wide text-gray-900 text-center mb-4"
    >
      {{ store.currentQuiz.name }}
    </h1>
    <p class="text-gray-700 tracking-wide mb-2">
      <span class="font-bold">Количество вопросов</span>:
      {{ store.currentQuiz.questions.length }}
    </p>
    <div
      class="flex flex-col mt-4 items-stretch mx-2 border rounded p-2 border-gray-600 w-full"
    >
      <h3 class="font-semibold tracking-wider text-gray-900 text-center">
        Запуск теста
      </h3>
      <base-input
        class="w-full"
        type="number"
        placeholder="45"
        label="Минут на прохождение теста (0 для бесконечности)"
        name="time-limit"
        v-model:input.number="timeLimit"
      >
        <font-awesome-icon :icon="['far', 'clock']" />
      </base-input>
      <base-button
        :disabled="store.startLoading"
        @click="startTest"
        class="mt-4"
        >Запустить тест</base-button
      >
    </div>
    <div
      class="flex flex-col mt-4 items-stretch mx-2 border rounded p-2 border-gray-600 w-full"
    >
      <h3 class="font-semibold tracking-wider text-gray-900 text-center">
        Назначить начало теста в определённое время
      </h3>
      <base-input
        type="date"
        class="w-full"
        label="Дата проведения теста"
        name="test-date"
        v-model:input="testDate"
      >
        <font-awesome-icon :icon="['far', 'calendar']" />
      </base-input>
      <base-input
        label="Время проведения теста"
        class="w-full"
        placeholder="9:45"
        name="test-time"
        v-model:input="testTime"
      >
        <font-awesome-icon :icon="['far', 'clock']" />
      </base-input>
      <base-input
        type="number"
        class="w-full"
        placeholder="45"
        label="Минут на прохождение теста (0 для бесконечности)"
        name="time-limit"
        v-model:input.number="timeLimit"
      >
        <font-awesome-icon :icon="['far', 'clock']" />
      </base-input>
      <base-button
        :disabled="store.appointLoading"
        @click="appointTest"
        class="mt-4"
        >Назначить Тест</base-button
      >
    </div>
    <div
      class="flex flex-col items-stretch mt-16 mb-8 p-2 border rounded border-orange-600 w-full"
    >
      <h3 class="font-semibold tracking-wider text-gray-900 text-center">
        Изменение теста
      </h3>
      <base-button @click="changeTest" color="warning" class="mt-2"
        >Изменить Тест</base-button
      >
    </div>
    <div
      class="flex flex-col items-stretch mt-6 mb-8 p-2 border rounded border-red-600 bg-red-100 w-full"
    >
      <h3 class="font-semibold tracking-wider text-gray-900 text-center">
        Удаление теста
      </h3>
      <div class="flex justify-center items-end">
        <base-input
          class="w-full"
          placeholder="Тест 1"
          label="Введите полное название теста"
          name="test-name"
          v-model:input="testName"
        >
          <font-awesome-icon :icon="['fas', 'lock']" />
        </base-input>
        <base-button
          @click="deleteQuiz"
          :disabled="isDeletable || store.deleteLoading"
          color="error"
          class="ml-4"
          >Удалить Тест</base-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useDashboardStore } from '@/store/dashboard'
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  name: 'quiz-info',
  components: { BaseInput, BaseButton },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useDashboardStore()
    const timeLimit = ref(0)
    const testName = ref('')
    const testDate = ref('21.12.2020')
    const testTime = ref('8:00')

    store.fetchQuiz(parseInt(route.params.id as string))

    function formatDate(timestamp: number) {
      return dayjs(timestamp).fromNow()
    }

    async function startTest() {
      await store.startQuiz(
        parseInt(route.params.id as string),
        timeLimit.value
      )
      router.push('/monitor-quiz/' + route.params.id)
    }

    async function deleteQuiz() {
      await store.deleteQuiz()
      router.push('/dashboard')
    }

    async function appointTest() {
      await store.appointQuiz(testDate.value, testTime.value, timeLimit.value)
      router.push('/dashboard')
    }

    async function changeTest() {
      router.push('/edit-quiz/' + route.params.id)
    }

    return {
      store,
      formatDate,
      startTest,
      timeLimit,
      deleteQuiz,
      testName,
      testDate,
      appointTest,
      testTime,
      changeTest,
      isDeletable: computed(() => testName.value !== store.currentQuiz!.name),
    }
  },
})
</script>
