import { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import peruGeoData from '../../features/Votes/json/UbigeoPeru.json';

// Colores únicos para cada departamento
// const departmentColors: { [key: string]: string } = {
//   'AMAZONAS': '#93C5FD',
//   'ANCASH': '#BFDBFE',
//   'APURIMAC': '#DDD6FE',
//   'AREQUIPA': '#FCA5A5',
//   'AYACUCHO': '#FCD34D',
//   'CAJAMARCA': '#86EFAC',
//   'CALLAO': '#A5F3FC',
//   'CUSCO': '#F9A8D4',
//   'HUANCAVELICA': '#FDE047',
//   'HUANUCO': '#BEF264',
//   'ICA': '#FED7AA',
//   'JUNIN': '#C4B5FD',
//   'LA LIBERTAD': '#99F6E4',
//   'LAMBAYEQUE': '#A7F3D0',
//   'LIMA': '#FCA5A5',
//   'LORETO': '#6EE7B7',
//   'MADRE DE DIOS': '#D8B4FE',
//   'MOQUEGUA': '#FDBA74',
//   'PASCO': '#BAE6FD',
//   'PIURA': '#FDE68A',
//   'PUNO': '#C7D2FE',
//   'SAN MARTIN': '#A5B4FC',
//   'TACNA': '#FCA5A5',
//   'TUMBES': '#FEF08A',
//   'UCAYALI': '#BBF7D0'
// };

interface MapPeruProps {
  onDepartmentSelect: (department: string) => void;
}

const MapPeru = ({ onDepartmentSelect }: MapPeruProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleDepartmentClick = (geo: any) => {
    const departmentName = geo.properties.NOMBDEP;
    setSelectedDepartment(departmentName);
    onDepartmentSelect(departmentName);
  };

  return (
    <div className="w-full relative">
      {hoveredDepartment && (
        <div 
          className="fixed bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg z-50 pointer-events-none"
          style={{
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y + 15}px`
          }}
        >
          {hoveredDepartment}
        </div>
      )}

      <div className="flex justify-center w-full">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1400,
            center: [-75, -9.5]
          }}
          width={480}
          height={580}
        >
        <Geographies geography={peruGeoData}>
          {({ geographies }) =>
            geographies.map((geo: any) => {
              const departmentName = geo.properties.NOMBDEP;
              const isSelected = selectedDepartment === departmentName;
              const isHovered = hoveredDepartment === departmentName;
              
              return (
                <g 
                  key={geo.rsmKey}
                  onMouseEnter={() => setHoveredDepartment(departmentName)}
                  onMouseLeave={() => setHoveredDepartment(null)}
                  onMouseMove={handleMouseMove}
                  onClick={() => handleDepartmentClick(geo)}
                  style={{ cursor: 'pointer' }}
                >
                  <Geography
                    geography={geo}
                    fill={
                      isSelected ? '#1E293B' : 
                      isHovered ? '#1E293B' : 
                      '#E2E2E2'
                    }
                    stroke="#1E293B"
                    strokeWidth={1}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' }
                    }}
                  />
                </g>
              );
            })
          }
        </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

export default MapPeru;
