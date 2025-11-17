import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner, Pagination } from '@heroui/react';
import LogoVoto from '../../../assets/LogoVoto.png';
import Vizcarra from '../../../assets/Vizcarra.jpg';
import George from '../../../assets/George.png';
import Acuna from '../../../assets/Acuna.jpg';
import Keiko from '../../../assets/Keiko.jpg';
import Veronika from '../../../assets/Veronika.jpg';
import Rafael from '../../../assets/Rafael.jpg';
import Hernando from '../../../assets/Hernando.jpg';
import Yonhy from '../../../assets/Yonhy.jpg';
import Daniel from '../../../assets/Daniel.jpg';
import Julio from '../../../assets/Julio.jpg';
import Alberto from '../../../assets/Alberto.jpg';
import Marco from '../../../assets/Marco.jpg';

const candidatos = [
  { id: 1, nombre: 'Martín Vizcarra', partido: 'Partido Morado', imagen: Vizcarra },
  { id: 2, nombre: 'George Forsyth', partido: 'Victoria Nacional', imagen: George },
  { id: 3, nombre: 'César Acuña', partido: 'Alianza Para el Progreso', imagen: Acuna },
  { id: 4, nombre: 'Keiko Fujimori', partido: 'Fuerza Popular', imagen: Keiko },
  { id: 5, nombre: 'Verónika Mendoza', partido: 'Juntos por el Perú', imagen: Veronika },
  { id: 6, nombre: 'Rafael López Aliaga', partido: 'Renovación Popular', imagen: Rafael },
  { id: 7, nombre: 'Hernando de Soto', partido: 'Avanza País', imagen: Hernando },
  { id: 8, nombre: 'Yonhy Lescano', partido: 'Acción Popular', imagen: Yonhy },
  { id: 9, nombre: 'Daniel Urresti', partido: 'Podemos Perú', imagen: Daniel },
  { id: 10, nombre: 'Julio Guzmán', partido: 'Partido Morado', imagen: Julio },
  { id: 11, nombre: 'Alberto Beingolea', partido: 'Partido Popular Cristiano', imagen: Alberto },
  { id: 12, nombre: 'Marco Arana', partido: 'Frente Amplio', imagen: Marco },
];

const PresidenteVote = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidatos[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(candidatos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidatos = candidatos.slice(startIndex, endIndex);

  const handleSelectCandidate = (candidato: typeof candidatos[0]) => {
    setSelectedCandidate(candidato);
    onOpen();
  };

  const handleConfirmVote = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setVoteSuccess(true);
      
      // Guardar voto asociado al DNI del usuario actual
      const userDni = localStorage.getItem('userDni');
      if (userDni) {
        localStorage.setItem(`presidenteVotado_${userDni}`, 'true');
      }
      
      setTimeout(() => {
        navigate('/voto-digital');
      }, 5000);
    }, 8000);
  };

  return (
    <div className="h-[calc(100vh-120px)] bg-white p-6 overflow-auto">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={LogoVoto} alt="Voto Digital" className="h-24" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Elección Presidencial</h1>
          <p className="text-slate-600">Selecciona tu candidato preferido</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentCandidatos.map((candidato) => (
            <div
              key={candidato.id}
              className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-6 hover:border-blue-400 transition-all"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <img
                  src={candidato.imagen}
                  alt={candidato.nombre}
                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{candidato.nombre}</h3>
                  <p className="text-sm text-slate-600">{candidato.partido}</p>
                </div>
                <Button
                  size="lg"
                  onPress={() => handleSelectCandidate(candidato)}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold"
                >
                  Seleccionar
                </Button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mb-6">
            <Pagination
              loop
              showControls
              page={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
              classNames={{
                wrapper: "gap-2",
                item: "bg-white border-2 border-slate-200 hover:border-slate-400",
                cursor: "bg-slate-700 text-white font-semibold shadow-md"
              }}
            />
          </div>
        )}

        <div className="text-center">
          <Button
            color="default"
            variant="light"
            onPress={() => navigate('/voto-digital')}
          >
            Volver
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={!isProcessing}>
        <ModalContent>
          {(onClose) => (
            <>
              {!isProcessing && !voteSuccess && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Confirmar Voto
                  </ModalHeader>
                  <ModalBody>
                    <div className="text-center py-4">
                      <img
                        src={selectedCandidate?.imagen}
                        alt={selectedCandidate?.nombre}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 mx-auto mb-4"
                      />
                      <p className="text-lg font-semibold text-slate-800">
                        ¿Estás seguro de votar por:
                      </p>
                      <p className="text-xl font-bold text-blue-600 mt-2">
                        {selectedCandidate?.nombre}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {selectedCandidate?.partido}
                      </p>
                      <p className="text-sm text-slate-500 mt-4">
                        Esta acción no se puede deshacer
                      </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button onPress={handleConfirmVote} className="bg-slate-700 hover:bg-slate-600 text-white font-semibold">
                      Confirmar Voto
                    </Button>
                  </ModalFooter>
                </>
              )}

              {isProcessing && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Procesando Voto
                  </ModalHeader>
                  <ModalBody>
                    <div className="text-center py-8">
                      <Spinner
                        size="lg"
                        variant="wave"
                        classNames={{ label: "text-foreground mt-4" }}
                        label="Procesando solicitud..."
                      />
                    </div>
                  </ModalBody>
                </>
              )}

              {voteSuccess && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    ¡Voto Registrado!
                  </ModalHeader>
                  <ModalBody>
                    <div className="text-center py-6">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-12 h-12 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-xl font-bold text-green-600">¡Voto Válido!</p>
                      <p className="text-slate-600 mt-2">
                        Tu voto ha sido registrado exitosamente
                      </p>
                      <p className="text-sm text-slate-500 mt-4">
                        Redirigiendo en 5 segundos...
                      </p>
                    </div>
                  </ModalBody>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PresidenteVote;
