import { Trans, useTranslation } from 'react-i18next';
import { Container } from '../components';

import bannerImg from '../assets/images/about_us_banner.svg';
import talktubeTeam1 from '../assets/images/jobs/coding.jpg';
import talktubeTeam2 from '../assets/images/jobs/hall.jpg';
import talktubeTeam3 from '../assets/images/jobs/coffee_break.jpg';
import talktubeTeam4 from '../assets/images/jobs/just_rest.jpg';
import talktubeTeam5 from '../assets/images/jobs/noticing_smt_important.jpg';
import talktubeTeam6 from '../assets/images/jobs/office_work.jpg';
import talktubeTeam7 from '../assets/images/jobs/playing_guitar.jpg';

const About = () => {
  const { t } = useTranslation();

  const companyFeatures = [
    {
      emojis: '🗣 💛‍ 🌍',
      title: t('mission.title', { ns: 'pageAbout' }),
      description: t('mission.description', { ns: 'pageAbout' }),
    },
    {
      emojis: '👩🏾‍ 💻 👨🏽 ‍👩🏻 🎨 👨🏿',
      title: t('people.title', { ns: 'pageAbout' }),
      description: t('people.description', { ns: 'pageAbout' }),
    },
    {
      emojis: '🔎 🛠️ 💻',
      title: t('culture.title', { ns: 'pageAbout' }),
      description: t('culture.description', { ns: 'pageAbout' }),
    },
    {
      emojis: '🏖 ⚕ ️️👶🏾 🖥',
      title: t('benefits.title', { ns: 'pageAbout' }),
      description: t('benefits.description', { ns: 'pageAbout' }),
    },
    {
      emojis: '🌲 🏡 🌴 ✈️',
      title: t('work from anywhere.title', { ns: 'pageAbout' }),
      description: t('work from anywhere.description', { ns: 'pageAbout' }),
    },
    {
      emojis: '💎 🙌',
      title: t('just getting started.title', { ns: 'pageAbout' }),
      description: t('just getting started.description', { ns: 'pageAbout' }),
    },
  ];

  return (
    <div className='mb-15'>
      <section className='text-body-lg bg-black py-12 text-gray-400 sm:py-20'>
        <Container className='mx-auto max-w-screen-lg'>
          <img className='mb-6 block w-full sm:mb-16' src={bannerImg} alt='We are small but amazing team' />
          <Trans i18nKey='about description' ns='pageAbout' />
        </Container>
      </section>
      <section className='bg-primary-400 py-12 dark:bg-primary-900/30 sm:py-20'>
        <Container className='mx-auto max-w-screen-lg'>
          <h2 className='text-h1 mt-0'>{t('Talktube is', { ns: 'pageAbout' })}</h2>
          <div className='text-body-lg grid gap-12 md:grid-cols-3'>
            {companyFeatures.map((item) => (
              <article key={item.title} className='transition-transform duration-300 hover:scale-105 md:col-span-1'>
                <div className='mb-2'>{item.emojis}</div>
                <h3 className='mb-2 mt-0'>{item.title}</h3>
                <p className='my-0'>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className='py-12 sm:py-20'>
        <Container className='mx-auto max-w-screen-lg'>
          <h2 className='text-h1 mt-0'>{t('Aaand, here we are!', { ns: 'pageAbout' })}</h2>
          <div className='mt-12 grid w-full grid-cols-1 place-items-center gap-6 md:grid-cols-12'>
            <img
              className='col-span-4 h-auto w-full cursor-pointer rounded-3xl object-cover transition-[all] duration-500 hover:rotate-[2deg] hover:scale-[1.03] hover:shadow-xl md:h-80'
              src={talktubeTeam1}
              alt='the talktube team'
            />
            <img
              className='col-span-4 h-auto w-full cursor-pointer rounded-3xl object-cover transition-[all] duration-500 hover:rotate-[-2deg] hover:scale-[1.03] hover:shadow-xl md:h-80'
              src={talktubeTeam2}
              alt='the talktube team'
            />
            <img
              className='col-span-4 h-auto w-full cursor-pointer rounded-3xl object-cover transition-[all] duration-500 hover:rotate-[2deg] hover:scale-[1.03] hover:shadow-xl md:h-80'
              src={talktubeTeam3}
              alt='the talktube team'
            />
            <img
              className='col-span-12 hidden h-auto w-full cursor-pointer rounded-3xl object-cover transition-[all] duration-500 hover:rotate-[-2deg] hover:scale-[1.03] hover:shadow-xl md:block md:h-80'
              src={talktubeTeam4}
              alt='the talktube team'
            />
            <img
              className='col-span-4 h-auto w-full cursor-pointer rounded-3xl object-cover transition-[all] duration-500 hover:rotate-[2deg] hover:scale-[1.03] hover:shadow-xl md:h-96'
              src={talktubeTeam5}
              alt='the talktube team'
            />
            <img
              className='col-span-4 h-auto w-full cursor-pointer rounded-3xl object-cover transition-[all] duration-500 hover:rotate-[-2deg] hover:scale-[1.03] hover:shadow-xl md:h-96'
              src={talktubeTeam6}
              alt='the talktube team'
            />
            <img
              className='col-span-4 h-auto w-full cursor-pointer rounded-3xl object-cover transition-[all] duration-500 hover:rotate-[2deg] hover:scale-[1.03] hover:shadow-xl md:h-96'
              src={talktubeTeam7}
              alt='the talktube team'
            />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
