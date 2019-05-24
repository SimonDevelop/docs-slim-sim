module.exports = {
  base: '/',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://github.com/SimonDevelop/slim-sim/raw/master/assets/img/logo.png' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Slim Sim Docs' }],
    ['meta', { name: 'og:description', content: 'Slim Sim Documentation - Main documentation of slim sim skeleton.' }],
    ['meta', { name: 'og:image', content: 'https://github.com/SimonDevelop/slim-sim/raw/master/assets/img/logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'Slim Sim Docs' }],
    ['meta', { name: 'twitter:description', content: 'Slim Sim Documentation - Main documentation of slim sim skeleton.' }],
    ['meta', { name: 'twitter:image', content: 'https://github.com/SimonDevelop/slim-sim/raw/master/assets/img/logo.png' }],
    ['meta', { name: 'theme-color', content: '#CC193A' }]
  ],
  locales: {
    '/': {
      lang: 'en',
      title: 'Slim Sim Docs',
      description: 'Slim Sim Documentation - Main documentation of slim sim skeleton.'
    },
    '/fr/': {
      lang: 'fr',
      title: 'Slim Sim Docs',
      description: 'Documentation de Slim Sim - Documentation principale du skeleton slim sim.'
    }
  },
  themeConfig: {
    logo: 'https://github.com/SimonDevelop/slim-sim/raw/master/assets/img/logo.png',
    repo: 'SimonDevelop/slim-sim',
    docsRepo: 'SimonDevelop/docs-slim-sim',
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
