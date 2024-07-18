import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import "./locales/en/translation.json"
import "./locales/sp/translation.json"
i18n
  .use(Backend)
  //detect user language
  .use(LanguageDetector)
  //pass the i18n instance to react-i18next
  .use(initReactI18next)
  //init i18next
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/https://Foxst5r.github.io/calculator-app/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
