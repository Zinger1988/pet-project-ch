import { Trans, useTranslation } from 'react-i18next';
import { Button, Container, Icon } from '../components';

import conferenceCallImg from '../assets/images/conference_call.svg';
import startupImg from '../assets/images/woman_led_startup_company.svg';
import strategyImg from '../assets/images/strategy.svg';
import successImg from '../assets/images/success.svg';

import { IconId } from '../types/enums';

const InvestorRaltions = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className='py-12'>
        <Container className='max-w-screen-sm md:mx-auto md:grid md:max-w-screen-xl md:grid-cols-2 md:items-center md:gap-16'>
          <div className='col-span-1 mb-12 md:mb-0'>
            <Trans
              i18nKey={'welcome screen'}
              ns='pageInvestors'
              components={{
                heading: <h1 className='mt-0' />,
              }}
            />
          </div>
          <div className='col-span-1'>
            <img className='mx-auto w-full max-w-[500px] md:max-w-none' src={conferenceCallImg} alt='Conference Call' />
          </div>
        </Container>
      </section>
      <section className='bg-[#222222] py-12 pb-20 text-white'>
        <Container className='mx-auto max-w-screen-xl'>
          <h2 className='text-center'>{t('reports.title', { ns: 'pageInvestors' })}</h2>
          <p className='mb-8 text-center'>{t('reports.description', { ns: 'pageInvestors' })}</p>
          <ul className='m-0 grid gap-4 p-0 md:grid-cols-2 lg:grid-cols-4'>
            <li className='col-span-1 p-0 before:hidden'>
              <a
                href='#fake'
                className='flex h-full items-center gap-3 rounded-3xl border-2 border-primary-400 p-5 text-inherit no-underline transition-colors hover:text-white'
              >
                <Icon id={IconId.Document} width='32' className='shrink-0 grow-0' fill='white' />
                <p className='text-body-sm m-0'>
                  <b>{t('reports.downloads.2024Q2', { ns: 'pageInvestors' })}</b>
                </p>
              </a>
            </li>
            <li className='col-span-1 p-0 before:hidden'>
              <a
                href='#fake'
                className='flex h-full items-center gap-3 rounded-3xl border-2 border-primary-400 p-5 text-inherit no-underline transition-colors hover:text-white'
              >
                <Icon id={IconId.Document} width='32' className='shrink-0 grow-0' fill='white' />
                <p className='text-body-sm m-0'>
                  <b>{t('reports.downloads.2023', { ns: 'pageInvestors' })}</b>
                </p>
              </a>
            </li>
            <li className='col-span-1 p-0 before:hidden'>
              <a
                href='#fake'
                className='flex h-full items-center gap-3 rounded-3xl border-2 border-primary-400 p-5 text-inherit no-underline transition-colors hover:text-white'
              >
                <Icon id={IconId.Document} width='32' className='shrink-0 grow-0' fill='white' />
                <p className='text-body-sm m-0'>
                  <b>{t('reports.downloads.2023Q4', { ns: 'pageInvestors' })}</b>
                </p>
              </a>
            </li>
            <li className='col-span-1 p-0 before:hidden'>
              <a
                href='#fake'
                className='flex h-full items-center gap-3 rounded-3xl border-2 border-primary-400 p-5 text-inherit no-underline transition-colors hover:text-white'
              >
                <Icon id={IconId.Document} width='32' className='shrink-0 grow-0' fill='white' />
                <p className='text-body-sm m-0'>
                  <b>{t('reports.downloads.2022', { ns: 'pageInvestors' })}</b>
                </p>
              </a>
            </li>
          </ul>
        </Container>
      </section>
      <section className='border-b border-dotted border-[#333333] py-12'>
        <Container className='max-w-screen-sm md:mx-auto md:grid md:max-w-screen-xl md:grid-cols-2 md:items-center md:gap-16'>
          <div className='col-span-1 mb-12 md:mb-0'>
            <img
              className='mx-auto w-full max-w-[500px] md:max-w-none'
              src={startupImg}
              alt='Woman led startup company'
            />
          </div>
          <div className='col-span-1'>
            <Trans
              i18nKey={'governance'}
              ns='pageInvestors'
              components={{
                guidelines: <a href='#' />,
                conduct: <a href='#' />,
                audit: <a href='#' />,
              }}
            />
          </div>
        </Container>
      </section>
      <section className='border-b-[1px] border-white py-12 dark:border-gray-700'>
        <Container className='max-w-screen-sm md:mx-auto md:grid md:max-w-screen-xl md:grid-cols-2 md:items-center md:gap-16'>
          <div className='col-span-1 mb-12 md:mb-0'>
            <Trans
              i18nKey={'stock'}
              ns='pageInvestors'
              components={{
                stock: <a href='#' />,
                historical: <a href='#' />,
                dividend: <a href='#' />,
              }}
            />
          </div>
          <div className='col-span-1'>
            <img
              className='mx-auto w-full max-w-[500px] md:max-w-none'
              src={strategyImg}
              alt='Business strategy development'
            />
          </div>
        </Container>
      </section>
      <section>
        <Container className='max-w-screen-sm bg-gray-100 dark:bg-black md:mx-auto md:grid md:min-h-[700px] md:max-w-none md:grid-cols-2 md:items-center md:pl-0 lg:pl-0 xl:pl-0'>
          <div className='col-span-1 py-12 md:max-w-[calc(theme(screens.xl)/2)] md:pl-12 lg:pl-24'>
            <Trans
              i18nKey={'contact'}
              ns='pageInvestors'
              components={{
                p: <p className='mb-8' />,
              }}
            />
            <div className='mb-8 flex gap-6 self-center'>
              <Button
                variant='secondary'
                as='link'
                className='w-full sm:w-[12rem]'
                to='tel:+1987654321'
                icon={IconId.CallSolid}
              >
                {t('Call us', { ns: 'pageInvestors' })}
              </Button>
              <Button
                variant='secondary'
                as='link'
                className='w-full sm:w-[12rem]'
                to='mailto:support@talktube.com'
                icon={IconId.MessageSolid}
              >
                {t('Write us', { ns: 'pageInvestors' })}
              </Button>
            </div>
          </div>
          <div className='col-span-1 mb-12 self-stretch bg-primary-400 md:relative md:order-first md:mb-0'>
            <img
              className='mx-auto w-full max-w-[500px] md:absolute md:left-0 md:top-0 md:h-full md:max-w-none md:object-cover'
              src={successImg}
              alt='Happy partners with successfull project'
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default InvestorRaltions;
