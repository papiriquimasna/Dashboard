import { CheckCircle, Clock, Vote, HelpCircle } from 'lucide-react';
import BannerImg from '../../../assets/Welcome.png';
import { useNavigate } from 'react-router-dom';

const HomeUser = () => {
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

      {/* Contenido para Usuario */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Bienvenido al Sistema Electoral</h2>
          
          {/* Cards de acciones rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Votar */}
            <button
              onClick={() => navigate('/voto-digital')}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-700 transition-colors">
                  <Vote className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">Emitir mi Voto</h3>
                  <p className="text-sm text-slate-600">Participa en las elecciones 2026</p>
                </div>
              </div>
            </button>

            {/* Ayuda */}
            <button
              onClick={() => navigate('/ayuda')}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-700 transition-colors">
                  <HelpCircle className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">Centro de Ayuda</h3>
                  <p className="text-sm text-slate-600">Encuentra respuestas a tus dudas</p>
                </div>
              </div>
            </button>

            {/* Ajustes */}
            <button
              onClick={() => navigate('/ajustes')}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-700 transition-colors">
                  <CheckCircle className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">Mi Perfil</h3>
                  <p className="text-sm text-slate-600">Actualiza tu información</p>
                </div>
              </div>
            </button>
          </div>

          {/* Información electoral */}
          <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-slate-100 rounded-xl">
                <Clock className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-800">Información Electoral 2026</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-600 mb-1">Elecciones</p>
                <p className="text-lg font-bold text-slate-800">2026</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-600 mb-1">Candidatos Presidente</p>
                <p className="text-lg font-bold text-slate-800">12</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-600 mb-1">Candidatos Alcalde</p>
                <p className="text-lg font-bold text-slate-800">12</p>
              </div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="mt-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-md border border-slate-200/60 p-6">
            <h3 className="font-semibold text-slate-800 mb-3">¿Cómo votar?</h3>
            <ol className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Haz clic en "Emitir mi Voto" o ve a la sección "Voto Digital"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Selecciona si deseas votar por Presidente o Alcalde</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Revisa los candidatos y selecciona tu preferido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Confirma tu voto y recibirás una notificación de éxito</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
