import { Link } from "react-router-dom";

import { Container, Icon } from "..";

import { IconId } from "../../types/enums";

const Footer = () => {
  const headingStyles = "uppercase text-body mb-7 pb-5 relative";
  const headingAfterStyles =
    "after:absolute after:left-0 after:bottom-0 after:w-7 after:h-1 after:bg-yellow-400 after:rounded-lg";

  const listStyles = "m-0 p-0";
  const conactsListItemStyles = "flex items-center gap-4 mb-3 pl-0 text-sm before:hidden";
  const listItemStyles = "mb-3 pl-0 text-sm before:hidden";
  const linkStyles =
    "transition-colors hover:text-yellow-400 duration-300 font-semibold no-underline text-inherit";

  const socialsItems = [
    { iconId: IconId.Twitter, url: "https://x.com/" },
    { iconId: IconId.Instagram, url: "https://www.instagram.com/" },
  ];

  const contactsItems = [
    { iconId: IconId.Call, url: "tel:+1987654321", label: "+198 765 43 21" },
    {
      iconId: IconId.Message,
      url: "mailto:support@talktube.com",
      label: "support@talktube.com",
    },
  ];

  const menuItems = [
    { url: "/about", label: "About Us" },
    { url: "/contact", label: "Contact" },
    { url: "/support", label: "Support" },
    { url: "/faq", label: "FAQ" },
  ];

  const socialsItemsNodes = socialsItems.map((item) => (
    <a href={item.url} target="_blank" rel="noreferrer" key={item.url}>
      <Icon
        id={item.iconId}
        width="24"
        className="fill-white transiton-colors hover:fill-primary-400 duration-300"
      />
    </a>
  ));

  const contactItemsNodes = contactsItems.map((item) => (
    <li className={conactsListItemStyles} key={item.label}>
      <Icon id={item.iconId} width="20" className="fill-yellow-400" />
      <a href={item.url} className={linkStyles}>
        {item.label}
      </a>
    </li>
  ));

  const menuItemsNodes = menuItems.map((item) => (
    <li className={listItemStyles} key={item.label}>
      <Link to={item.url} className={linkStyles}>
        {item.label}
      </Link>
    </li>
  ));

  return (
    <footer className="bg-black text-gray-300 py-12 lg:py-20">
      <Container className="grid grid-cols-[min-content] justify-center sm:grid-cols-2 md:grid-cols-3 gap-12  max-w-screen-xl">
        <section className="sm:col-span-2 md:col-span-1">
          <Link to="/">
            <img
              src="/logo_text_white.svg"
              alt="Talktube logo"
              className="w-36 lg:w-40 mb-6"
            />
          </Link>
          <div className="flex gap-6">{socialsItemsNodes}</div>
        </section>

        <section>
          <h3 className={`${headingStyles} ${headingAfterStyles}`}>Contact Us</h3>
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
