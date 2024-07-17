import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

export const TitleBar = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center mt-10 gap-10 w-1/2 justify-center">
      <h1 className="text-3xl w-1/2 text-center p-5 border-2">
        {t("calculator.title")}
      </h1>
      <LanguageSelector />
    </div>
  );
};
