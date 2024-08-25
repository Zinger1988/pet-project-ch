import { Outlet } from "react-router-dom";

import { Header } from "../components";

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
