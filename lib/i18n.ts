// i18n helper for loading JSON dictionaries at runtime
// Note: lightweight utility without extra deps

export type SupportedLocale = 'kz' | 'ru';

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale === 'kz' || locale === 'ru';
}

export async function loadCommonDictionary(locale: SupportedLocale): Promise<TranslationDictionary> {
  switch (locale) {
    case 'kz':
      return (await import('../locales/kz/common.json')).default as TranslationDictionary;
    case 'ru':
    default:
      return (await import('../locales/ru/common.json')).default as TranslationDictionary;
  }
}

export function t(dict: TranslationDictionary, path: string, fallback: string = ''): string {
  const segments = path.split('.');
  let node: unknown = dict;
  for (const segment of segments) {
    if (typeof node !== 'object' || node === null) {
      return fallback;
    }
    node = (node as Record<string, unknown>)[segment];
  }
  return typeof node === 'string' ? node : fallback;
}


