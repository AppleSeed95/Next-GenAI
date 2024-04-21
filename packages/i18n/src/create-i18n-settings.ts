/**
 * Get i18n settings for i18next.
 * @param languages
 * @param language
 * @param namespaces
 */
export function createI18nSettings({
  languages,
  language,
  namespaces,
}: {
  languages: string[];
  language: string;
  namespaces?: string | string[];
}) {
  const lng = language;
  const ns = namespaces;

  return {
    supportedLngs: languages,
    fallbackLng: languages[0],
    detection: undefined,
    lng,
    load: 'languageOnly',
    preload: false,
    lowerCaseLng: true,
    fallbackNS: ns,
    ns,
    react: {
      useSuspense: true,
    },
  };
}
