<template>
  <div class="data-box">
    <div class="flex justify-center pt-10" v-if="loading">
      <font-awesome-icon
        class="animate-spin text-5xl text-gray-900"
        :icon="['fas', 'spinner']"
      />
    </div>

    <div
      class="content text-center p-8 text-red-500 flex flex-col justify-center"
      v-else-if="error"
    >
      <div>Something went wrong</div>
      <div>{{ error }}</div>
    </div>

    <div v-else-if="isEmpty">
      <div>Nothing to see here</div>
      <div>Content not found</div>
    </div>

    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    loading: { type: Boolean, default: false },
    isEmpty: { type: Boolean, default: false },
    error: { type: [String, Boolean], default: false },
  },
})
</script>

<style lang="postcss" scoped>
.data-box {
  @apply w-full h-full;
}
</style>
