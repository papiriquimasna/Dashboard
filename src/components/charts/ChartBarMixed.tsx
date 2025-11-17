import { TrendingUp } from "lucide-react";
import { Avatar } from "@heroui/react";
import Rafael from '../../assets/Rafael.jpg';
import Vizcarra from '../../assets/Vizcarra.jpg';
import Acuna from '../../assets/Acuna.jpg';
import George from '../../assets/George.png';

export const description = "A mixed bar chart";

const chartData = [
  { 
    candidato: "vizcarra", 
    nombre: "Martín Vizcarra",
    votos: 275, 
    avatar: Vizcarra,
    color: "#1e293b"
  },
  { 
    candidato: "forsyth", 
    nombre: "George Forsyth",
    votos: 200, 
    avatar: George,
    color: "#1e293b"
  },
  { 
    candidato: "lopez", 
    nombre: "Rafael López Aliaga",
    votos: 187, 
    avatar: Rafael,
    color: "#1e293b"
  },
  { 
    candidato: "acuna", 
    nombre: "César Acuña",
    votos: 173, 
    avatar: Acuna,
    color: "#1e293b"
  },
];

export function ChartBarMixed() {
  const maxVotos = Math.max(...chartData.map(d => d.votos));
  
  return (
    <div className="w-full -ml-14">
      <div className="mb-3">
        <h3 className="text-base font-bold text-slate-800">Votaciones</h3>
        <p className="text-xs text-slate-500">Resultados por candidato</p>
      </div>
      
      <div className="space-y-4">
        {chartData.map((item) => {
          const percentage = (item.votos / maxVotos) * 100;
          
          return (
            <div key={item.candidato} className="flex items-center gap-3">
              <Avatar 
                src={item.avatar} 
                size="sm"
                name={item.nombre}
                className="w-7 h-7 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-700 truncate">{item.nombre}</span>
                  <span className="text-xs text-slate-500 ml-2">{item.votos}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-1 text-xs mt-4">
        <div className="flex gap-1 items-center font-medium text-slate-700">
          Tendencia positiva <TrendingUp className="h-3 w-3" />
        </div>
        <div className="text-slate-500">
          Mostrando resultados del departamento
        </div>
      </div>
    </div>
  );
}
