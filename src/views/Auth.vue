<template>
  <div class="flex flex-col w-full max-w-sm mx-auto p-4">
    <div class="mb-4">
      <base-input label="Имя" name="name" v-model:input.trim="name">
        <font-awesome-icon :icon="['far', 'user']" />
      </base-input>
    </div>
    <div class="mb-4">
      <base-input
        label="Пароль"
        name="password"
        v-model:input="password"
        :type="!showPassword ? 'password' : 'text'"
        @click-trailing="togglePassword"
      >
        <font-awesome-icon :icon="['fas', 'lock']" />
        <template v-slot:trailing>
          <font-awesome-icon v-if="showPassword" :icon="['fas', 'eye']" />
          <font-awesome-icon v-else :icon="['fas', 'eye-slash']" />
        </template>
      </base-input>
    </div>
    <div class="flex justify-between">
      <base-button>Войти</base-button>
      <base-button>Зарегистрироваться</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'auth-view',
  components: { BaseInput, BaseButton },
  setup() {
    const name = ref('')
    const password = ref('')
    const showPassword = ref(false)

    function togglePassword() {
      showPassword.value = !showPassword.value
    }

    return { password, name, showPassword, togglePassword }
  },
})
</script>
