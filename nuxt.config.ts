// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  devtools: { enabled: false },
  css: ['~/assets/styles/main.css'],
  alias: {
    '@domain': fileURLToPath(new URL('./domain', import.meta.url)),
    '@application': fileURLToPath(new URL('./application', import.meta.url)),
    '@interface-adapters': fileURLToPath(new URL('./interface-adapters', import.meta.url)),
    '@infrastructure': fileURLToPath(new URL('./infrastructure', import.meta.url)),
  },
  compatibilityDate: '2025-07-15',
});
