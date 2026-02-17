import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ko'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Static imports for Turbopack compatibility
import en from '../../messages/en.json';
import ko from '../../messages/ko.json';

const messagesMap: Record<string, typeof en> = { en, ko };

import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    // Read locale from cookies
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;

    // Validate locale, fallback to default
    const locale = (cookieLocale && locales.includes(cookieLocale as Locale))
        ? cookieLocale
        : defaultLocale;

    return {
        locale,
        messages: messagesMap[locale] ?? en,
    };
});
