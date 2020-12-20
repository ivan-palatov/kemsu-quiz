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
    <div class="mb-4">
      <base-select
        label="Тип пользователя"
        name="user-type"
        v-model:input="userType"
        :variants="userTypes"
      />
    </div>
    <div class="flex justify-between">
      <base-button @click="register">Войти</base-button>
      <base-button @click="register">Зарегистрироваться</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'auth-view',
  components: { BaseInput, BaseButton, BaseSelect },
  setup() {
    const name = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const userType = ref('STUDENT')

    const userTypes = [
      { value: 'STUDENT', text: 'Студент' },
      { value: 'TEACHER', text: 'Преподаватель' },
    ]

    function togglePassword() {
      showPassword.value = !showPassword.value
    }

    function register() {
      localStorage.setItem('name', name.value)
      localStorage.setItem('userType', userType.value)
    }

    return {
      password,
      name,
      showPassword,
      togglePassword,
      userType,
      userTypes,
      register,
    }
  },
})
</script>
