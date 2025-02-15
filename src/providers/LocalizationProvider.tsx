import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import I18n from 'react-native-i18n';
import { I18nManager } from 'react-native';

import { DotNotation, TranslationKeys } from '@core/i18n/types';
import { en, tr } from '@core/index';

const translations = { en, tr };
export type TranslationKey = DotNotation<TranslationKeys>;

interface LocalizationContextProps {
    locale: string;
    setLocale: (locale: string) => void;
    translate: (key: TranslationKey, config?: Record<string, any>) => string;
}

const LocalizationContext = createContext<LocalizationContextProps>({
    locale: 'en',
    setLocale: () => { },
    translate: (key) => key,
});

interface LocalizationProviderProps {
    children: ReactNode;
}

const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
    const initialLocale: keyof typeof translations = (I18n.locale.split('-')[0] as keyof typeof translations) || 'en';
    const [locale, setLocaleLang] = useState<keyof typeof translations>(initialLocale);

    useEffect(() => {
        const isRTL = ['ar', 'he', 'fa'].includes(locale.split('-')[0]);
        I18nManager.forceRTL(isRTL);
        I18n.translations = translations;
        I18n.locale = locale;
    }, [locale]);

    const setLocale = (newLocale: string) => {
        if (translations[newLocale]) {
            I18n.locale = newLocale;
            setLocaleLang(newLocale as 'tr' | 'en');
        } else {
            console.warn(`Dil bulunamadı: ${newLocale}`);
        }
    };

    const translate = (key: TranslationKey, config?: Record<string, any>) => {
        const translation = I18n.t(key, config);
        return translation.includes('missing') ? key : translation;
    };

    return (
        <LocalizationContext.Provider value={{ locale, setLocale, translate }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => useContext(LocalizationContext);
export default LocalizationProvider;
