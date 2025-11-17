import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@heroui/react';

interface User {
  id: number;
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  correo: string;
  rol: string;
}

const Users = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // Cargar usuarios desde localStorage
  const loadUsers = () => {
    const users: User[] = [];
    
    // Cargar usuario 12345678
    const user1Data = localStorage.getItem('userData_12345678');
    if (user1Data) {
      const parsed = JSON.parse(user1Data);
      users.push({
        id: 1,
        dni: parsed.dni,
        nombre: parsed.nombre,
        apellidoPaterno: parsed.apellido?.split(' ')[0] || '',
        apellidoMaterno: parsed.apellido?.split(' ')[1] || '',
        genero: 'Masculino',
        correo: parsed.email,
        rol: parsed.rol
      });
    } else {
      users.push({
        id: 1,
        dni: '12345678',
        nombre: 'Juan Carlos',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'García',
        genero: 'Masculino',
        correo: 'juan.perez@onpe.gob.pe',
        rol: 'Usuario'
      });
    }
    
    // Cargar usuario 87654321
    const user2Data = localStorage.getItem('userData_87654321');
    if (user2Data) {
      const parsed = JSON.parse(user2Data);
      users.push({
        id: 2,
        dni: parsed.dni,
        nombre: parsed.nombre,
        apellidoPaterno: parsed.apellido?.split(' ')[0] || '',
        apellidoMaterno: parsed.apellido?.split(' ')[1] || '',
        genero: 'Femenino',
        correo: parsed.email,
        rol: parsed.rol
      });
    } else {
      users.push({
        id: 2,
        dni: '87654321',
        nombre: 'María Elena',
        apellidoPaterno: 'Rodríguez',
        apellidoMaterno: 'López',
        genero: 'Femenino',
        correo: 'maria.rodriguez@onpe.gob.pe',
        rol: 'Administrador'
      });
    }
    
    return users;
  };

  const [users, setUsers] = useState<User[]>(loadUsers());

  // Recargar usuarios cuando el componente se monta
  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    genero: 'Masculino',
    correo: '',
    rol: 'Usuario'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddUser = () => {
    setIsEditing(false);
    setFormData({
      dni: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      genero: 'Masculino',
      correo: '',
      rol: 'Usuario'
    });
    onOpen();
  };

  const handleEditUser = (user: User) => {
    setIsEditing(true);
    setEditingUser(user);
    setFormData({
      dni: user.dni,
      nombre: user.nombre,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno,
      genero: user.genero,
      correo: user.correo,
      rol: user.rol
    });
    onOpen();
  };

  const handleSaveUser = () => {
    if (isEditing && editingUser) {
      const updatedUser = { ...editingUser, ...formData };
      setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
      
      // Actualizar en localStorage
      const existingData = localStorage.getItem(`userData_${formData.dni}`);
      const existingFoto = existingData ? JSON.parse(existingData).foto : '';
      
      const userDataToSave = {
        dni: formData.dni,
        nombre: formData.nombre,
        apellido: `${formData.apellidoPaterno} ${formData.apellidoMaterno}`.trim(),
        email: formData.correo,
        rol: formData.rol,
        foto: existingFoto // Mantener la foto existente
      };
      localStorage.setItem(`userData_${formData.dni}`, JSON.stringify(userDataToSave));
      
      // Si es el usuario actual, actualizar también userData general
      const currentUserDni = localStorage.getItem('userDni');
      if (currentUserDni === formData.dni) {
        localStorage.setItem('userData', JSON.stringify(userDataToSave));
      }
    } else {
      const newUser: User = {
        id: users.length + 1,
        ...formData
      };
      setUsers([...users, newUser]);
      
      // Guardar nuevo usuario en localStorage
      const userDataToSave = {
        dni: formData.dni,
        nombre: formData.nombre,
        apellido: `${formData.apellidoPaterno} ${formData.apellidoMaterno}`.trim(),
        email: formData.correo,
        rol: formData.rol,
        foto: '' // Sin foto por defecto
      };
      localStorage.setItem(`userData_${formData.dni}`, JSON.stringify(userDataToSave));
    }
    onOpenChange();
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestión de Usuarios</h1>
            <p className="text-sm text-slate-600 mt-1">Administra los usuarios del sistema electoral</p>
          </div>
          <button
            onClick={handleAddUser}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Agregar Usuario
          </button>
        </div>

        {/* Tabla de usuarios */}
        <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">DNI</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Apellido Paterno</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Apellido Materno</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Género</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Correo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{user.dni}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.apellidoPaterno}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.apellidoMaterno}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.genero}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.correo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                        user.rol === 'Administrador' 
                          ? 'bg-slate-700 text-white' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {user.rol}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-4 border-t border-slate-200/60">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-slate-200/60 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Anterior
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 text-sm rounded-xl transition-all ${
                    currentPage === page
                      ? 'bg-slate-700 text-white shadow-md'
                      : 'border border-slate-200/60 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-slate-200/60 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar/editar usuario */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-slate-800">
                  {isEditing ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* DNI */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">DNI</label>
                    <input
                      type="text"
                      value={formData.dni}
                      onChange={(e) => handleInputChange('dni', e.target.value.replace(/\D/g, '').slice(0, 8))}
                      className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                      placeholder="12345678"
                      maxLength={8}
                    />
                  </div>

                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                      placeholder="Juan Carlos"
                    />
                  </div>

                  {/* Apellido Paterno */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Apellido Paterno</label>
                    <input
                      type="text"
                      value={formData.apellidoPaterno}
                      onChange={(e) => handleInputChange('apellidoPaterno', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                      placeholder="Pérez"
                    />
                  </div>

                  {/* Apellido Materno */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Apellido Materno</label>
                    <input
                      type="text"
                      value={formData.apellidoMaterno}
                      onChange={(e) => handleInputChange('apellidoMaterno', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                      placeholder="García"
                    />
                  </div>

                  {/* Género */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Género</label>
                    <select
                      value={formData.genero}
                      onChange={(e) => handleInputChange('genero', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all cursor-pointer"
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  {/* Correo */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Correo Electrónico</label>
                    <input
                      type="email"
                      value={formData.correo}
                      onChange={(e) => handleInputChange('correo', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                      placeholder="usuario@onpe.gob.pe"
                    />
                  </div>

                  {/* Rol */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Rol del Sistema</label>
                    <select
                      value={formData.rol}
                      onChange={(e) => handleInputChange('rol', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all cursor-pointer"
                    >
                      <option value="Usuario">Usuario</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
                <Button onPress={handleSaveUser} className="bg-slate-700 text-white">
                  <Save className="w-4 h-4 mr-1" />
                  {isEditing ? 'Guardar Cambios' : 'Agregar Usuario'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Users;
