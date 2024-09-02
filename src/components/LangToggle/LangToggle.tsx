import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface LangToggleProps {
  className?: string;
}

const LangToggle: React.FC<LangToggleProps> = ({ className = "" }) => {
  const { t, i18n } = useTranslation();

  const languages = [
    {
      short: "En",
      label: t("languages.en.label"),
    },
    {
      short: "Es",
      label: t("languages.es.label"),
    },
    {
      short: "Fr",
      label: t("languages.fr.label"),
    },
  ];

  useEffect(() => {
    const lang: string = localStorage.lang;
    const isValidLang = languages.some((item) => item.short === lang);
    if (isValidLang) {
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage("En");
    }
  }, []);

  const handleClick = (lng: string) => {
    localStorage.setItem("lang", lng);
    lng !== i18n.language && i18n.changeLanguage(lng);
  };

  const buttonBaseStyles =
    "w-8 h-8 leading-0 text-body-xs font-bold uppercase rounded-xl inline-flex items-center justify-center transition-shadow duration-300 dark:text-gray-300";
  const activeButtonStyles =
    "shadow-[inset_0_0_0_2px_theme(colors.primary.400)] dark:text-gray-900 cursor-default";
  const idleButtonStyles =
    "hover:shadow-[inset_0_0_0_2px_theme(colors.gray.200)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.gray.600)]";

  return (
    <div className="flex gap-1">
      {languages.map((item) => (
        <button
          className={`${buttonBaseStyles} ${
            item.short === i18n.language ? activeButtonStyles : idleButtonStyles
          }`}
          onClick={() => handleClick(item.short)}
          aria-label={item.label}
        >
          {item.short}
        </button>
      ))}
    </div>
  );
};

export default LangToggle;
