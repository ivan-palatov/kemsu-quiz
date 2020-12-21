<template>
  <div class="flex flex-col items-center w-full px-2 md:max-w-md md:mx-auto">
    <div class="mb-4 w-full">
      <base-input
        placeholder="Лучший тест 2020"
        label="Название теста"
        name="name"
        v-model:input.trim="store.name"
      >
        <font-awesome-icon :icon="['fas', 'pencil-alt']" />
      </base-input>
    </div>
    <div
      v-for="(question, i) in store.questions"
      :key="question.id"
      class="border border-gray-800 rounded-md my-2 p-4 w-full"
    >
      <base-textarea
        placeholder="Сколько будет 2+2?"
        :label="'Вопрос ' + (i + 1)"
        :name="'question_' + question.id"
        v-model:input.trim="question.text"
      />
      <base-select
        class="mb-2"
        v-model:input="question.type"
        :label="'Тип вопроса ' + (i + 1)"
        :name="'question_type_' + question.id"
        :variants="questionTypes"
      />
      <div v-if="question.type === 'WRITTEN'" class="w-full">
        <base-input
          placeholder="Ответ"
          :label="'Правильный ответ на вопрос ' + (i + 1)"
          :name="'question_answer_' + question.id"
          class="w-full"
          v-model:input.trim="question.answer"
        >
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />
        </base-input>
        <div class="flex justify-end">
          <base-button
            color="error"
            @click="store.removeQuestion(question.id)"
            class="mt-4"
          >
            Удалить вопрос
          </base-button>
        </div>
      </div>
      <div v-else-if="question.type === 'MULTI'">
        <div
          v-for="(variant, j) in question.variants"
          :key="variant.id"
          class="flex justify-between items-center"
        >
          <base-input
            placeholder="Ответ"
            :label="'Вариант ответа ' + (j + 1)"
            :name="'question_variant_' + question.id + '_' + variant.id"
            class="w-full"
            v-model:input.trim="variant.text"
          >
            <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          </base-input>
          <base-checkbox
            label="Верно?"
            v-model:checkbox="variant.isTrue"
            :id="'question_variant_checkbox_' + question.id + '_' + variant.id"
            :name="
              'question_variant_checkbox_' + question.id + '_' + variant.id
            "
          />
          <base-button
            color="warning"
            @click="store.removeVariant(question.id, variant.id)"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </base-button>
        </div>
        <div class="flex justify-between">
          <base-button
            color="warning"
            @click="store.addVariant(question.id)"
            class="mt-4"
          >
            Добавить вариант
          </base-button>
          <base-button
            color="error"
            @click="store.removeQuestion(question.id)"
            class="mt-4"
          >
            Удалить вопрос
          </base-button>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(variant, j) in question.variants"
          :key="j"
          class="flex justify-between items-center"
        >
          <base-input
            placeholder="Ответ"
            :label="'Вариант ответа ' + (j + 1)"
            :name="'question_variant_' + question.id + '_' + variant.id"
            class="w-full"
            v-model:input.trim="variant.text"
          >
            <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          </base-input>
          <base-checkbox
            label="Верно?"
            :checkbox="variant.isTrue"
            @update:checkbox="
              store.updateSingleVariant(question.id, variant.id)
            "
            :id="'question_variant_checkbox_' + question.id + '_' + variant.id"
            :name="
              'question_variant_checkbox_' + question.id + '_' + variant.id
            "
          />
          <base-button
            color="warning"
            @click="store.removeVariant(question.id, variant.id)"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </base-button>
        </div>
        <div class="flex justify-between">
          <base-button
            color="warning"
            @click="store.addVariant(question.id)"
            class="mt-4"
          >
            Добавить вариант
          </base-button>
          <base-button
            color="error"
            @click="store.removeQuestion(question.id)"
            class="mt-4"
          >
            Удалить вопрос
          </base-button>
        </div>
      </div>
    </div>
    <base-button color="warning" @click="store.addQuestion" class="mt-4">
      Добавить вопрос
    </base-button>
    <div class="flex mt-4 items-end mx-2">
      <base-button :disabled="!canCreate" @click="saveQuiz" class="mt-4 mb-16">
        Сохранить
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { useCreateQuiz } from '@/store/createQuiz'
import { computed, defineComponent } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTextarea from '@/components/BaseTextarea.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'create-quiz-view',
  components: { BaseInput, BaseButton, BaseTextarea, BaseSelect, BaseCheckbox },
  setup() {
    const router = useRouter()
    const store = useCreateQuiz()

    const questionTypes = [
      { value: 'SINGLE', text: 'С одним ответом' },
      { value: 'MULTI', text: 'С несколькими ответами' },
      { value: 'WRITTEN', text: 'Без вариантов ответа' },
    ]

    async function saveQuiz() {
      await store.saveQuiz()
      router.push('/dashboard')
    }

    return {
      store,
      questionTypes,
      saveQuiz,
      canCreate: computed(
        () =>
          store.questions.length !== 0 &&
          store.name &&
          store.questions.filter(
            (q) =>
              !q.text ||
              (q.type !== 'WRITTEN' &&
                (q.variants.filter((v) => !v.text).length > 0 ||
                  q.variants.filter((v) => v.isTrue).length === 0))
          ).length === 0
      ),
    }
  },
})
</script>
