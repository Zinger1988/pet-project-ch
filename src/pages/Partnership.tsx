import { Trans, useTranslation } from 'react-i18next';
import { Container, Icon } from '../components';

import dealImg from '../assets/images/business_deal.svg';
import productiveImg from '../assets/images/work_being_productive.svg';
import startupImg from '../assets/images/business_startup.svg';

import { IconId } from '../types/enums';

const InvestorRaltions = () => {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <Container className='max-w-screen-sm bg-gray-100 dark:bg-black md:mx-auto md:grid md:min-h-[700px] md:max-w-none md:grid-cols-2 md:items-center md:pl-0 lg:pl-0 xl:pl-0'>
          <div className='col-span-1 py-12 md:max-w-[calc(theme(screens.xl)/2)] md:pl-12 lg:pl-24'>
            <Trans i18nKey={'welcome screen'} ns='pagePartnership' />
          </div>
          <div className='col-span-1 mb-12 self-stretch bg-primary-400 md:relative md:order-first md:mb-0'>
            <img
              className='mx-auto w-full max-w-[500px] md:absolute md:left-0 md:top-0 md:h-full md:max-w-none md:object-contain'
              src={dealImg}
              alt='Two people shaking hands'
            />
          </div>
        </Container>
      </section>
      <section className='bg-[#222222] py-12 pb-20 text-white'>
        <Container className='mx-auto max-w-screen-xl'>
          <h2 className='text-h1 mb-16 text-center'>{t('partnership advantages.title', { ns: 'pagePartnership' })}</h2>
          <ul className='m-0 grid gap-4 p-0 md:grid-cols-2 lg:grid-cols-4'>
            <li className='col-span-1 flex flex-col items-center p-0 text-center before:hidden'>
              <Icon id={IconId.LampGear} width='48' className='mb-8 shrink-0 grow-0' fill='white' />
              <p className='text-body-lg m-0 font-bold text-primary-400'>
                {t('partnership advantages.items.technology.title', {
                  ns: 'pagePartnership',
                })}
              </p>
              <p className='text-gray-300'>
                {t('partnership advantages.items.technology.description', {
                  ns: 'pagePartnership',
                })}
              </p>
            </li>
            <li className='col-span-1 flex flex-col items-center p-0 text-center before:hidden'>
              <Icon id={IconId.Globe} width='48' className='mb-8 shrink-0 grow-0' fill='white' />
              <p className='text-body-lg m-0 font-bold text-primary-400'>
                {t('partnership advantages.items.audience.title', {
                  ns: 'pagePartnership',
                })}
              </p>
              <p className='text-gray-300'>
                {t('partnership advantages.items.audience.description', {
                  ns: 'pagePartnership',
                })}
              </p>
            </li>
            <li className='col-span-1 flex flex-col items-center p-0 text-center before:hidden'>
              <Icon id={IconId.Chart} width='48' className='mb-8 shrink-0 grow-0' fill='white' />
              <p className='text-body-lg m-0 font-bold text-primary-400'>
                {t('partnership advantages.items.growth.title', {
                  ns: 'pagePartnership',
                })}
              </p>
              <p className='text-gray-300'>
                {t('partnership advantages.items.growth.description', {
                  ns: 'pagePartnership',
                })}
              </p>
            </li>
            <li className='col-span-1 flex flex-col items-center p-0 text-center before:hidden'>
              <Icon id={IconId.HandGear} width='48' className='mb-8 shrink-0 grow-0' fill='white' />
              <p className='text-body-lg m-0 font-bold text-primary-400'>
                {t('partnership advantages.items.support.title', {
                  ns: 'pagePartnership',
                })}
              </p>
              <p className='text-gray-300'>
                {t('partnership advantages.items.support.description', {
                  ns: 'pagePartnership',
                })}
              </p>
            </li>
          </ul>
        </Container>
      </section>
      <section>
        <Container className='max-w-screen-sm bg-gray-100 dark:bg-black md:mx-auto md:grid md:min-h-[700px] md:max-w-none md:grid-cols-2 md:items-center md:pr-0 lg:pr-0 xl:pr-0'>
          <div className='col-span-1 justify-self-end py-12 md:max-w-[calc(theme(screens.xl)/2)] md:pr-12 lg:pr-24'>
            <Trans i18nKey={'partnership types'} ns='pagePartnership' />
          </div>
          <div className='col-span-1 mb-12 self-stretch bg-primary-400 md:relative md:mb-0'>
            <img
              className='mx-auto w-full max-w-[500px] md:absolute md:left-0 md:top-0 md:h-full md:max-w-none md:object-contain'
              src={productiveImg}
              alt='Productive employee'
            />
          </div>
        </Container>
      </section>
      <section className='mb-20 border-t-[1px] border-white py-12 dark:border-gray-700'>
        <Container className='max-w-screen-sm md:mx-auto md:grid md:max-w-screen-xl md:grid-cols-2 md:items-center md:gap-16'>
          <div className='col-span-1 mb-12 md:mb-0'>
            <img className='mx-auto w-full max-w-[500px] md:max-w-none' src={startupImg} alt='Man riding unicorn' />
          </div>
          <div className='col-span-1'>
            <Trans i18nKey={'offers'} ns='pagePartnership' />
          </div>
        </Container>
      </section>
    </>
  );
};

export default InvestorRaltions;
