import { Users, SquareDashedKanban, BarChart3, Vote, Map } from 'lucide-react';
import BannerImg from '../../../assets/Welcome.png';
import { useNavigate } from 'react-router-dom';
import VoteListCard from '../widgets/VoteListCard';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Banner */}
      <div className="flex justify-center">
        <div 
          className="w-250 h-80 flex justify-center items-center bg-cover bg-center relative"
          style={{ backgroundImage: `url(${BannerImg})` }}
        >
        </div>
      </div>

      {/* Contenido para Administrador */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Panel de Administración</h2>
          
          {/* Cards de acciones rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Gestionar Usuarios */}
            <button
              onClick={() => navigate('/cuentas')}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-700 transition-colors w-fit">
                  <Users className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Usuarios</h3>
                  <p className="text-sm text-slate-600">Gestionar usuarios del sistema</p>
                </div>
              </div>
            </button>

            {/* Administración */}
            <button
              onClick={() => navigate('/Administracion')}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-700 transition-colors w-fit">
                  <SquareDashedKanban className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Administración</h3>
                  <p className="text-sm text-slate-600">Gestionar datos CSV</p>
                </div>
              </div>
            </button>

            {/* Votaciones */}
            <button
              onClick={() => navigate('/votaciones')}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-700 transition-colors w-fit">
                  <Map className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Votaciones</h3>
                  <p className="text-sm text-slate-600">Ver resultados globales</p>
                </div>
              </div>
            </button>

            {/* Voto Digital */}
            <button
              onClick={() => navigate('/voto-digital')}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-700 transition-colors w-fit">
                  <Vote className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Voto Digital</h3>
                  <p className="text-sm text-slate-600">Emitir voto</p>
                </div>
              </div>
            </button>
          </div>

          {/* Estadísticas y Votaciones Recientes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Estadísticas */}
            <div className="lg:col-span-2 bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <BarChart3 className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-800">Estadísticas del Sistema</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-600 mb-1">Usuarios Totales</p>
                  <p className="text-2xl font-bold text-slate-800">2</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-600 mb-1">Candidatos Presidente</p>
                  <p className="text-2xl font-bold text-slate-800">12</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-600 mb-1">Candidatos Alcalde</p>
                  <p className="text-2xl font-bold text-slate-800">12</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-600 mb-1">Elecciones</p>
                  <p className="text-2xl font-bold text-slate-800">2026</p>
                </div>
              </div>
            </div>

            {/* Votaciones Recientes */}
            <div className="lg:col-span-1">
              <VoteListCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
