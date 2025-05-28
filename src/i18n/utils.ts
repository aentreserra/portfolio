import caTranslations from './locales/ca.json';
import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';

export const defaultLocale = 'es' as const;

export const supportedLocales = {
  ca: { name: 'Català', translations: caTranslations},
  es: { name: 'Español', translations: esTranslations},
  en: { name: 'English', translations: enTranslations},
} as const;

export type SupportedLocale = keyof typeof supportedLocales;
export type TranslationKey = keyof (typeof supportedLocales)[typeof defaultLocale]['translations'];
export type TranslationParams = Record<string, string | number>;

/**
 * Returns a 't' function of the expected locate.
 * @param locale - Language code. If undefined or not supported will use default.
 * @returns Function (key: TranslationKey, params?: TranslationParams) => string
 */
export function useTranslations(locale: string | undefined) {
  const currentLocale: SupportedLocale = 
    locale && locale in supportedLocales
    ? (locale as SupportedLocale) : defaultLocale;

    return function t(key: TranslationKey, params?: TranslationParams): string {
      let text = supportedLocales[currentLocale]?.translations?.[key];

      if (text === undefined) {
        text = supportedLocales[defaultLocale].translations[key];
      }

      if (text === undefined) {
        return String(key);
      }

      let processedText = String(text);

      if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
          processedText = processedText.replace(new RegExp(`{${paramKey}}`, 'g'), String(value));
        });
      }

      return processedText;
    }
}