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
      <router-link
        class="text-gray-100 tracking-wide text-base font-medium no-underline"
        to="/auth"
        >Войти
      </router-link>
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
