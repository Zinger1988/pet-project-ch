import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from "./store/index";

import AppLayout from "./layout/AppLayout";
import { Search, Login, Profile, Home, About, Support, Contact, FAQ } from "../src/pages";

import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.yourStateSlice.data);
  const loading = useSelector((state: RootState) => state.yourStateSlice.loading);
  const error = useSelector((state: RootState) => state.yourStateSlice.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(data, "data");
  return (
    <div className="App min-h-[100dvh] flex flex-col">
      {/* Define routes */}
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="support" element={<Support />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
