import { useState } from 'react';
import { ChevronDown, Phone, Mail, MessageCircle, Clock, HelpCircle } from 'lucide-react';

const Help = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openGuide, setOpenGuide] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Puedo cambiar mi voto después de enviarlo?',
      answer: 'No, una vez confirmado tu voto, este queda registrado de forma definitiva y no puede ser modificado. Asegúrate de revisar bien tu selección antes de confirmar.'
    },
    {
      question: '¿Cómo verifico que mi voto fue registrado?',
      answer: 'Después de votar, recibirás una confirmación en pantalla con un mensaje de "Voto Válido". Tu voto queda registrado inmediatamente en el sistema.'
    },
    {
      question: '¿Qué requisitos necesito para votar?',
      answer: 'Necesitas tener tu DNI registrado en el sistema (12345678 para usuario o 87654321 para administrador), acceso a internet y un navegador web actualizado.'
    },
    {
      question: '¿Es seguro votar por internet?',
      answer: 'Sí, el sistema utiliza encriptación y cumple con todos los estándares de seguridad electoral. Tu voto es anónimo y está protegido.'
    },
    {
      question: '¿Puedo votar desde mi celular?',
      answer: 'Sí, el sistema es completamente responsive y funciona en dispositivos móviles, tablets y computadoras.'
    },
  ];

  const votingGuides = [
    {
      title: 'Guía Completa: Cómo Votar',
      steps: [
        {
          number: 1,
          title: 'Accede al Sistema',
          description: 'Ingresa con tu DNI en la pantalla de inicio de sesión. Solo los DNIs registrados pueden acceder al sistema.'
        },
        {
          number: 2,
          title: 'Selecciona Voto Digital',
          description: 'En el menú lateral, haz clic en "Voto Digital". Verás dos opciones: Presidente y Alcalde.'
        },
        {
          number: 3,
          title: 'Elige el Tipo de Elección',
          description: 'Selecciona si deseas votar por Presidente o Alcalde. Puedes votar por ambos, pero cada voto es independiente.'
        },
        {
          number: 4,
          title: 'Revisa los Candidatos',
          description: 'Verás una lista de candidatos con su foto, nombre y partido político. Usa la paginación para ver todos los candidatos disponibles.'
        },
        {
          number: 5,
          title: 'Selecciona tu Candidato',
          description: 'Haz clic en el botón "Seleccionar" del candidato de tu preferencia. Se abrirá un modal de confirmación.'
        },
        {
          number: 6,
          title: 'Confirma tu Voto',
          description: 'Revisa cuidadosamente tu selección en el modal. Si estás seguro, haz clic en "Confirmar Voto". Si deseas cambiar, haz clic en "Cancelar".'
        },
        {
          number: 7,
          title: 'Espera la Confirmación',
          description: 'El sistema procesará tu voto (toma aproximadamente 8 segundos). Verás un mensaje de "Procesando Voto".'
        },
        {
          number: 8,
          title: 'Voto Registrado',
          description: 'Recibirás una confirmación de "¡Voto Válido!" y serás redirigido automáticamente. Tu voto ha sido registrado exitosamente.'
        }
      ]
    },
    {
      title: 'Tipos de Votación',
      steps: [
        {
          number: 1,
          title: 'Elección Presidencial',
          description: 'Vota por el candidato a Presidente de la República. Hay 12 candidatos disponibles distribuidos en 2 páginas. Solo puedes votar una vez por presidente.'
        },
        {
          number: 2,
          title: 'Elección de Alcalde',
          description: 'Vota por el candidato a Alcalde de tu distrito. Hay 12 candidatos disponibles distribuidos en 2 páginas. Solo puedes votar una vez por alcalde.'
        },
        {
          number: 3,
          title: 'Voto Independiente',
          description: 'Puedes votar por presidente y alcalde de forma independiente. No es obligatorio votar por ambos en la misma sesión.'
        }
      ]
    }
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Centro de Ayuda</h1>
          <p className="text-slate-600">Encuentra respuestas a tus preguntas sobre el sistema electoral</p>
        </div>

        {/* Contacto rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                <Phone className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Línea de ayuda</h3>
                <p className="text-sm text-slate-600">0800-ONPE (6673)</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                <Mail className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Correo electrónico</h3>
                <p className="text-sm text-slate-600">soporte@onpe.gob.pe</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                <Clock className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Horario</h3>
                <p className="text-sm text-slate-600">Lun - Dom: 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preguntas Frecuentes */}
          <div>
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <HelpCircle className="w-6 h-6 text-slate-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Preguntas Frecuentes</h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-slate-200/60 rounded-xl overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-medium text-slate-800 text-left text-sm">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-600 transition-transform flex-shrink-0 ml-2 ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 py-4 bg-slate-50 border-t border-slate-200/60">
                        <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Guías detalladas */}
          <div className="space-y-6">
            {votingGuides.map((guide, guideIndex) => (
              <div key={guideIndex} className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">{guide.title}</h2>
                <div className="space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <div key={stepIndex}>
                      <button
                        onClick={() => setOpenGuide(openGuide === stepIndex + guideIndex * 10 ? null : stepIndex + guideIndex * 10)}
                        className="w-full p-4 bg-white border border-slate-200/60 rounded-xl hover:shadow-md transition-all text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-slate-800 text-sm">{step.title}</h3>
                              <ChevronDown
                                className={`w-5 h-5 text-slate-600 transition-transform ${
                                  openGuide === stepIndex + guideIndex * 10 ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                      {openGuide === stepIndex + guideIndex * 10 && (
                        <div className="mt-2 ml-11 p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
                          <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Información adicional */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-md border border-slate-200/60 p-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-slate-700" />
                <h3 className="font-semibold text-slate-800">¿Necesitas más ayuda?</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier consulta.
              </p>
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
                Contactar Soporte
              </button>
            </div>

            {/* Información electoral */}
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-md border border-slate-200/60 p-6">
              <h3 className="font-semibold text-slate-800 mb-3">Información Electoral</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Elecciones</span>
                  <span className="font-semibold text-slate-800">2026</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Fecha límite</span>
                  <span className="font-semibold text-slate-800">31 Dic 2026</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Candidatos Presidente</span>
                  <span className="font-semibold text-slate-800">12</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Candidatos Alcalde</span>
                  <span className="font-semibold text-slate-800">12</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-600">Estado</span>
                  <span className="px-2 py-1 bg-slate-700 text-white text-xs font-semibold rounded-lg">
                    Activo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
