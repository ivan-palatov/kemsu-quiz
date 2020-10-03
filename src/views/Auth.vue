<template>
  <div class="flex flex-col w-full max-w-sm mx-auto p-4">
    <label for="name" class="text-sm tracking-wide text-gray-600">Имя</label>
    <div class="relative mb-6">
      <div
        class="absolute flex border border-transparent left-0 top-0 h-full w-10"
      >
        <div
          class="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-lg h-full w-full text-gray-600"
        >
          <font-awesome-icon :icon="['fas', 'user-circle']" />
        </div>
      </div>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Имя"
        class="relative w-full border rounded placeholder-gray-500 focus:border-indigo-500 focus:outline-none py-2 pr-2 pl-12 text-gray-800"
      />
    </div>

    <div class="flex justify-center">
      <button
        class="bg-transparent hover:bg-blue-600 font-semibold text-blue-600 hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded mr-6"
      >
        Войти
      </button>
      <button
        class="bg-transparent hover:bg-blue-600 font-semibold text-blue-600 hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded"
      >
        Зарегистрироваться
      </button>
    </div>
  </div>
</template>
