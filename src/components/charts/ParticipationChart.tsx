import { Users, TrendingUp } from "lucide-react";

export function ParticipationChart() {
  const participationData = {
    votaron: 68.5,
    abstuvieron: 31.5,
    totalVotantes: 1250,
    totalRegistrados: 1825,
  };

  const { votaron, totalVotantes, totalRegistrados } = participationData;

  // Calcular el ángulo para el gráfico de dona
  const votaronAngle = (votaron / 100) * 360;

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-base font-bold text-slate-800 mb-3 text-center">Participación Electoral</h3>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {/* Gráfico de dona */}
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {/* Círculo de fondo */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
            />
            {/* Círculo de participación */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#1e293b"
              strokeWidth="12"
              strokeDasharray={`${(votaronAngle / 360) * 251.2} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          
          {/* Porcentaje en el centro */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-800">{votaron}%</span>
            <span className="text-xs text-slate-500">Participación</span>
          </div>
        </div>

        {/* Leyenda */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-800"></div>
              <span className="text-xs text-slate-700">Votaron</span>
            </div>
            <span className="text-xs font-semibold text-slate-800">{totalVotantes}</span>
          </div>
          
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <span className="text-xs text-slate-700">Se abstuvieron</span>
            </div>
            <span className="text-xs font-semibold text-slate-800">{totalRegistrados - totalVotantes}</span>
          </div>
        </div>

        {/* Estadísticas adicionales */}
        <div className="w-full px-4 pt-3 pb-2 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs mb-3">
            <Users className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-slate-600">Total registrados:</span>
            <span className="font-semibold text-slate-800">{totalRegistrados}</span>
          </div>
          
          <div className="flex gap-1 items-center font-medium text-slate-700 text-xs">
            Alta participación <TrendingUp className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
