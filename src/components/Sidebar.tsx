import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, NotepadText, Map, Settings, SquareDashedKanban, User, HelpCircle } from 'lucide-react';
import { Avatar } from '@heroui/react';
import { NavItem } from '../types';
import { useUser } from '../context/UserContext';

// IMPORTAR LOGO CORRECTAMENTE
import LogoOnpe from '../assets/onpelogito.svg';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { userData } = useUser();
  
  const isAdmin = userData.rol === 'Administrador';

  // Menú para Administrador
  const adminMenuItems: NavItem[] = [
    { label: 'Inicio', icon: LayoutDashboard, path: '/' },
    { label: 'Votaciones', icon: Map, path: '/votaciones' },
    { label: 'Voto Digital', icon: NotepadText, path: '/voto-digital' },
  ];

  const adminOtherItems: NavItem[] = [
    { label: 'Ajustes', icon: Settings, path: '/ajustes' },
    { label: 'Administración', icon: SquareDashedKanban, path: '/Administracion' },
    { label: 'Usuarios', icon: User, path: '/cuentas' },
    { label: 'Ayuda', icon: HelpCircle, path: '/ayuda' },
  ];

  // Menú para Usuario
  const userMenuItems: NavItem[] = [
    { label: 'Inicio', icon: LayoutDashboard, path: '/' },
    { label: 'Voto Digital', icon: NotepadText, path: '/voto-digital' },
  ];

  const userOtherItems: NavItem[] = [
    { label: 'Ajustes', icon: Settings, path: '/ajustes' },
    { label: 'Ayuda', icon: HelpCircle, path: '/ayuda' },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;
  const otherItems = isAdmin ? adminOtherItems : userOtherItems;

  const NavLink: React.FC<{ item: NavItem }> = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link 
        to={item.path || '#'} 
        className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
          isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        <item.icon className="w-5 h-5 mr-4" />
        <span className="font-medium text-sm">{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-5 h-screen sticky top-0 hidden lg:flex flex-col">
      
      {/* LOGO CORREGIDO */}
      <div className="flex items-center justify-center mb-6">
        <img src={LogoOnpe} alt="ONPE Logo" className="h-20" />
      </div>

      {/* Perfil del usuario */}
      <Link to="/ajustes" className="flex flex-col items-center mb-6 pb-6 border-b border-slate-200 hover:bg-slate-50 rounded-lg p-3 transition-colors">
        <Avatar
          src={userData.foto}
          size="lg"
          name={`${userData.nombre} ${userData.apellido}`}
          className="w-16 h-16 mb-2"
        />
        <span className="font-semibold text-slate-800 text-sm text-center">
          {userData.nombre} {userData.apellido}
        </span>
        <span className="text-xs text-slate-500">{userData.rol}</span>
      </Link>
      
      <nav className="grow">
        <h3 className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">MENÚ</h3>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}><NavLink item={item} /></li>
          ))}
        </ul>

        <h3 className="text-slate-400 text-xs font-semibold tracking-widest uppercase mt-8 mb-4">OTROS</h3>
        <ul className="space-y-2">
          {otherItems.map((item) => (
            <li key={item.label}><NavLink item={item} /></li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
