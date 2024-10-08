import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { CookieBanner } from './components';
import { AuthStatus, ProtectedRoute } from './features/authentication';
import { AppLayout, AuthLayout } from './layout';
import DarkThemeContextProvider from './context/DarkThemeContext';
import './App.css';
import {
  Search,
  Login,
  Profile,
  Home,
  About,
  Support,
  Contact,
  FAQ,
  Terms,
  Policy,
  Registration,
  InvestorRaltions,
  Partnership,
  PasswordRecovery,
  Rooms,
  SystemStatusPage,
  CreateRoom,
  SingleRoom,
  Error404,
} from '../src/pages';

function App() {
  return (
    <div className='App flex min-h-[100dvh] flex-col'>
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          success: {
            className: 'bg-green-600 text-white',
          },
          error: {
            className: 'bg-red-600 text-white',
          },
          duration: 6000,
        }}
      />
      <AuthStatus />
      <DarkThemeContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <AuthLayout />
              </ProtectedRoute>
            }
          >
            <Route path='profile' element={<Profile />} />
            <Route path='rooms'>
              <Route index element={<Rooms />} />
              <Route path='explore' element={<Rooms />} />
              <Route path='create' element={<CreateRoom />} />
              <Route path=':id' element={<SingleRoom />} />
            </Route>
          </Route>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='search' element={<Search />} />
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
            <Route path='about' element={<About />} />
            <Route path='support' element={<Support />} />
            <Route path='contact' element={<Contact />} />
            <Route path='faq' element={<FAQ />} />
            <Route path='terms' element={<Terms />} />
            <Route path='policy' element={<Policy />} />
            <Route path='investor-relations' element={<InvestorRaltions />} />
            <Route path='partnership' element={<Partnership />} />
            <Route path='password-recovery' element={<PasswordRecovery />} />
            <Route path='system-status' element={<SystemStatusPage />} />
            <Route path='404' element={<Error404 />} />
            <Route path='*' element={<Error404 />} />
          </Route>
        </Routes>
      </DarkThemeContextProvider>
      <CookieBanner />
    </div>
  );
}

export default App;
