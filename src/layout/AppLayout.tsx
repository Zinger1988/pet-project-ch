import { Outlet } from "react-router-dom";

import { Footer, Header } from "../components";

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
