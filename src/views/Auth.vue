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
      <base-button @click="auth">Войти</base-button>
      <base-button @click="register">Зарегистрироваться</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { timeout } from '@/utils/timeout'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'auth-view',
  components: { BaseInput, BaseButton, BaseSelect },
  setup() {
    const router = useRouter()
    const name = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const userType = ref('STUDENT')

    const userTypes = [
      { value: 'STUDENT', text: 'Студент' },
      { value: 'TEACHER', text: 'Преподаватель' },
    ]

    function togglePassword() {
      console.log('HELLOOO')
      showPassword.value = !showPassword.value
    }

    async function register() {
      localStorage.setItem('name', name.value)
      localStorage.setItem('password', password.value)
      localStorage.setItem('userType', userType.value)
      await timeout(500)
      router.push('/')
      location.reload()
    }

    async function auth() {
      if (
        localStorage.getItem('name') === name.value &&
        localStorage.getItem('password') === password.value
      ) {
        await timeout(500)
        router.push('/')
        location.reload()
      }
    }

    return {
      password,
      name,
      showPassword,
      togglePassword,
      userType,
      userTypes,
      register,
      auth,
    }
  },
})
</script>
