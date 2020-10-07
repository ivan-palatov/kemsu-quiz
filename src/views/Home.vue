<template>
  <div class="flex flex-col items-center max-w-sm mx-auto">
    <img class="mx-auto" alt="Vue logo" src="../assets/logo.png" />
    <variant-checkbox
      v-model:checkbox="isChecked"
      label="X-Men: Legion"
      :index="0"
    />
  </div>
</template>

<script lang="ts">
import VariantCheckbox from '@/components/VariantCheckbox.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: { VariantCheckbox },
  data() {
    return {
      isChecked: false,
    }
  },
})
</script>
