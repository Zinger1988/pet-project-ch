import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Checkbox, Button } from "..";
import { useTranslation } from "react-i18next";

const CookieBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferncesVisible, setIsPreferncesVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = Cookies.get("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    Cookies.set("cookie-consent", "accepted", { expires: 365 });
    Cookies.set("preferences", JSON.stringify(preferences), { expires: 365 });
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    Cookies.set("cookie-consent", "rejected", { expires: 365 });
    setIsVisible(false);
  };

  const handleCustomize = () => {
    Cookies.set("cookie-consent", "customized", { expires: 365 });
    Cookies.set("preferences", JSON.stringify(preferences), { expires: 365 });
    setIsVisible(false);
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  if (!isVisible) return null;

  const bannerContainerStyles =
    "fixed left-2 bottom-2 sm:left-6 sm:bottom-6 w-[calc(100%-(theme(spacing.2)*2))] sm:w-[calc(100%-(theme(spacing.6)*2))] z-50 bg-white dark:bg-[#333] p-4 sm:p-6 lg:p-8 rounded-xl border-black border border-[2px] dark:border-none";

  return (
    <div className={bannerContainerStyles}>
      <p className="mt-0">{t("cookie banner.description")}</p>
      {!isPreferncesVisible && (
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          <Button onClick={handleAcceptAll} className="">
            {t("cookie banner.accept all")}
          </Button>
          <Button variant="secondary" onClick={handleRejectNonEssential} className="">
            {t("cookie banner.reject non-essential")}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsPreferncesVisible(true)}
            className=""
          >
            {t("cookie banner.customize")}
          </Button>
        </div>
      )}
      {isPreferncesVisible && (
        <div className="">
          <p>
            <b>{t("cookie banner.customize your preferences:")}</b>
          </p>
          <Checkbox
            name="analytics"
            checked={preferences.analytics}
            onChange={handlePreferenceChange}
            label={t("cookie banner.allow analytics cookies")}
            className="mb-2"
          />
          <Checkbox
            name="marketing"
            checked={preferences.marketing}
            onChange={handlePreferenceChange}
            label={t("cookie banner.allow marketing cookies")}
            className="mb-6"
          />
          <div className="flex gap-4">
            <Button onClick={handleCustomize} className="">
              {t("buttons.save")}
            </Button>
            <Button variant="secondary" onClick={() => setIsPreferncesVisible(false)}>
              {t("buttons.cancel")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
