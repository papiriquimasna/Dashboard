import { Avatar } from "@heroui/react";
import George from '../../assets/George.png';
import Vizcarra from '../../assets/Vizcarra.jpg';

export function TopVoters() {
  const topCandidates = [
    {
      nombre: "Martín Vizcarra",
      votos: 275,
      avatar: Vizcarra,
    },
    {
      nombre: "George Forsyth",
      votos: 200,
      avatar: George,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-base font-bold text-slate-800 mb-4 text-center">Máximos Votados</h3>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-6">
          {/* Primer candidato */}
          <div className="flex flex-col items-center gap-2">
            <Avatar 
              src={topCandidates[0].avatar} 
              size="lg"
              name={topCandidates[0].nombre}
              className="w-20 h-20"
            />
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800">{topCandidates[0].nombre}</p>
              <p className="text-xs text-slate-500">{topCandidates[0].votos} votos</p>
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-slate-400">VS</span>
          </div>

          {/* Segundo candidato */}
          <div className="flex flex-col items-center gap-2">
            <Avatar 
              src={topCandidates[1].avatar} 
              size="lg"
              name={topCandidates[1].nombre}
              className="w-20 h-20"
            />
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800">{topCandidates[1].nombre}</p>
              <p className="text-xs text-slate-500">{topCandidates[1].votos} votos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
