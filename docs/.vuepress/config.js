module.exports = {
  base: '/',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://miroir.horyzone.fr/upload/logo-sim-transparent-200px.png' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'SIM Docs' }],
    ['meta', { name: 'og:description', content: 'SIM Documentation - Main documentation of open-source PHP framework SIM.' }],
    ['meta', { name: 'og:image', content: 'https://miroir.horyzone.fr/upload/logo-sim-transparent-200px.png' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'SIM Docs' }],
    ['meta', { name: 'twitter:description', content: 'SIM Documentation - Main documentation of PHP framework SIM.' }],
    ['meta', { name: 'twitter:image', content: 'https://miroir.horyzone.fr/upload/logo-sim-transparent-200px.png' }],
    ['meta', { name: 'theme-color', content: '#CC193A' }]
  ],
  locales: {
    '/': {
      lang: 'en',
      title: 'SIM Docs',
      description: 'SIM Documentation - Main documentation of PHP framework SIM.'
    },
    '/fr/': {
      lang: 'fr',
      title: 'SIM Docs',
      description: 'Documentation de SIM - Documentation principale du framework PHP SIM.'
    }
  },
  themeConfig: {
    logo: 'https://miroir.horyzone.fr/upload/logo-sim-transparent-200px.png',
    repo: 'Horyzone/sim',
    docsRepo: 'Horyzone/docs-sim',
    docsDir: 'docs',
    editLinks: true,
    locales: {
      '/': require('./config.en'),
      '/fr/': require('./config.fr')
    }
  },
  plugins: {
    '@vuepress/plugin-back-to-top': true,
    '@vuepress/medium-zoom': true
  }
};
