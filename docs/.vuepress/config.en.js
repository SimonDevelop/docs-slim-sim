
module.exports = {
  selectText: 'Languages',
  label: 'English',
  editLinkText: 'Edit this page on GitHub',
  nav: require('./nav/nav.en.js'),
  sidebar: {
    '/': [
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '',
          'bases',
          'orm',
          'commands',
          'front',
          'multilingue',
          'security',
          'debug',
          'tests'
        ]
      }
    ]
  }
};
