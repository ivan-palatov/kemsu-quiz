<template>
  <nav
    class="w-screen bg-gray-900 h-12 sticky mb-8 flex justify-between items-center px-4"
  >
    <router-link
      class="text-xl text-gray-100 font-bold text tracking-wider no-underline"
      to="/"
      >Быстрый тест
    </router-link>
    <div>
      <div v-if="user.name" class="flex">
        <div v-if="user.type === 'TEACHER'">
          <router-link
            class="text-gray-100 tracking-wide text-base font-medium no-underline mr-4"
            to="/dashboard"
            >Панель Управления
          </router-link>
        </div>
        <a
          class="text-gray-100 tracking-wide text-base font-medium no-underline mr-4 cursor-pointer"
          @click="logout"
          >Выйти</a
        >
      </div>
      <div v-else>
        <router-link
          class="text-gray-100 tracking-wide text-base font-medium no-underline mr-4"
          to="/auth"
          >Войти
        </router-link>
      </div>
    </div>
  </nav>
  <main>
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()
    const user = ref({
      name: '',
      type: '',
    } as { name: string; type: string })

    user.value.name = localStorage.getItem('name') ?? ''
    user.value.type = localStorage.getItem('userType') ?? ''

    function logout() {
      localStorage.clear()
      user.value = {
        name: '',
        type: '',
      }
      router.push('/')
    }

    return { logout, user }
  },
})
</script>

<style lang="scss">
.v-enter-active {
  transition: all 0.6s ease-in;
}
.v-leave-active {
  transition: all 0.6s ease-out;
}
.v-enter,
.v-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
