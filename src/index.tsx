import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"; // Step 1: Import
import store from "./store/index";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./tailwind.output.css";
import "./i18n";

import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <AgoraRTCProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </AgoraRTCProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
