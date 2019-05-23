
module.exports = {
  selectText: 'Langues',
  label: 'Français',
  editLinkText: 'Éditer cette page sur GitHub',
  nav: require('./nav/nav.fr.js'),
  sidebar: {
    '/fr/': [
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
