<template>
  <button
    :disabled="disabled"
    class="btn"
    :class="{
      'hover:bg-red-600 text-red-600 border-red-600': color === 'error',
      'hover:bg-orange-600 text-orange-600 border-orange-600':
        color === 'warning',
      'hover:bg-blue-600 text-blue-600 border-blue-600': color === 'primary',
      'opacity-50 cursor-not-allowed': disabled,
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'base-button',
  props: {
    color: {
      type: String as PropType<'primary' | 'warning' | 'error'>,
      default: 'primary',
    },
    disabled: { type: Boolean, default: false },
  },
  computed: {},
})
</script>

<style lang="postcss">
.btn {
  height: 2.63rem;
  @apply transition-colors duration-100 bg-transparent font-semibold py-2 px-4 border rounded;
}

.btn:hover {
  @apply border-transparent text-white;
}

.btn:focus {
  @apply outline-none;
}
</style>
