import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, AlertCircle } from 'lucide-react';
import { useUser } from '../../../context/UserContext';

// Generar burbujas aleatorias fuera del componente para que no cambien
const generateBubbles = () => Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 150 + 80, // Aumentado de 100+50 a 150+80 (80-230px)
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: Math.random() * 5 + 8,
}));

// Cuentas predefinidas
const PREDEFINED_ACCOUNTS = {
  '12345678': {
    nombre: 'Juan Carlos',
    apellido: 'Pérez García',
    dni: '12345678',
    email: 'juan.perez@onpe.gob.pe',
    rol: 'Usuario',
    foto: '',
  },
  '87654321': {
    nombre: 'María Elena',
    apellido: 'Rodríguez López',
    dni: '87654321',
    email: 'maria.rodriguez@onpe.gob.pe',
    rol: 'Administrador',
    foto: '',
  },
};

const Login = () => {
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  
  // Memorizar las burbujas para que no cambien en cada render
  const bubbles = useMemo(() => generateBubbles(), []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (dni.length === 8) {
      const account = PREDEFINED_ACCOUNTS[dni as keyof typeof PREDEFINED_ACCOUNTS];
      
      if (account) {
        // Verificar si hay datos guardados para este usuario específico
        const savedData = localStorage.getItem(`userData_${dni}`);
        let userDataToLoad = account;
        
        if (savedData) {
          // Usar los datos guardados del usuario
          userDataToLoad = JSON.parse(savedData);
        }
        
        // Usuario válido - actualizar datos y permitir acceso
        updateUserData(userDataToLoad);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userDni', dni);
        localStorage.setItem('userData', JSON.stringify(userDataToLoad));
        window.dispatchEvent(new Event('authChange'));
        navigate('/');
      } else {
        // DNI no registrado
        setError('DNI no registrado en el sistema. Por favor, contacta al administrador.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 relative overflow-hidden flex items-center justify-center">
      {/* Burbujas animadas */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-slate-400 pointer-events-none"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animation: `fall ${bubble.duration}s linear infinite`,
            animationDelay: `-${bubble.delay}s`,
          }}
        />
      ))}

      {/* Estilos de animación */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          5% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
          95% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>

      {/* Tarjeta de login */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/onpelogito.svg" alt="ONPE Logo" className="h-24" />
        </div>

        {/* Título */}
        <h2 className="text-center text-slate-800 font-semibold text-lg mb-2">
          Bienvenido al Sistema Electoral
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8">
          Ingresa tu DNI para acceder
        </p>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Campo DNI */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value.replace(/\D/g, '').slice(0, 8));
                  setError('');
                }}
                placeholder="DNI"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-slate-700 ${
                  error 
                    ? 'border-red-300 focus:ring-red-400 focus:border-red-400' 
                    : 'border-slate-300 focus:ring-slate-400 focus:border-transparent'
                }`}
                maxLength={8}
                required
              />
            </div>
            
            {/* Mensaje de error */}
            {error && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Botón de login */}
          <button
            type="submit"
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
          >
            Ingresar
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          ONPE - Oficina Nacional de Procesos Electorales
        </p>
      </div>
    </div>
  );
};

export default Login;
