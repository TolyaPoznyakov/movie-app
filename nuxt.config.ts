// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      apiToken: process.env.API_KEY
    }
  }, compatibilityDate: '2025-07-15',
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2, // кількість пробілів при вкладеності коду
        semi: false, // правило, яке визначає чи потрібно ставити ; у коді пілся виразів
        commaDangle: 'never' // правило, яке вирішує чи потрібна кома після властивості об'єкту
      }
    }
  }
})
