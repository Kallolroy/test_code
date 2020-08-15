import i18n from 'i18next'
// import detector from "i18next-browser-languagedetector";
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
// import {  } from "./assets/i18n/translations";

const lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : 'ja';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: lang,
    backend: {
      /* translation file path */
      loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
    },
    fallbackLng: 'en',
    debug: true,
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  })

export default i18n