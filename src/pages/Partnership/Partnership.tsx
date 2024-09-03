import { Trans, useTranslation } from "react-i18next";
import { Container, Icon } from "../../components";

import dealImg from "../../assets/images/business_deal.svg";
import productiveImg from "../../assets/images/work_being_productive.svg";
import startupImg from "../../assets/images/business_startup.svg";

import { IconId } from "../../types/enums";

const InvestorRaltions = () => {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <Container className="md:grid md:grid-cols-2 md:mx-auto md:max-w-none md:min-h-[700px] md:items-center max-w-screen-sm md:pl-0 lg:pl-0 xl:pl-0 bg-gray-100 dark:bg-black">
          <div className="col-span-1 py-12 md:max-w-[calc(theme(screens.xl)/2)] md:pl-12 lg:pl-24">
            <Trans i18nKey={"welcome screen"} ns="pagePartnership" />
          </div>
          <div className="col-span-1 md:relative self-stretch mb-12 md:mb-0 md:order-first bg-primary-400">
            <img
              className="w-full mx-auto max-w-[500px] md:max-w-none md:absolute md:left-0 md:top-0 md:h-full md:object-contain"
              src={dealImg}
              alt="Two people shaking hands"
            />
          </div>
        </Container>
      </section>
      <section className="py-12 pb-20 bg-[#222222] text-white">
        <Container className="mx-auto max-w-screen-xl">
          <h2 className="text-center text-h1 mb-16">
            {t("partnership advantages.title", { ns: "pagePartnership" })}
          </h2>
          <ul className="p-0 m-0 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <li className="p-0 before:hidden col-span-1 flex flex-col items-center text-center">
              <Icon
                id={IconId.LampGear}
                width="48"
                className="shrink-0 grow-0 mb-8"
                fill="white"
              />
              <p className="m-0 text-body-lg font-bold text-primary-400">
                {t("partnership advantages.items.technology.title", {
                  ns: "pagePartnership",
                })}
              </p>
              <p className="text-gray-300">
                {t("partnership advantages.items.technology.description", {
                  ns: "pagePartnership",
                })}
              </p>
            </li>
            <li className="p-0 before:hidden col-span-1 flex flex-col items-center text-center">
              <Icon
                id={IconId.Globe}
                width="48"
                className="shrink-0 grow-0 mb-8"
                fill="white"
              />
              <p className="m-0 text-body-lg font-bold text-primary-400">
                {t("partnership advantages.items.audience.title", {
                  ns: "pagePartnership",
                })}
              </p>
              <p className="text-gray-300">
                {t("partnership advantages.items.audience.description", {
                  ns: "pagePartnership",
                })}
              </p>
            </li>
            <li className="p-0 before:hidden col-span-1 flex flex-col items-center text-center">
              <Icon
                id={IconId.Chart}
                width="48"
                className="shrink-0 grow-0 mb-8"
                fill="white"
              />
              <p className="m-0 text-body-lg font-bold text-primary-400">
                {t("partnership advantages.items.growth.title", {
                  ns: "pagePartnership",
                })}
              </p>
              <p className="text-gray-300">
                {t("partnership advantages.items.growth.description", {
                  ns: "pagePartnership",
                })}
              </p>
            </li>
            <li className="p-0 before:hidden col-span-1 flex flex-col items-center text-center">
              <Icon
                id={IconId.HandGear}
                width="48"
                className="shrink-0 grow-0 mb-8"
                fill="white"
              />
              <p className="m-0 text-body-lg font-bold text-primary-400">
                {t("partnership advantages.items.support.title", {
                  ns: "pagePartnership",
                })}
              </p>
              <p className="text-gray-300">
                {t("partnership advantages.items.support.description", {
                  ns: "pagePartnership",
                })}
              </p>
            </li>
          </ul>
        </Container>
      </section>
      <section>
        <Container className="md:grid md:grid-cols-2 md:mx-auto md:max-w-none md:min-h-[700px] md:items-center max-w-screen-sm md:pr-0 lg:pr-0 xl:pr-0 bg-gray-100 dark:bg-black">
          <div className="col-span-1 py-12 md:max-w-[calc(theme(screens.xl)/2)] md:pr-12 lg:pr-24 justify-self-end">
            <Trans i18nKey={"partnership types"} ns="pagePartnership" />
          </div>
          <div className="col-span-1 md:relative self-stretch mb-12 md:mb-0 bg-primary-400">
            <img
              className="w-full mx-auto max-w-[500px] md:max-w-none md:absolute md:left-0 md:top-0 md:h-full md:object-contain"
              src={productiveImg}
              alt="Productive employee"
            />
          </div>
        </Container>
      </section>
      <section className="py-12 mb-20 border-t-[1px] border-white dark:border-gray-700">
        <Container className="md:grid md:grid-cols-2 md:gap-16 md:mx-auto md:max-w-screen-xl md:items-center max-w-screen-sm">
          <div className="col-span-1 mb-12 md:mb-0">
            <img
              className="w-full mx-auto max-w-[500px] md:max-w-none"
              src={startupImg}
              alt="Man riding unicorn"
            />
          </div>
          <div className="col-span-1">
            <Trans i18nKey={"offers"} ns="pagePartnership" />
          </div>
        </Container>
      </section>
    </>
  );
};

export default InvestorRaltions;
