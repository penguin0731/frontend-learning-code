// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // 引入全局样式
  css: ['~/assets/style/index.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 注入scss变量
          additionalData: '@use "@/assets/style/variable.scss" as *;'
        }
      }
    }
  }
})
