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
  return (
    <div className="mb-15">
      <section className="bg-black py-12 sm:py-20 text-gray-400 text-body-lg">
        <Container className="max-w-screen-lg mx-auto">
          <img
            className="block w-full mb-6 sm:mb-16"
            src={bannerImg}
            alt="We are small but amazing team"
          />
          <p className="max-w-3xl">
            talktube is a place where you can hang out with friends, meet new ones, and
            talk about anything. It's like an always-on dinner party.
          </p>
          <p className="max-w-3xl">
            Built by a small, scrappy team of experienced builders with a strong
            background in consumer products with a relentless focus on our product and the
            community.
          </p>
        </Container>
      </section>
      <section className="bg-primary-400 dark:bg-primary-900/30 py-12 sm:py-20">
        <Container className="max-w-screen-lg mx-auto">
          <h2 className="text-h1 mt-0">Talktube is:</h2>
          <div className="grid gap-12 md:grid-cols-3  text-body-lg">
            <article className="md:col-span-1 hover:scale-105 transition-transform duration-300">
              <div className="mb-2">🗣 💛‍ 🌍</div>
              <h3 className="mt-0 mb-2">huge, positive mission</h3>
              <p className="my-0">
                Our mission is to increase friendship in the world. We believe that good
                friendships are the foundation of everything, and we built talktube to
                make it easier to fill your life with them. We believe nothing does more
                for our happiness than having good friends.
              </p>
            </article>
            <article className="md:col-span-1 hover:scale-105 transition-transform duration-300">
              <div className="mb-2">👩🏾‍ 💻 👨🏽 ‍👩🏻 🎨 👨🏿</div>
              <h3 className="mt-0 mb-2">the people</h3>
              <p className="my-0">
                You’ll be surrounded each day with scrappy, brilliant and ambitious
                teammates who are excited to roll up their sleeves and learn from each
                other. Best teammates ever!
              </p>
            </article>
            <article className="md:col-span-1 hover:scale-105 transition-transform duration-300">
              <div className="mb-2">🔎 🛠️ 💻</div>
              <h3 className="mt-0 mb-2">the culture</h3>
              <p className="my-0">
                As a team we move quickly, we ship fast and get a lot done. We do this not
                by taking on everything, but by hiring an incredible team, focusing on the
                things that matter, and ignoring things that don’t. We are efficient,
                meeting-light, and relentlessly focused on building.
              </p>
            </article>
            <article className="md:col-span-1 hover:scale-105 transition-transform duration-300">
              <div className="mb-2">🏖 ⚕ ️️👶🏾 🖥</div>
              <h3 className="mt-0 mb-2">benefits and perks</h3>
              <p className="my-0">
                From flexible vacation, great healthcare and family leave benefits,
                amazing team events and a generous work from home stipend to help you do
                your best work.
              </p>
            </article>
            <article className="md:col-span-1 hover:scale-105 transition-transform duration-300">
              <div className="mb-2">🌲 🏡 🌴 ✈️</div>
              <h3 className="mt-0 mb-2">work from anywhere</h3>
              <p className="my-0">
                We work as a distributed team and hire people from all over the U.S. but
                we value in-person time too! Every quarter, we fly the whole company to
                our office in San Francisco so we can whiteboard, catch up, meet all the
                new faces, and enjoy quality time together.
              </p>
            </article>
            <article className="md:col-span-1 hover:scale-105 transition-transform duration-300">
              <div className="mb-2">💎 🙌</div>
              <h3 className="mt-0 mb-2">just getting started</h3>
              <p className="my-0">
                Since launching in 2020 we’ve gone from Seed to Series A, B and C – backed
                by an amazing and diverse group, including Andreessen Horowitz, Tiger
                Global, DST Global and many of the top angel investors in the world. We
                are well resourced and aim to build something that touches the whole
                world. Big dreams over here!
              </p>
            </article>
          </div>
        </Container>
      </section>
      <section className="py-12 sm:py-20">
        <Container className="max-w-screen-lg mx-auto">
          <h2 className="text-h1 mt-0">Aaand, here we are!</h2>
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
