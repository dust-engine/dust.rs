// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  typescript: { strict: false },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@nuxtjs/plausible',
  ],
  components: {
    global: true,
    dirs: ['~/override-components', '~/components'],
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/posts/12',
        '/posts/13',
        '/posts/14',
        '/api/posts/12',
        '/api/posts/13',
        '/api/posts/14',
      ]
    }
  },
  content: {
    highlight: {
      preload: [
        'rust',
        'glsl'
      ]
    }
  },
  runtimeConfig: {
    githubDiscussion: {
      orgName: 'dust-engine',
      repoName: 'dust',
      appId: 418822,
      key: ''
    }
  },
  plausible: {
    apiHost: 'https://analytics.dust.rs',
  },
})
