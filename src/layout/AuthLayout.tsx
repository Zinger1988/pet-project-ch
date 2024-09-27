import { Outlet } from "react-router-dom";

import { Container, Footer, Header, Sidebar } from "../components";

const AuthLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-grow pt-20 lg:pt-28">
        <Container className="grid grid-cols-[20rem,1fr] max-w-screen-xl items-start gap-12 mb-16">
          <Sidebar className="col-span-1 self-start sticky top-28" />
          <div className="col-span-1 py-8 px-12 bg-gray-100 dark:bg-gray-700 rounded-3xl h-full min-h-[400px] relative">
            <Outlet />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
