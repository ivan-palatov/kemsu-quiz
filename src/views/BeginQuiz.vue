<template>
  <div class="flex flex-col items-center justify-center" v-if="question">
    <div class="text-xl mb-4">{{ question.text }}</div>
    <div v-if="question.type === 'WRITTEN'">
      <base-input v-model:input="answer" label="Ответ" name="answer">
        <font-awesome-icon :icon="['fas', 'pen']" />
      </base-input>
    </div>
    <ul v-else>
      <li
        v-for="(variant, index) in question.variants"
        :key="variant.id"
        class="mb-4"
      >
        <variant-checkbox
          :label="variant.text"
          :checkbox="checked.includes(variant.id)"
          @update:checkbox="updateCheckbox(variant.id)"
          :index="index"
        />
      </li>
    </ul>
    <base-button
      class="fixed right-0 bottom-0 mb-6 mr-6"
      color="error"
      @click="nextQuestion"
    >
      Продолжить
    </base-button>
  </div>
</template>

<script lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import VariantCheckbox from '@/components/VariantCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useQuizStore } from '@/store/quiz'
import { QuestionType } from '@/utils/types'
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'begin-quiz',
  components: { BaseInput, VariantCheckbox, BaseButton },
  setup() {
    const store = useQuizStore()
    const route = useRoute()
    const router = useRouter()
    const answer = ref('')
    const checked = ref<number[]>([])

    const question = computed(() => store.questions[store.questionIndex])

    function updateCheckbox(id: number) {
      if (question.value.type === 'SINGLE') {
        checked.value = [id]
      } else if (checked.value.includes(id)) {
        checked.value = checked.value.filter((el) => el !== id)
      } else {
        checked.value.push(id)
      }
    }

    function clearInput() {
      answer.value = ''
      checked.value = []
    }

    function nextQuestion() {
      if (question.value.type === QuestionType.WRITTEN) {
        store.nextQuestion(answer.value)
      } else if (question.value.type === QuestionType.SINGLE) {
        store.nextQuestion(checked.value[0])
      } else {
        store.nextQuestion(checked.value)
      }

      clearInput()

      if (store.questions.length === store.questionIndex) {
        store.answerAll()
        router.push('/end-quiz/' + route.params.id)
      }
    }

    return {
      store,
      question,
      answer,
      checked,
      updateCheckbox,
      nextQuestion,
    }
  },
})
</script>
