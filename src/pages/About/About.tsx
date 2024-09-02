import { Trans, useTranslation } from "react-i18next";
import { Container } from "../../components";

import bannerImg from "../../assets/images/about_us_banner.svg";
import talktubeTeam1 from "../../assets/images/jobs/coding.jpg";
import talktubeTeam2 from "../../assets/images/jobs/hall.jpg";
import talktubeTeam3 from "../../assets/images/jobs/coffee_break.jpg";
import talktubeTeam4 from "../../assets/images/jobs/just_rest.jpg";
import talktubeTeam5 from "../../assets/images/jobs/noticing_smt_important.jpg";
import talktubeTeam6 from "../../assets/images/jobs/office_work.jpg";
import talktubeTeam7 from "../../assets/images/jobs/playing_guitar.jpg";

const About = () => {
  const { t } = useTranslation();

  const companyFeatures = [
    {
      emojis: "🗣 💛‍ 🌍",
      title: t("mission.title", { ns: "pageAbout" }),
      description: t("mission.description", { ns: "pageAbout" }),
    },
    {
      emojis: "👩🏾‍ 💻 👨🏽 ‍👩🏻 🎨 👨🏿",
      title: t("people.title", { ns: "pageAbout" }),
      description: t("people.description", { ns: "pageAbout" }),
    },
    {
      emojis: "🔎 🛠️ 💻",
      title: t("culture.title", { ns: "pageAbout" }),
      description: t("culture.description", { ns: "pageAbout" }),
    },
    {
      emojis: "🏖 ⚕ ️️👶🏾 🖥",
      title: t("benefits.title", { ns: "pageAbout" }),
      description: t("benefits.description", { ns: "pageAbout" }),
    },
    {
      emojis: "🌲 🏡 🌴 ✈️",
      title: t("work from anywhere.title", { ns: "pageAbout" }),
      description: t("work from anywhere.description", { ns: "pageAbout" }),
    },
    {
      emojis: "💎 🙌",
      title: t("just getting started.title", { ns: "pageAbout" }),
      description: t("just getting started.description", { ns: "pageAbout" }),
    },
  ];

  return (
    <div className="mb-15">
      <section className="bg-black py-12 sm:py-20 text-gray-400 text-body-lg">
        <Container className="max-w-screen-lg mx-auto">
          <img
            className="block w-full mb-6 sm:mb-16"
            src={bannerImg}
            alt="We are small but amazing team"
          />
          <Trans i18nKey="about description" ns="pageAbout" />
        </Container>
      </section>
      <section className="bg-primary-400 dark:bg-primary-900/30 py-12 sm:py-20">
        <Container className="max-w-screen-lg mx-auto">
          <h2 className="text-h1 mt-0">{t("Talktube is", { ns: "pageAbout" })}</h2>
          <div className="grid gap-12 md:grid-cols-3  text-body-lg">
            {companyFeatures.map((item) => (
              <article
                key={item.title}
                className="md:col-span-1 hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-2">{item.emojis}</div>
                <h3 className="mt-0 mb-2">{item.title}</h3>
                <p className="my-0">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-12 sm:py-20">
        <Container className="max-w-screen-lg mx-auto">
          <h2 className="text-h1 mt-0">
            {t("Aaand, here we are!", { ns: "pageAbout" })}
          </h2>
          <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 place-items-center">
            <img
              className="col-span-4 object-cover w-full h-auto md:h-80 rounded-3xl transition-[all] duration-500 hover:shadow-xl cursor-pointer hover:scale-[1.03] hover:rotate-[2deg]"
              src={talktubeTeam1}
              alt="the talktube team"
            />
            <img
              className="col-span-4 object-cover w-full h-auto md:h-80 rounded-3xl transition-[all] duration-500 hover:shadow-xl cursor-pointer hover:scale-[1.03] hover:rotate-[-2deg]"
              src={talktubeTeam2}
              alt="the talktube team"
            />
            <img
              className="col-span-4 object-cover w-full h-auto md:h-80 rounded-3xl transition-[all] duration-500 hover:shadow-xl cursor-pointer hover:scale-[1.03] hover:rotate-[2deg]"
              src={talktubeTeam3}
              alt="the talktube team"
            />
            <img
              className="col-span-12 object-cover w-full h-auto md:h-80 rounded-3xl hidden md:block transition-[all] duration-500 hover:shadow-xl cursor-pointer hover:scale-[1.03] hover:rotate-[-2deg]"
              src={talktubeTeam4}
              alt="the talktube team"
            />
            <img
              className="col-span-4 object-cover w-full h-auto md:h-96 rounded-3xl transition-[all] duration-500 hover:shadow-xl cursor-pointer hover:scale-[1.03] hover:rotate-[2deg]"
              src={talktubeTeam5}
              alt="the talktube team"
            />
            <img
              className="col-span-4 object-cover w-full h-auto md:h-96 rounded-3xl transition-[all] duration-500 hover:shadow-xl cursor-pointer hover:scale-[1.03] hover:rotate-[-2deg]"
              src={talktubeTeam6}
              alt="the talktube team"
            />
            <img
              className="col-span-4 object-cover w-full h-auto md:h-96 rounded-3xl transition-[all] duration-500 hover:shadow-xl cursor-pointer hover:scale-[1.03] hover:rotate-[2deg]"
              src={talktubeTeam7}
              alt="the talktube team"
            />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
