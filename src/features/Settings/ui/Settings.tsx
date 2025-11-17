import { useState } from 'react';
import { Avatar } from '@heroui/react';
import { Camera, CheckCircle, X } from 'lucide-react';
import { useUser } from '../../../context/UserContext';

const Settings = () => {
  const { userData, updateUserData } = useUser();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Estado local temporal para los cambios
  const [tempData, setTempData] = useState({
    nombre: userData.nombre,
    apellidoPaterno: userData.apellido.split(' ')[0] || '',
    apellidoMaterno: userData.apellido.split(' ')[1] || '',
    genero: 'Masculino',
    dni: userData.dni,
    email: userData.email,
    rol: userData.rol,
    foto: userData.foto,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData({ ...tempData, foto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData({ ...tempData, [field]: value });
  };

  const handleSaveChanges = () => {
    // Combinar apellidos para guardar
    const dataToSave = {
      ...tempData,
      apellido: `${tempData.apellidoPaterno} ${tempData.apellidoMaterno}`.trim(),
    };
    updateUserData(dataToSave);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="p-6">
      {/* Mensaje de éxito */}
      {showSuccessMessage && (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-top-5 duration-300">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-xl border border-green-200/60 p-4 flex items-center gap-3 min-w-[320px]">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800 text-sm">Cambios guardados</h4>
              <p className="text-xs text-slate-600 mt-0.5">Tu perfil se actualizó correctamente</p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-white/50 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-lg border border-slate-200/60 p-8 backdrop-blur-sm">
          {/* Título */}
          <h2 className="text-2xl font-semibold text-slate-800 mb-8">Configuración de Perfil</h2>
          
          {/* Avatar */}
          <div className="mb-8 pb-8 border-b border-slate-200/60">
            <label className="block text-sm font-medium text-slate-700 mb-4">Foto de perfil</label>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar
                  src={tempData.foto}
                  size="lg"
                  name={`${tempData.nombre} ${tempData.apellidoPaterno}`}
                  className="w-24 h-24 border-3 border-slate-200 shadow-md"
                />
                <label
                  htmlFor="photo-upload"
                  className="absolute -bottom-1 -right-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white p-2 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl"
                >
                  <Camera className="w-4 h-4" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-800">{tempData.nombre} {tempData.apellidoPaterno} {tempData.apellidoMaterno}</p>
                <p className="text-sm text-slate-500 mt-1">{tempData.rol}</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={tempData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all shadow-sm hover:border-slate-300"
                  placeholder="Ingresa tu nombre"
                />
              </div>

              {/* Apellido Paterno */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Apellido Paterno</label>
                <input
                  type="text"
                  value={tempData.apellidoPaterno}
                  onChange={(e) => handleInputChange('apellidoPaterno', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all shadow-sm hover:border-slate-300"
                  placeholder="Ingresa tu apellido paterno"
                />
              </div>

              {/* Apellido Materno */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Apellido Materno</label>
                <input
                  type="text"
                  value={tempData.apellidoMaterno}
                  onChange={(e) => handleInputChange('apellidoMaterno', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all shadow-sm hover:border-slate-300"
                  placeholder="Ingresa tu apellido materno"
                />
              </div>

              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Género</label>
                <select
                  value={tempData.genero}
                  onChange={(e) => handleInputChange('genero', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all cursor-pointer shadow-sm hover:border-slate-300"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              {/* DNI */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">DNI</label>
                <input
                  type="text"
                  value={tempData.dni}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200/60 rounded-xl text-sm text-slate-600 cursor-not-allowed shadow-sm"
                  maxLength={8}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={tempData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all shadow-sm hover:border-slate-300"
                  placeholder="correo@onpe.gob.pe"
                />
              </div>
            </div>

            {/* Botón de guardar */}
            <div className="flex justify-end pt-6 mt-6 border-t border-slate-200/60">
              <button 
                onClick={handleSaveChanges}
                className="px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
