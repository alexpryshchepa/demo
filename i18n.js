const NextI18Next = require('next-i18next');

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  localeSubpaths: true,
});

module.exports = NextI18NextInstance;
