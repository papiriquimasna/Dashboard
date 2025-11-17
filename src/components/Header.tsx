import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import SwitchTheme from './switch/SwitchTheme';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const formattedTime = currentTime.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Inicio';
      case '/votaciones':
        return 'Votaciones';
      case '/voto-digital':
        return 'Voto Digital';
      case '/pedidos':
        return 'Pedidos';
      case '/menu':
        return 'Gestionar Menú';
      case '/ajustes':
        return 'Ajustes';
      case '/pagos':
        return 'Pagos';
      case '/cuentas':
        return 'Cuentas';
      case '/ayuda':
        return 'Ayuda';
      default:
        return 'Inicio';
    }
  };

  return (
    <header className="py-6 px-8 flex justify-between items-center border-b border-slate-200">
      <h1 className="text-2xl font-medium text-slate-800">{getPageTitle()}</h1>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="text-sm font-medium text-slate-800">{formattedTime}</div>
          <div className="text-xs text-slate-500 capitalize">{formattedDate}</div>
        </div>
        <SwitchTheme />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Cerrar sesión"
        >
          <LogOut className="w-4 h-4" />
          <span>Salir</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
