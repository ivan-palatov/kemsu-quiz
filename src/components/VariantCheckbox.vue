<template>
  <label
    class="flex justify-start items-center cursor-pointer py-4 pl-2 pr-4 rounded w-full transition-colors duration-200 select-none"
    :class="checkbox ? 'bg-blue-500' : 'bg-gray-200'"
  >
    <div
      class="border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-700 transition-colors duration-200"
      :class="checkbox ? 'bg-blue-500' : 'bg-white'"
    >
      <input
        type="checkbox"
        class="opacity-0 absolute"
        :value="checkbox"
        @change="changeValue"
      />
      <div
        class="icon fill-current pointer-events-none font-bold text-lg transition-colors duration-200"
        :class="checkbox ? 'text-white' : 'text-blue-500'"
      >
        {{ character }}
      </div>
    </div>
    <div
      class="select-none text-white font-semibold tracking-wide pl-2 transition-colors duration-200"
      :class="checkbox ? 'text-white' : 'text-blue-500'"
    >
      {{ label }}
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'variant-checkbox',
  props: {
    label: { type: String, required: true },
    index: { type: Number, required: true },
    checkbox: Boolean,
  },
  methods: {
    changeValue() {
      this.$emit('update:checkbox', !this.checkbox)
    },
  },
  computed: {
    character(): string {
      return String.fromCharCode(97 + this.index).toUpperCase()
    },
  },
})
</script>
