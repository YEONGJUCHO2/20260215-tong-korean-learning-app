import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ko'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Static imports for Turbopack compatibility
import en from '../../messages/en.json';
import ko from '../../messages/ko.json';

const messagesMap: Record<string, typeof en> = { en, ko };

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;
    const resolvedLocale = locales.includes(locale as Locale) ? (locale as string) : defaultLocale;

    return {
        locale: resolvedLocale,
        messages: messagesMap[resolvedLocale] ?? en,
    };
});
