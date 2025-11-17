import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import peruGeoData from '../../features/Votes/json/UbigeoPeru.json';

interface DepartmentDetailProps {
  departmentName: string;
}

const DepartmentDetail = ({ departmentName }: DepartmentDetailProps) => {
  // Encontrar el departamento en los datos
  const selectedGeo = peruGeoData.features.find(
    (feature: any) => feature.properties.NOMBDEP === departmentName
  );

  if (!selectedGeo) {
    return (
      <div className="flex items-center justify-center h-[400px] text-slate-400">
        <p>No se encontró el departamento</p>
      </div>
    );
  }

  // Función recursiva para obtener todas las coordenadas
  const extractCoords = (coords: any): number[][] => {
    const result: number[][] = [];
    
    const traverse = (arr: any) => {
      if (Array.isArray(arr)) {
        if (arr.length === 2 && typeof arr[0] === 'number' && typeof arr[1] === 'number') {
          result.push(arr);
        } else {
          arr.forEach(item => traverse(item));
        }
      }
    };
    
    traverse(coords);
    return result;
  };

  const allCoords = extractCoords(selectedGeo.geometry.coordinates);
  
  if (allCoords.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-slate-400">
        <p>Error al cargar coordenadas</p>
      </div>
    );
  }

  const lngs = allCoords.map(c => c[0]);
  const lats = allCoords.map(c => c[1]);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  
  const avgLng = (minLng + maxLng) / 2;
  const avgLat = (minLat + maxLat) / 2;
  
  // Calcular el zoom basado en el tamaño del departamento (aumentado para que se vea más grande)
  const lngDiff = maxLng - minLng;
  const latDiff = maxLat - minLat;
  const maxDiff = Math.max(lngDiff, latDiff);
  const scale = 12000 / maxDiff; // Aumentado de 8000 a 12000

  return (
    <div className="flex items-center justify-center w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: scale,
          center: [avgLng, avgLat]
        }}
        width={520}
        height={380}
      >
          <Geographies geography={{ type: 'FeatureCollection', features: [selectedGeo] }}>
            {({ geographies }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#303093"
                  stroke="#1E293B"
                  strokeWidth={1.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' }
                  }}
                />
              ))
            }
          </Geographies>
      </ComposableMap>
    </div>
  );
};

export default DepartmentDetail;
