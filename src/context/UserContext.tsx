import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  rol: string;
  foto: string;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Cargar datos desde localStorage o usar valores por defecto
  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      nombre: 'Juan Carlos',
      apellido: 'Pérez García',
      dni: '12345678',
      email: 'juan.perez@onpe.gob.pe',
      rol: 'Administrador',
      foto: '',
    };
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => {
      const newData = { ...prev, ...data };
      // Guardar en localStorage general
      localStorage.setItem('userData', JSON.stringify(newData));
      // Guardar en localStorage específico del usuario por DNI
      localStorage.setItem(`userData_${newData.dni}`, JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};
