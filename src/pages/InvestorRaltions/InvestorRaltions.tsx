import { Trans, useTranslation } from "react-i18next";
import { Button, Container, Icon } from "../../components";

import conferenceCallImg from "../../assets/images/conference_call.svg";
import startupImg from "../../assets/images/woman_led_startup_company.svg";
import strategyImg from "../../assets/images/strategy.svg";
import successImg from "../../assets/images/success.svg";

import { IconId } from "../../types/enums";

const InvestorRaltions = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="py-12 ">
        <Container className="md:grid md:grid-cols-2 md:gap-16 md:mx-auto md:max-w-screen-xl md:items-center max-w-screen-sm">
          <div className="col-span-1 mb-12 md:mb-0">
            <Trans
              i18nKey={"welcome screen"}
              ns="pageInvestors"
              components={{
                heading: <h1 className="mt-0" />,
              }}
            />
          </div>
          <div className="col-span-1">
            <img
              className="w-full mx-auto max-w-[500px] md:max-w-none"
              src={conferenceCallImg}
              alt="Conference Call"
            />
          </div>
        </Container>
      </section>
      <section className="py-12 pb-20 bg-[#222222] text-white">
        <Container className="mx-auto max-w-screen-xl">
          <h2 className="text-center">{t("reports.title", { ns: "pageInvestors" })}</h2>
          <p className="mb-8 text-center">
            {t("reports.description", { ns: "pageInvestors" })}
          </p>
          <ul className="p-0 m-0 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <li className="p-0 before:hidden col-span-1">
              <a
                href="#fake"
                className="h-full text-inherit flex items-center gap-3 no-underline p-5 border-2 border-primary-400 rounded-3xl hover:text-white transition-colors"
              >
                <Icon
                  id={IconId.Document}
                  width="32"
                  className="shrink-0 grow-0"
                  fill="white"
                />
                <p className="m-0 text-body-sm">
                  <b>{t("reports.downloads.2024Q2", { ns: "pageInvestors" })}</b>
                </p>
              </a>
            </li>
            <li className="p-0 before:hidden col-span-1">
              <a
                href="#fake"
                className="h-full text-inherit flex items-center gap-3 no-underline p-5 border-2 border-primary-400 rounded-3xl hover:text-white transition-colors"
              >
                <Icon
                  id={IconId.Document}
                  width="32"
                  className="shrink-0 grow-0"
                  fill="white"
                />
                <p className="m-0 text-body-sm">
                  <b>{t("reports.downloads.2023", { ns: "pageInvestors" })}</b>
                </p>
              </a>
            </li>
            <li className="p-0 before:hidden col-span-1">
              <a
                href="#fake"
                className="h-full text-inherit flex items-center gap-3 no-underline p-5 border-2 border-primary-400 rounded-3xl hover:text-white transition-colors"
              >
                <Icon
                  id={IconId.Document}
                  width="32"
                  className="shrink-0 grow-0"
                  fill="white"
                />
                <p className="m-0 text-body-sm">
                  <b>{t("reports.downloads.2023Q4", { ns: "pageInvestors" })}</b>
                </p>
              </a>
            </li>
            <li className="p-0 before:hidden col-span-1">
              <a
                href="#fake"
                className="h-full text-inherit flex items-center gap-3 no-underline p-5 border-2 border-primary-400 rounded-3xl hover:text-white transition-colors"
              >
                <Icon
                  id={IconId.Document}
                  width="32"
                  className="shrink-0 grow-0"
                  fill="white"
                />
                <p className="m-0 text-body-sm">
                  <b>{t("reports.downloads.2022", { ns: "pageInvestors" })}</b>
                </p>
              </a>
            </li>
          </ul>
        </Container>
      </section>
      <section className="py-12 border-b border-dotted border-[#333333]">
        <Container className="md:grid md:grid-cols-2 md:gap-16 md:mx-auto md:max-w-screen-xl md:items-center max-w-screen-sm">
          <div className="col-span-1 mb-12 md:mb-0">
            <img
              className="w-full mx-auto max-w-[500px] md:max-w-none"
              src={startupImg}
              alt="Woman led startup company"
            />
          </div>
          <div className="col-span-1">
            <Trans
              i18nKey={"governance"}
              ns="pageInvestors"
              components={{
                guidelines: <a href="#" />,
                conduct: <a href="#" />,
                audit: <a href="#" />,
              }}
            />
          </div>
        </Container>
      </section>
      <section className="py-12 border-b-[1px] border-white dark:border-gray-700">
        <Container className="md:grid md:grid-cols-2 md:gap-16 md:mx-auto md:max-w-screen-xl md:items-center max-w-screen-sm">
          <div className="col-span-1 mb-12 md:mb-0">
            <Trans
              i18nKey={"stock"}
              ns="pageInvestors"
              components={{
                stock: <a href="#" />,
                historical: <a href="#" />,
                dividend: <a href="#" />,
              }}
            />
          </div>
          <div className="col-span-1">
            <img
              className="w-full mx-auto max-w-[500px] md:max-w-none"
              src={strategyImg}
              alt="Business strategy development"
            />
          </div>
        </Container>
      </section>
      <section>
        <Container className="md:grid md:grid-cols-2 md:mx-auto md:max-w-none md:min-h-[700px] md:items-center max-w-screen-sm md:pl-0 lg:pl-0 xl:pl-0 bg-gray-100 dark:bg-black">
          <div className="col-span-1 py-12 md:max-w-[calc(theme(screens.xl)/2)] md:pl-12 lg:pl-24">
            <Trans
              i18nKey={"contact"}
              ns="pageInvestors"
              components={{
                p: <p className="mb-8" />,
              }}
            />
            <div className="flex gap-6 mb-8 self-center">
              <Button
                variant="secondary"
                as="link"
                className="w-full sm:w-[12rem]"
                to="tel:+1987654321"
                icon={IconId.CallSolid}
              >
                {t("Call us", { ns: "pageInvestors" })}
              </Button>
              <Button
                variant="secondary"
                as="link"
                className="w-full sm:w-[12rem]"
                to="mailto:support@talktube.com"
                icon={IconId.MessageSolid}
              >
                {t("Write us", { ns: "pageInvestors" })}
              </Button>
            </div>
          </div>
          <div className="col-span-1 md:relative self-stretch mb-12 md:mb-0 md:order-first bg-primary-400">
            <img
              className="w-full mx-auto max-w-[500px] md:max-w-none md:absolute md:left-0 md:top-0 md:h-full md:object-cover"
              src={successImg}
              alt="Happy partners with successfull project"
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default InvestorRaltions;
