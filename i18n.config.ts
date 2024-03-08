export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt-br',
  fallbackWarn: false,
  missingWarn: false,
  messages: {
    en: {},
    'pt-br': {
      Profile: 'Perfis',
      Internal: 'Interno',
      External: 'Externo',
      AcceptanceTerms: 'Termo de Aceite'
    }
  }
}));
