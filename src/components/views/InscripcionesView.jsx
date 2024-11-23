import { useEffect, useState, useRef } from 'react'; // Añadimos useRef
import { supabase } from '../../../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import CardItem from '../Card/CardItem';
import DetallesClase from '../DetallesViewInscripciones/DetallesClase';
import DetallesTorneo from '../DetallesViewInscripciones/DetallesTorneo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalConfirmacion from '../Ventana/ModalConfirmacion'; // Importar el modal

const InscripcionesView = () => {
  const [clasesInscritas, setClasesInscritas] = useState([]);
  const [torneosInscritos, setTorneosInscritos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedClase, setSelectedClase] = useState(null);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [inscripcionToDelete, setInscripcionToDelete] = useState(null); // Inscripción a eliminar

  // Referencia para la sección de detalles
  const detallesRef = useRef(null);

  useEffect(() => {
    const fetchInscripciones = async () => {
      const token = localStorage.getItem('token');
      let usuarioId;

      try {
        const decoded = jwtDecode(token);
        usuarioId = decoded.id;
      } catch {
        setErrorMessage('No se pudo obtener el ID del usuario.');
        return;
      }

      try {
        setLoading(true);
        await Promise.all([
          fetchClasesInscritas(usuarioId),
          fetchTorneosInscritos(usuarioId),
        ]);
      } catch {
        setErrorMessage('Error al cargar las clases o torneos.');
      } finally {
        setLoading(false);
      }
    };

    fetchInscripciones();
  }, []);

  const fetchClasesInscritas = async (usuarioId) => {
    const { data: inscripcionesClases, error: inscripcionesError } = await supabase
      .from('inscripcionesclases')
      .select('clase_id, fecha_inscripcion')
      .eq('usuario_id', usuarioId);

    if (inscripcionesError) throw inscripcionesError;

    const claseIds = inscripcionesClases.map(inscripcion => inscripcion.clase_id);
    if (claseIds.length === 0) {
      setClasesInscritas([]);
      return;
    }

    const { data: clases, error: clasesError } = await supabase
      .from('clases')
      .select('id, nombre, descripcion, horario, nivel, fecha_inicio, fecha_fin, precio_clase, usuarios (nombres, apellidos)')
      .in('id', claseIds);

    if (clasesError) throw clasesError;

    const clasesConInscripcion = clases.map(clase => {
      const inscripcion = inscripcionesClases.find(insc => insc.clase_id === clase.id);
      return { ...clase, fecha_inscripcion: inscripcion.fecha_inscripcion };
    });

    setClasesInscritas(clasesConInscripcion);
  };

  const fetchTorneosInscritos = async (usuarioId) => {
    const { data: inscripcionesTorneos, error: inscripcionesError } = await supabase
      .from('inscripcionestorneos')
      .select('torneo_id, fecha_inscripcion')
      .eq('usuario_id', usuarioId);

    if (inscripcionesError) throw inscripcionesError;

    const torneoIds = inscripcionesTorneos.map(inscripcion => inscripcion.torneo_id);
    if (torneoIds.length === 0) {
      setTorneosInscritos([]);
      return;
    }

    const { data: torneos, error: torneosError } = await supabase
      .from('torneos')
      .select('id, nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, categoria, precio_torneo, premios, cupo_maximo')
      .in('id', torneoIds);

    if (torneosError) throw torneosError;

    const torneosConInscripcion = torneos.map(torneo => {
      const inscripcion = inscripcionesTorneos.find(insc => insc.torneo_id === torneo.id);
      return { ...torneo, fecha_inscripcion: inscripcion.fecha_inscripcion };
    });

    setTorneosInscritos(torneosConInscripcion);
  };

  const handleDeleteInscripcion = (claseId) => {
    setInscripcionToDelete({ id: claseId, type: 'clases' }); // Guarda el ID y tipo
    setIsModalOpen(true); // Abre el modal
  };

  const handleDeleteInscripcionTorneo = (torneoId) => {
    setInscripcionToDelete({ id: torneoId, type: 'torneos' }); // Guarda el ID y tipo
    setIsModalOpen(true); // Abre el modal
  };

  const confirmDeleteInscripcion = async () => {
    if (!inscripcionToDelete) return; // Verifica que haya una inscripción seleccionada

    const { id, type } = inscripcionToDelete; // Obtiene el ID y tipo

    try {
      await deleteInscripcion(
        type === 'clases' ? 'inscripcionesclases' : 'inscripcionestorneos',
        id,
        type === 'clases' ? 'clase_id' : 'torneo_id',
        type === 'clases' ? setClasesInscritas : setTorneosInscritos
      );
    } finally {
      setIsModalOpen(false); // Cierra el modal
      setInscripcionToDelete(null); // Resetea el estado
    }
  };

  const deleteInscripcion = async (table, id, idField, setState) => {
    const token = localStorage.getItem('token');
    let usuarioId;

    try {
      const decoded = jwtDecode(token);
      usuarioId = decoded.id;
    } catch {
      toast.error('Error al procesar tu solicitud.');
      return;
    }

    const { error } = await supabase
      .from(table)
      .delete()
      .eq('usuario_id', usuarioId)
      .eq(idField, id);

    if (error) {
      toast.error('Hubo un problema al eliminar la inscripción.');
    } else {
      setState(prev => prev.filter(item => item.id !== id));
      toast.success('¡Inscripción eliminada correctamente!');
    }
  };

  // Desplazarse automáticamente a la sección de detalles al seleccionar una clase o torneo
  useEffect(() => {
    if ((selectedClase || selectedTorneo) && detallesRef.current) {
      detallesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedClase, selectedTorneo]);

  return (
    <div className="flex-grow p-6 flex flex-col md:flex-row">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Mis Clases Inscritas</h1>
        {loading ? (
          <p className="text-center text-lg">Cargando clases...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clasesInscritas.length > 0 ? (
              clasesInscritas.map(clase => (
                <CardItem 
                  key={clase.id} 
                  item={clase} 
                  type="class" 
                  onSelect={() => {
                    setSelectedClase(clase);
                    setSelectedTorneo(null); // Resetear torneo seleccionado
                  }} 
                />
              ))
            ) : (
              <p className="text-center text-lg text-gray-500">
                No estás inscrito en ninguna clase.
              </p>
            )}
          </div>
        )}

        <h1 className="text-2xl font-bold mb-6 mt-8">Mis Torneos Inscritos</h1>
        {loading ? (
          <p className="text-center text-lg">Cargando torneos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {torneosInscritos.length > 0 ? (
              torneosInscritos.map(torneo => (
                <CardItem 
                  key={torneo.id} 
                  item={torneo} 
                  type="tournament" 
                  onSelect={() => {
                    setSelectedTorneo(torneo);
                    setSelectedClase(null); // Resetear clase seleccionada
                  }} 
                />
              ))
            ) : (
              <p className="text-center text-lg text-gray-500">
                No estás inscrito en ningún torneo.
              </p>
            )}
          </div>
        )}
      </div>

      <div 
        className="w-full md:w-1/3 md:ml-6 mt-6 md:mt-0 flex justify-center items-center"
        ref={detallesRef} // Referencia a la sección de detalles
      >
        <div className="w-full max-w-xl"> {/* Se centra el contenido en pantallas grandes */}
          {selectedClase ? (
            <section 
              className="bg-white p-6 rounded-lg transition-shadow mb-4 md:mb-0"
              style={{ 
                boxShadow: '0 8px 16px rgba(69, 123, 157, 0.4)', // Sombra azul personalizada
                transition: 'box-shadow 0.3s ease-in-out' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 102, 204, 0.8)'} // Sombra más azul al pasar el cursor
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(69, 123, 157, 0.4)'} // Vuelve a la sombra original
            >
              <DetallesClase 
                clase={selectedClase} 
                onDelete={() => handleDeleteInscripcion(selectedClase.id)} 
              />
            </section>
          ) : selectedTorneo ? (
            <section 
              className="bg-white p-6 rounded-lg transition-shadow mb-4 md:mb-0"
              style={{ 
                boxShadow: '0 8px 16px rgba(69, 123, 157, 0.4)', // Sombra azul personalizada
                transition: 'box-shadow 0.3s ease-in-out' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 102, 204, 0.8)'} // Sombra más azul al pasar el cursor
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(69, 123, 157, 0.4)'} // Vuelve a la sombra original
            >
              <DetallesTorneo 
                torneo={selectedTorneo} 
                onDelete={() => handleDeleteInscripcionTorneo(selectedTorneo.id)} 
              />
            </section>
          ) : (
            <p className="text-center text-lg text-gray-500">
              Selecciona una clase o un torneo para ver los detalles.
            </p>
          )}
        </div>
      </div>


      {/* Modal de confirmación */}
      <ModalConfirmacion 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmDeleteInscripcion} 
      />
      
      <ToastContainer />
    </div>
  );
};

export default InscripcionesView;
