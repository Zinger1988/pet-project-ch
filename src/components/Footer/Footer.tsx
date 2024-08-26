import { Link } from "react-router-dom";
import { IconId } from "../../types/enums";
import { Container, Icon } from "..";

const Footer = () => {
  const headingStyles = "uppercase font-black mb-7 pb-5 relative";
  const headingAfterStyles =
    "after:absolute after:left-0 after:bottom-0 after:w-7 after:h-1 after:bg-yellow-400 after:rounded-lg";

  const conactsListItemStyles = "flex items-center gap-4 mb-3 text-sm";
  const listItemStyles = "mb-3 text-sm";
  const linkStyles = "transition-colors hover:text-yellow-400 duration-300 font-semibold";

  return (
    <footer className="bg-black text-gray-300 py-12 lg:py-20">
      <Container className="grid grid-cols-[min-content] justify-center sm:grid-cols-2 md:grid-cols-3 gap-12  max-w-[1400px]">
        <Link to="/" className="sm:col-span-2 md:col-span-1">
          <img src="/logo_text_white.svg" alt="Talktube logo" className="w-36 lg:w-40" />
        </Link>

        <section>
          <h3 className={`${headingStyles} ${headingAfterStyles}`}>Contact Us</h3>
          <ul>
            <li className={conactsListItemStyles}>
              <Icon id={IconId.Call} width="20" className="fill-yellow-400" />
              <a href="tel:+1987654321" className={linkStyles}>
                +198 765 43 21
              </a>
            </li>
            <li className={conactsListItemStyles}>
              <Icon id={IconId.Message} width="20" className="fill-yellow-400" />
              <a href="mailto:support@talktube.com" className={linkStyles}>
                support@talktube.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h3 className={`${headingStyles} ${headingAfterStyles}`}>Talktube.com</h3>
          <ul>
            <li className={listItemStyles}>
              <Link to="/about" className={linkStyles}>
                About Us
              </Link>
            </li>
            <li className={listItemStyles}>
              <Link to="/contact" className={linkStyles}>
                Contact
              </Link>
            </li>
            <li className={listItemStyles}>
              <Link to="/support" className={linkStyles}>
                Support
              </Link>
            </li>
            <li className={listItemStyles}>
              <Link to="/faq" className={linkStyles}>
                FAQ
              </Link>
            </li>
          </ul>
        </section>
      </Container>
    </footer>
  );
};

export default Footer;
