<template>
  <div class="flex flex-col">
    <label :for="name" class="text-sm tracking-wide text-gray-600">{{
      label
    }}</label>
    <div class="relative">
      <div
        class="absolute flex border border-transparent left-0 top-0 h-full w-10"
      >
        <div
          class="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-lg h-full w-full text-gray-600"
        >
          <slot />
        </div>
      </div>
      <input
        :id="name"
        :name="name"
        type="text"
        :placeholder="placeholder ? placeholder : label"
        :value="input"
        @input="updateValue($event.target.value)"
        class="relative w-full border rounded placeholder-gray-500 border-gray-600 focus:border-blue-500 focus:outline-none py-2 pr-2 pl-12 text-gray-800"
        :class="{ 'border-red-500': error, 'pr-12': hasTrailing }"
        v-bind="$attrs"
      />
      <div
        v-if="hasTrailing"
        class="absolute flex border border-transparent right-0 top-0 h-full w-10 cursor-pointer"
        @click="$emit('click-trailing')"
      >
        <div
          class="flex items-center justify-center rounded-tr rounded-br z-10 bg-gray-100 text-lg h-full w-full text-gray-600"
        >
          <slot name="trailing" />
        </div>
      </div>
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
  name: 'base-input',
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
  computed: {
    hasTrailing(): boolean {
      return !!this.$slots['trailing']
    },
  },
})
</script>
