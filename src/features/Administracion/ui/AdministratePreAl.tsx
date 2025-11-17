import { useState } from 'react';
import { Upload, AlertTriangle, FileText, CheckCircle, X, Trash2, GitCompare } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@heroui/react';

interface CSVRow {
  lineNumber: number;
  nombre: string;
  partido: string;
  tipo: string;
  votos: string;
  hasErrors: boolean;
  errors: string[];
}

const AdministratePreAl = () => {
  const [originalData, setOriginalData] = useState<CSVRow[]>([]);
  const [cleanedData, setCleanedData] = useState<CSVRow[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [fileName, setFileName] = useState('');
  const [showCleanOptions, setShowCleanOptions] = useState(false);
  const [stats, setStats] = useState({ moda: 0, media: 0, mediana: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [comparisonPage, setComparisonPage] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<'moda' | 'media' | 'mediana' | null>(null);
  const [hasBeenCleaned, setHasBeenCleaned] = useState(false);
  const itemsPerPage = 10;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      const rows: CSVRow[] = [];

      lines.forEach((line, index) => {
        if (index === 0 || !line.trim()) return;

        const [nombre, partido, tipo, votos] = line.split(',').map(s => s?.trim() || '');
        const errors: string[] = [];

        if (!nombre) errors.push('Nombre vacío');
        if (!partido) errors.push('Partido vacío');
        if (!tipo) errors.push('Tipo vacío');
        if (!votos || isNaN(Number(votos))) errors.push('Votos inválidos');

        rows.push({
          lineNumber: index + 1,
          nombre,
          partido,
          tipo,
          votos,
          hasErrors: errors.length > 0,
          errors,
        });
      });

      setOriginalData(rows);
      setCleanedData(rows);
    };

    reader.readAsText(file);
  };

  const calculateStats = (data: CSVRow[]) => {
    const votos = data.filter(r => !r.hasErrors).map(r => Number(r.votos)).filter(v => !isNaN(v));
    
    // Media
    const media = votos.length > 0 ? votos.reduce((a, b) => a + b, 0) / votos.length : 0;
    
    // Mediana
    const sorted = [...votos].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const mediana = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    
    // Moda
    const frequency: { [key: number]: number } = {};
    votos.forEach(v => frequency[v] = (frequency[v] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const moda = Number(Object.keys(frequency).find(k => frequency[Number(k)] === maxFreq)) || 0;
    
    return { moda, media: Math.round(media), mediana: Math.round(mediana) };
  };

  const handleCleanData = () => {
    const cleaned = originalData.filter(row => !row.hasErrors);
    setCleanedData(cleaned);
    setStats(calculateStats(cleaned));
    setShowCleanOptions(true);
    setHasBeenCleaned(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCompareClick = () => {
    if (!hasBeenCleaned) {
      onOpen();
    } else {
      setShowComparison(!showComparison);
    }
  };

  const handleApplyStatistic = (type: 'moda' | 'media' | 'mediana') => {
    const value = stats[type];
    const updated = cleanedData.map(row => ({
      ...row,
      votos: row.hasErrors || !row.votos ? String(value) : row.votos
    }));
    setCleanedData(updated);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleRemoveRow = (lineNumber: number) => {
    setCleanedData(cleanedData.filter(row => row.lineNumber !== lineNumber));
  };

  const handleClear = () => {
    setOriginalData([]);
    setCleanedData([]);
    setFileName('');
    setShowComparison(false);
  };

  const errorCount = originalData.filter(r => r.hasErrors).length;
  const cleanCount = cleanedData.length;
  
  // Paginación tabla principal
  const totalPages = Math.ceil(cleanedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = cleanedData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Paginación comparación
  const comparisonTotalPages = Math.ceil(Math.max(originalData.length, cleanedData.length) / itemsPerPage);
  const comparisonStartIndex = (comparisonPage - 1) * itemsPerPage;
  const comparisonEndIndex = comparisonStartIndex + itemsPerPage;
  const comparisonOriginalData = originalData.slice(comparisonStartIndex, comparisonEndIndex);
  const comparisonCleanedData = cleanedData.slice(comparisonStartIndex, comparisonEndIndex);

  const handleComparisonPageChange = (page: number) => {
    setComparisonPage(page);
  };

  return (
    <div className="p-6">
      {showSuccess && (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-xl border border-green-200/60 p-4 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-slate-800">Operación exitosa</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Gestión de Datos CSV</h2>

        <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-xl">
                <Upload className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-800">Cargar CSV</h3>
            </div>
            {originalData.length > 0 && (
              <button onClick={handleClear} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100/80 rounded-xl transition-all hover:shadow-sm">
                <Trash2 className="w-4 h-4" />
                Limpiar todo
              </button>
            )}
          </div>
          <p className="text-sm text-slate-600 mb-4">Formato: nombre,partido,tipo,votos</p>
          <input type="file" accept=".csv" onChange={handleCSVImport} id="csv" className="hidden" />
          <label htmlFor="csv" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-sm font-medium rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md">
            <FileText className="w-4 h-4" />
            Seleccionar CSV
          </label>
          {fileName && <span className="ml-3 text-sm text-slate-600 font-medium">{fileName}</span>}
        </div>

        {originalData.length > 0 && (
          <>
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200/60 rounded-2xl p-5 mb-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-slate-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 text-sm mb-1.5">Resumen del análisis</h3>
                  <p className="text-xs text-slate-600">Total de filas: {originalData.length} | Con errores: {errorCount} | Limpias: {originalData.length - errorCount}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleCleanData} className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-xs font-medium rounded-xl transition-all shadow-sm hover:shadow-md">
                    Limpiar datos
                  </button>
                  <button onClick={handleCompareClick} className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-xs font-medium rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-1.5">
                    <GitCompare className="w-3.5 h-3.5" />
                    Comparar
                  </button>
                </div>
              </div>
            </div>

            {showCleanOptions && (
              <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-2xl p-6 mb-6 shadow-md">
                <h3 className="font-semibold text-slate-800 mb-2">Método de limpieza estadística</h3>
                <p className="text-xs text-slate-600 mb-5">Selecciona el método para completar datos faltantes</p>
                <div className="grid grid-cols-3 gap-4">
                  <button 
                    onClick={() => { setSelectedMethod('moda'); handleApplyStatistic('moda'); }} 
                    className={`p-5 border-2 rounded-2xl transition-all text-center group ${selectedMethod === 'moda' ? 'border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 shadow-md' : 'border-slate-200/60 hover:border-slate-400 hover:shadow-md bg-white'}`}
                  >
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all ${selectedMethod === 'moda' ? 'bg-slate-700 shadow-lg' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                      <svg className={`w-7 h-7 transition-colors ${selectedMethod === 'moda' ? 'text-white' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="font-semibold text-slate-800 mb-1">Moda</div>
                    <div className="text-xs text-slate-500">Valor más frecuente</div>
                  </button>
                  
                  <button 
                    onClick={() => { setSelectedMethod('media'); handleApplyStatistic('media'); }} 
                    className={`p-5 border-2 rounded-2xl transition-all text-center group ${selectedMethod === 'media' ? 'border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 shadow-md' : 'border-slate-200/60 hover:border-slate-400 hover:shadow-md bg-white'}`}
                  >
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all ${selectedMethod === 'media' ? 'bg-slate-700 shadow-lg' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                      <svg className={`w-7 h-7 transition-colors ${selectedMethod === 'media' ? 'text-white' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <div className="font-semibold text-slate-800 mb-1">Media</div>
                    <div className="text-xs text-slate-500">Promedio aritmético</div>
                  </button>
                  
                  <button 
                    onClick={() => { setSelectedMethod('mediana'); handleApplyStatistic('mediana'); }} 
                    className={`p-5 border-2 rounded-2xl transition-all text-center group ${selectedMethod === 'mediana' ? 'border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 shadow-md' : 'border-slate-200/60 hover:border-slate-400 hover:shadow-md bg-white'}`}
                  >
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all ${selectedMethod === 'mediana' ? 'bg-slate-700 shadow-lg' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                      <svg className={`w-7 h-7 transition-colors ${selectedMethod === 'mediana' ? 'text-white' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="font-semibold text-slate-800 mb-1">Mediana</div>
                    <div className="text-xs text-slate-500">Valor central</div>
                  </button>
                </div>
              </div>
            )}

            {showComparison && (
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                        CSV Original ({originalData.length})
                      </h4>
                      <div className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {comparisonStartIndex + 1}-{Math.min(comparisonEndIndex, originalData.length)}
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="p-2 text-left">#</th>
                            <th className="p-2 text-left">Nombre</th>
                            <th className="p-2 text-left">Partido</th>
                            <th className="p-2 text-left">Tipo</th>
                            <th className="p-2 text-left">Votos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonOriginalData.map((row) => (
                            <tr key={row.lineNumber} className={row.hasErrors ? 'bg-slate-100' : ''}>
                              <td className="p-2">{row.lineNumber}</td>
                              <td className="p-2">{row.nombre || '-'}</td>
                              <td className="p-2">{row.partido || '-'}</td>
                              <td className="p-2">{row.tipo || '-'}</td>
                              <td className="p-2">{row.votos || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-md border border-green-200/60 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        CSV Limpio ({cleanCount})
                      </h4>
                      <div className="text-xs text-slate-600 bg-green-100 px-2.5 py-1 rounded-lg">
                        {comparisonStartIndex + 1}-{Math.min(comparisonEndIndex, cleanCount)}
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="p-2 text-left">#</th>
                            <th className="p-2 text-left">Nombre</th>
                            <th className="p-2 text-left">Partido</th>
                            <th className="p-2 text-left">Tipo</th>
                            <th className="p-2 text-left">Votos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonCleanedData.map((row) => (
                            <tr key={row.lineNumber} className="hover:bg-slate-50">
                              <td className="p-2">{row.lineNumber}</td>
                              <td className="p-2">{row.nombre}</td>
                              <td className="p-2">{row.partido}</td>
                              <td className="p-2">{row.tipo}</td>
                              <td className="p-2">{row.votos}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Paginación de comparación */}
                {comparisonTotalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 py-3 bg-gradient-to-br from-white to-slate-50/50 rounded-2xl border border-slate-200/60 shadow-sm">
                    <button
                      onClick={() => handleComparisonPageChange(comparisonPage - 1)}
                      disabled={comparisonPage === 1}
                      className="px-4 py-2 text-sm border border-slate-200/60 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-sm"
                    >
                      Anterior
                    </button>
                    
                    {Array.from({ length: comparisonTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handleComparisonPageChange(page)}
                        className={`px-4 py-2 text-sm rounded-xl transition-all ${
                          comparisonPage === page
                            ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-md'
                            : 'border border-slate-200/60 hover:bg-slate-50 hover:shadow-sm'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handleComparisonPageChange(comparisonPage + 1)}
                      disabled={comparisonPage === comparisonTotalPages}
                      className="px-4 py-2 text-sm border border-slate-200/60 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-sm"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-slate-800 text-lg">Datos procesados ({cleanCount} filas)</h3>
                <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, cleanCount)} de {cleanCount}
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200/60">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-slate-100 to-slate-50">
                    <tr>
                      <th className="p-3 text-left font-semibold text-slate-700">Línea</th>
                      <th className="p-3 text-left font-semibold text-slate-700">Nombre</th>
                      <th className="p-3 text-left font-semibold text-slate-700">Partido</th>
                      <th className="p-3 text-left font-semibold text-slate-700">Tipo</th>
                      <th className="p-3 text-left font-semibold text-slate-700">Votos</th>
                      <th className="p-3 text-left font-semibold text-slate-700">Estado</th>
                      <th className="p-3 text-left font-semibold text-slate-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {currentData.map((row) => (
                      <tr key={row.lineNumber} className={row.hasErrors ? 'bg-red-50/50' : 'hover:bg-slate-50/50 transition-colors'}>
                        <td className="p-3 border-t border-slate-100">{row.lineNumber}</td>
                        <td className="p-3 border-t border-slate-100">{row.nombre || <span className="text-slate-400">-</span>}</td>
                        <td className="p-3 border-t border-slate-100">{row.partido || <span className="text-slate-400">-</span>}</td>
                        <td className="p-3 border-t border-slate-100">{row.tipo || <span className="text-slate-400">-</span>}</td>
                        <td className="p-3 border-t border-slate-100">{row.votos || <span className="text-slate-400">-</span>}</td>
                        <td className="p-3 border-t border-slate-100">
                          {row.hasErrors ? (
                            <div className="flex items-center gap-1 text-red-600 text-xs">
                              <AlertTriangle className="w-3 h-3" />
                              {row.errors.join(', ')}
                            </div>
                          ) : (
                            <span className="text-green-600 text-xs font-medium">✓ OK</span>
                          )}
                        </td>
                        <td className="p-3 border-t border-slate-100">
                          <button onClick={() => handleRemoveRow(row.lineNumber)} className="p-1.5 text-slate-600 hover:bg-red-100 hover:text-red-600 rounded-lg transition-all">
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-5 pt-5 border-t border-slate-200/60">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-slate-200/60 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-sm"
                  >
                    Anterior
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 text-sm rounded-xl transition-all ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-md'
                          : 'border border-slate-200/60 hover:bg-slate-50 hover:shadow-sm'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border border-slate-200/60 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-sm"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal de validación */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-slate-600" />
                  <span>Acción requerida</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="text-slate-700">
                  Para poder comparar los datos, primero debes limpiar el dataset cargado.
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Haz clic en <strong>"Limpiar datos"</strong> para eliminar las filas con errores y luego podrás usar la función de comparación.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Entendido
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => {
                    onClose();
                    handleCleanData();
                  }}
                  className="bg-slate-700 text-white"
                >
                  Limpiar ahora
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdministratePreAl;
