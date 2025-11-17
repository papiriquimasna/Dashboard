import { useState } from 'react';
import { Map, Layers, PieChart } from 'lucide-react';
import MapPeru from '../../../components/map/MapPeru';
import DepartmentDetail from '../../../components/map/DepartmentDetail';
import { ChartBarMixed } from '../../../components/charts/ChartBarMixed';
import { TopVoters } from '../../../components/charts/TopVoters';
import { ParticipationChart } from '../../../components/charts/ParticipationChart';

const GlobalVotes = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  return (
    <div className="p-5">
      <div className="flex gap-3">
        {/* Columna izquierda - Mapa */}
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-[520px] h-fit shrink-0">
            <h2 className="text-base font-bold text-slate-800 mb-3 text-center">Mapa de Votaciones por Departamento</h2>
            <MapPeru onDepartmentSelect={setSelectedDepartment} />
          </div>
        </div>

        {/* Columna central - Departamento y Participación */}
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-[700px] h-[450px] flex flex-col shrink-0">
            <h2 className="text-base font-bold text-slate-800 mb-3 text-center">Departamento Seleccionado</h2>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {selectedDepartment ? (
                <div className="flex gap-3 w-full h-full">
                  <div className="w-[320px] flex items-center justify-center">
                    <DepartmentDetail departmentName={selectedDepartment} />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <ChartBarMixed />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 text-slate-400">
                  <Map size={64} strokeWidth={1.5} />
                  <p className="text-center">Selecciona un departamento del mapa</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 w-[700px] h-[380px] shrink-0">
            {selectedDepartment ? (
              <ParticipationChart />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                <PieChart size={48} strokeWidth={1.5} />
                <p className="text-center text-sm">Aquí se mostrará la participación electoral</p>
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha - Máximos Votados */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-[320px] h-[450px] shrink-0">
          {selectedDepartment ? (
            <TopVoters />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
              <Layers size={48} strokeWidth={1.5} />
              <p className="text-center text-sm">Aquí se mostrarán los máximos votadores</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalVotes;
