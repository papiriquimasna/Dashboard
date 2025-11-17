import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import LogoVoto from '../../../assets/LogoVoto.png';
import Presidente from '../../../assets/Presidente.png';
import Alcalde from '../../../assets/Alcalde.png';

const VoteDigital = () => {
  const navigate = useNavigate();
  const [presidenteVotado, setPresidenteVotado] = useState(false);
  const [alcaldeVotado, setAlcaldeVotado] = useState(false);

  useEffect(() => {
    // Verificar votos del usuario actual
    const userDni = localStorage.getItem('userDni');
    if (userDni) {
      setPresidenteVotado(localStorage.getItem(`presidenteVotado_${userDni}`) === 'true');
      setAlcaldeVotado(localStorage.getItem(`alcaldeVotado_${userDni}`) === 'true');
    }
  }, []);

  return (
    <div className="h-[calc(100vh-120px)] bg-white p-6 overflow-hidden flex items-start justify-center pt-12">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <img src={LogoVoto} alt="Voto Digital" className="h-36" />
          </div>
          <p className="text-sm text-slate-600">Selecciona el tipo de votación que deseas realizar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contenedor Presidente */}
          <div 
            className={`bg-white rounded-2xl shadow-xl border-2 p-8 min-h-[440px] flex items-center ${
              presidenteVotado ? 'border-green-400 bg-green-50' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-6 w-full">
              <img src={Presidente} alt="Presidente" className="w-30 h-30 object-contain" />
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Presidente</h2>
                <p className="text-slate-600">
                  {presidenteVotado ? 'Ya has votado' : 'Vota por tu candidato presidencial'}
                </p>
              </div>
              {presidenteVotado ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Voto Registrado
                </div>
              ) : (
                <Button 
                  color="default" 
                  size="lg"
                  onPress={() => navigate('/voto-digital/presidente')}
                  className="mt-3 px-4"
                >
                  Votar Ahora
                </Button>
              )}
            </div>
          </div>

          {/* Contenedor Alcalde */}
          <div 
            className={`bg-white rounded-2xl shadow-xl border-2 p-8 min-h-[340px] flex items-center ${
              alcaldeVotado ? 'border-green-400 bg-green-50' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-6 w-full">
              <img src={Alcalde} alt="Alcalde" className="w-30 h-30 object-contain" />
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Alcalde</h2>
                <p className="text-slate-600">
                  {alcaldeVotado ? 'Ya has votado' : 'Vota por tu candidato a alcalde'}
                </p>
              </div>
              {alcaldeVotado ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Voto Registrado
                </div>
              ) : (
                <Button 
                  color="default" 
                  size="lg"
                  onPress={() => navigate('/voto-digital/alcalde')}
                  className="mt-3 px-4"
                >
                  Votar Ahora
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDigital;
