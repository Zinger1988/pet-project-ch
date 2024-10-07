import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import { Outlet } from "react-router-dom";

import { Container, Footer, Header, Sidebar } from "../components";

AgoraRTC.setLogLevel(3);
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const AuthLayout: React.FC = () => {
  return (
    <AgoraRTCProvider client={client}>
      <Header />
      <main className="flex-grow pt-20 lg:pt-28">
        <Container className="md:grid md:grid-cols-[14rem,1fr] lg:grid-cols-[20rem,1fr] max-w-screen-xl items-start gap-6 lg:gap-12 mb-16">
          <Sidebar className="hidden md:block col-span-1 self-start sticky top-20 lg:top-28" />
          <div className="col-span-1 p-4 lg:p-8 bg-gray-100 dark:bg-gray-700 rounded-[1.3rem] lg:rounded-3xl h-full min-h-[19rem] lg:min-h-[24rem] relative">
            <Outlet />
          </div>
        </Container>
      </main>
      <Footer />
    </AgoraRTCProvider>
  );
};

export default AuthLayout;
