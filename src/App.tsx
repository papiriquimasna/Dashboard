import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeRouter from './features/Home/ui/HomeRouter';
import GlobalVotes from './features/Votes/ui/GlobalVotes';
import VoteDigital from './features/votedigital/ui/VoteDigital';
import PresidenteVote from './features/votedigital/views/PresidenteVote';
import AlcaldeVote from './features/votedigital/views/AlcaldeVote';
import Settings from './features/Settings/ui/Settings';
import Login from './features/Auth/ui/Login';
import AdministratePreAl from './features/Administracion/ui/AdministratePreAl';
import Help from './features/Help/ui/Help';
import Users from './features/Users/ui/Users';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(auth === 'true');
    };

    checkAuth();
    setLoading(false);

    // Escuchar cambios en localStorage
    window.addEventListener('storage', checkAuth);
    
    // Escuchar evento personalizado para cambios en la misma pestaña
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <HeroUIProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <div className="flex min-h-screen bg-white">
                    <Sidebar />
                    <div className="flex-1">
                      <Header />
                      <Routes>
                        <Route path="/" element={<HomeRouter />} />
                        <Route path="/votaciones" element={<GlobalVotes />} />
                        <Route path="/voto-digital" element={<VoteDigital />} />
                        <Route path="/voto-digital/presidente" element={<PresidenteVote />} />
                        <Route path="/voto-digital/alcalde" element={<AlcaldeVote />} />
                        <Route path="/ajustes" element={<Settings />} />
                        <Route path="/Administracion" element={<AdministratePreAl />} />
                        <Route path="/cuentas" element={<Users />} />
                        <Route path="/ayuda" element={<Help />} />
                      </Routes>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </HeroUIProvider>
  );
}

export default App;
