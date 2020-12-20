<template>
  <label class="inline-flex items-center focus:outline-none">
    <input
      type="checkbox"
      class="form-checkbox h-5 w-5 text-blue-500 border-blue-500"
      v-bind="$attrs"
      :value="checkbox"
      @change="changeValue"
    />
    <span class="ml-2 text-gray-800 tracking-wide">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-checkbox',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    checkbox: Boolean,
  },
  methods: {
    changeValue() {
      this.$emit('update:checkbox', !this.checkbox)
    },
  },
})
</script>
