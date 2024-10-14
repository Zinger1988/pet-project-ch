import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container, Icon } from '../components';

import { IconId } from '../types/enums';

const Footer = () => {
  const { t } = useTranslation();
  const footerStyles = 'bg-black border-t-[1px] border-black dark:border-gray-700 text-gray-300 py-12 lg:py-20';
  const footerContainerStyles = `grid grid-cols-[min-content] justify-center sm:grid-cols-2 md:grid-cols-3 gap-12  max-w-screen-xl`;
  const headingStyles = 'uppercase text-body mb-7 pb-5 relative';
  const headingAfterStyles = `after:absolute after:left-0 after:bottom-0 after:w-7 after:h-1 after:bg-yellow-400 after:rounded-lg`;
  const listStyles = 'm-0 p-0';
  const conactsListItemStyles = 'flex items-center gap-4 mb-3 pl-0 text-sm before:hidden';
  const listItemStyles = 'mb-3 pl-0 text-sm before:hidden';
  const linkStyles = 'transition-colors hover:text-yellow-400 duration-300 font-semibold no-underline text-inherit';
  const socialsSectionStyles = 'sm:col-span-2 md:col-span-1';
  const socialsContainerStyles = 'flex gap-6';
  const socialsIconsStyles = 'transiton-colors fill-white duration-300 hover:fill-primary-400';
  const logoStyles = 'mb-6 w-36 lg:w-40';

  const footerItems = {
    socials: [
      { iconId: IconId.Twitter, url: 'https://x.com/' },
      { iconId: IconId.Instagram, url: 'https://www.instagram.com/' },
    ],
    contacts: [
      { iconId: IconId.Call, url: 'tel:+1987654321', label: '+198 765 43 21' },
      { iconId: IconId.Message, url: 'mailto:support@talktube.com', label: 'support@talktube.com' },
    ],
    menu: [
      { url: '/about', label: t('footer.about us') },
      { url: '/contact', label: t('footer.contact') },
      { url: '/support', label: t('footer.support') },
      { url: '/faq', label: t('footer.faq') },
    ],
  };

  const socialsItemsNodes = footerItems.socials.map((item) => (
    <a href={item.url} target='_blank' rel='noreferrer' key={item.url}>
      <Icon id={item.iconId} width='24' className={socialsIconsStyles} />
    </a>
  ));

  const contactItemsNodes = footerItems.contacts.map((item) => (
    <li className={conactsListItemStyles} key={item.label}>
      <Icon id={item.iconId} width='20' className='fill-yellow-400' />
      <a href={item.url} className={linkStyles}>
        {item.label}
      </a>
    </li>
  ));

  const menuItemsNodes = footerItems.menu.map((item) => (
    <li className={listItemStyles} key={item.label}>
      <Link to={item.url} className={linkStyles}>
        {item.label}
      </Link>
    </li>
  ));

  return (
    <footer className={footerStyles}>
      <Container className={footerContainerStyles}>
        <section className={socialsSectionStyles}>
          <Link to='/'>
            <img src='/logo_text_white.svg' alt='Talktube logo' className={logoStyles} />
          </Link>
          <div className={socialsContainerStyles}>{socialsItemsNodes}</div>
        </section>

        <section>
          <h3 className={`${headingStyles} ${headingAfterStyles}`}>{t('footer.contact us')}</h3>
          <ul className={listStyles}>{contactItemsNodes}</ul>
        </section>

        <section>
          <h3 className={`${headingStyles} ${headingAfterStyles}`}>Talktube.com</h3>
          <ul className={listStyles}>{menuItemsNodes}</ul>
        </section>
      </Container>
    </footer>
  );
};

export default Footer;
