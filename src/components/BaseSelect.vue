<template>
  <div class="flex flex-col">
    <label :for="name" class="text-sm tracking-wide text-gray-600">{{
      label
    }}</label>
    <div class="relative">
      <select
        class="w-full border border-gray-600 bg-white rounded px-2 py-2 outline-none"
        :class="{ 'border-red-500': error }"
        :value="input"
        v-bind="$attrs"
        :id="name"
        :name="name"
        @input="updateValue($event.target.value)"
      >
        <option
          v-for="variant in variants"
          :key="variant.value"
          class="py-1"
          :value="variant.value"
        >
          {{ variant.text }}
        </option>
      </select>
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
    variants: { type: Array as any, required: true },
  },
  methods: {
    updateValue(value: string) {
      this.$emit('update:input', value)
    },
  },
})
</script>
