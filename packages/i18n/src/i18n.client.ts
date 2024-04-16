import i18next, { type InitOptions, i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

let clientInstance: i18n | null = null;

/**
 * Initialize the i18n instance on the client.
 * @param settings - the i18n settings
 * @param resolver - a function that resolves the i18n resources
 */
export async function initializeI18nClient(
  settings: InitOptions,
  resolver: (lang: string, namespace: string) => Promise<object>,
): Promise<i18n> {
  if (clientInstance?.isInitialized) {
    return Promise.resolve(clientInstance);
  }

  await i18next
    .use(initReactI18next)
    .use(
      resourcesToBackend(async (language, namespace, callback) => {
        const data = await resolver(language, namespace);

        return callback(null, data);
      }),
    )
    .use(LanguageDetector)
    .init(
      {
        ...settings,
        detection: {
          order: ['htmlTag', 'cookie', 'navigator'],
          caches: ['cookie'],
          lookupCookie: 'lang',
        },
        interpolation: {
          escapeValue: false,
        },
      },
      (err) => {
        if (err) {
          console.error('Error initializing i18n client', err);
        }
      },
    );

  console.log('i18n client initialized');

  console.log(
    `initialized with ${i18next.languages.join(', ')} languages`,
    clientInstance,
  );

  console.log(
    'resource',
    i18next.getResource('en', 'billing', 'billingInterval.month'),
  );

  console.log(i18next.t('billing:billingInterval.month'));

  clientInstance = i18next;

  return clientInstance;
}
