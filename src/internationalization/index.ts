import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguagdeDector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en-US/transation.json";
import esTranslation from "./locales/es-ES/translation.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  "en-US": {
    translation: enTranslation,
  },
  "es-ES": {
    translation: esTranslation,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguagdeDector) // language detector
  .init({
    resources,
    lng: "en-US",
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
