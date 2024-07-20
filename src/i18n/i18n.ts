import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
//moving locales to i18n file has to be done : This was done for the github pages deploy
//This is because of vite cant have locales in public folder
import translationEN from "./locales/en/translation.json";
import translationSP from "./locales/sp/translation.json";

i18n
  .use(Backend)
  //detect user language
  .use(LanguageDetector)
  //pass the i18n instance to react-i18next
  .use(initReactI18next)
  //init i18next
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          ...translationEN,
        },
      },
      sp: {
        translation: {
          ...translationSP,
        },
      },
    },
  });

export default i18n;
