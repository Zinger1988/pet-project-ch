import { Link } from "react-router-dom";

import { Container } from "../../components";
import { capitalizeFirstLetter } from "../../helpers/stringUtils";

function Header() {
  const menu = [
    { label: "home", url: "/" },
    { label: "search", url: "/search" },
    { label: "login", url: "/login" },
    { label: "user profile", url: "/profile" },
  ];

  return (
    <header className="py-6 border-b-[1px]">
      <Container className="flex items-center justify-between gap-6">
        <Link to="/">
          <img src="/logo.svg" alt="talktube logo" className="w-36" />
        </Link>

        <nav>
          <ul className="flex justify-center gap-12">
            {menu.map((item) => (
              <li key={item.label}>
                <Link to={item.url} className="font-bold">
                  {capitalizeFirstLetter(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
