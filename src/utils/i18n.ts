import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';

import en from '../locales/en.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {en: {translation: en}},
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {escapeValue: false},
        returnNull: false,
    });

export default i18n;
