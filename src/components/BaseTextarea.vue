<template>
  <div class="flex flex-col">
    <label :for="name" class="text-sm tracking-wide text-gray-600">{{
      label
    }}</label>
    <div class="relative">
      <textarea
        :id="name"
        :name="name"
        :placeholder="placeholder ? placeholder : label"
        :value="input"
        @input="updateValue($event.target.value)"
        class="relative w-full border rounded placeholder-gray-500 border-gray-600 focus:border-blue-500 focus:outline-none py-2 px-2 text-gray-800"
        :class="{ 'border-red-500': error }"
        rows="2"
        cols="50"
        v-bind="$attrs"
      />
    </div>
    <span
      v-if="error"
      class="font-medium tracking-wide text-red-500 text-sm mt-1"
      >{{ error }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-textarea',
  inheritAttrs: false,
  props: {
    input: String,
    label: { type: String, required: true },
    error: { type: String, required: false },
    name: { type: String, required: true },
    placeholder: { type: String, required: false },
  },
  methods: {
    updateValue(value: string) {
      this.$emit('update:input', value)
    },
  },
})
</script>
