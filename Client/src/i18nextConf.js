import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json'
import translationAR from './locales/ar/translation.json'
import translationFR from './locales/fr/translation.json'

const fallbackLng = ['ar'];
const availableLanguages = ['en', 'ar', 'fr'];
const resources = {
    en: {
      translation: translationEN
    },
    ar: {
      translation: translationAR
    },
    fr: {
      translation: translationFR
    }
  };

i18n
  .use(Backend) // load translations using http (default                                               public/assets/locals/en/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng,
    react:{
        useSuspense:false

    },
    // fallback language is english.

    detection: {
      checkWhitelist: true, // options for language detection
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

export default i18n;