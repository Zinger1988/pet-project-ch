import { useTranslation } from "react-i18next";

const LangToggle = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  console.log(i18n.language);

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("es")}>Español</button>
    </div>
  );
};

export default LangToggle;
