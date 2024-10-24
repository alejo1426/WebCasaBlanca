import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import CardItem from '../Card/CardItem';
import DetallesClase from '../DetallesViewInscripciones/DetallesClase';
import DetallesTorneo from '../DetallesViewInscripciones/DetallesTorneo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InscripcionesView = () => {
  const [clasesInscritas, setClasesInscritas] = useState([]);
  const [torneosInscritos, setTorneosInscritos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedClase, setSelectedClase] = useState(null);
  const [selectedTorneo, setSelectedTorneo] = useState(null);

  useEffect(() => {
    const fetchClasesInscritas = async () => {
      const token = localStorage.getItem('token');
      let usuarioId;

      try {
        const decoded = jwtDecode(token);
        usuarioId = decoded.id;
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setErrorMessage('No se pudo obtener el ID del usuario.');
        return;
      }

      try {
        setLoading(true);
        
        // Obtener inscripciones a clases
        const { data: inscripcionesClases, error: inscripcionesError } = await supabase
          .from('inscripcionesclases')
          .select('clase_id, fecha_inscripcion')
          .eq('usuario_id', usuarioId);

        if (inscripcionesError) throw inscripcionesError;

        const claseIds = inscripcionesClases.map(inscripcion => inscripcion.clase_id);

        if (claseIds.length === 0) {
          setClasesInscritas([]);
        } else {
          const { data: clases, error: clasesError } = await supabase
            .from('clases')
            .select('id, nombre, descripcion, horario, nivel, fecha_inicio, fecha_fin, usuarios!clases_instructor_id_fkey(nombres, apellidos)')
            .in('id', claseIds);

          if (clasesError) throw clasesError;

          const clasesConInscripcion = clases.map(clase => {
            const inscripcion = inscripcionesClases.find(insc => insc.clase_id === clase.id);
            return { ...clase, fecha_inscripcion: inscripcion.fecha_inscripcion };
          });

          setClasesInscritas(clasesConInscripcion);
        }

        // Obtener inscripciones a torneos
        const { data: inscripcionesTorneos, error: inscripcionesTorneoError } = await supabase
          .from('inscripcionestorneos')
          .select('torneo_id, fecha_inscripcion')
          .eq('usuario_id', usuarioId);

        if (inscripcionesTorneoError) throw inscripcionesTorneoError;

        const torneoIds = inscripcionesTorneos.map(inscripcion => inscripcion.torneo_id);

        if (torneoIds.length > 0) {
          const { data: torneos, error: torneosError } = await supabase
            .from('torneos')
            .select('id, nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, categoria, premios, cupo_maximo')
            .in('id', torneoIds);

          if (torneosError) throw torneosError;

          const torneosConInscripcion = torneos.map(torneo => {
            const inscripcion = inscripcionesTorneos.find(insc => insc.torneo_id === torneo.id);
            return { ...torneo, fecha_inscripcion: inscripcion.fecha_inscripcion };
          });

          setTorneosInscritos(torneosConInscripcion);
        } else {
          setTorneosInscritos([]);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setErrorMessage('Error al cargar las clases o torneos.');
      } finally {
        setLoading(false);
      }
    };

    fetchClasesInscritas();
  }, []);

  const handleDeleteInscripcion = async (claseId) => {
    const token = localStorage.getItem('token');
    let usuarioId;

    try {
      const decoded = jwtDecode(token);
      usuarioId = decoded.id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      toast.error('Error al procesar tu solicitud.');
      return;
    }

    const { error } = await supabase
      .from('inscripcionesclases')
      .delete()
      .eq('usuario_id', usuarioId)
      .eq('clase_id', claseId);

    if (error) {
      console.error('Error al eliminar la inscripción:', error);
      toast.error('Hubo un problema al eliminar la inscripción.');
    } else {
      setClasesInscritas(prev => prev.filter(clase => clase.id !== claseId));
      toast.success('¡Inscripción eliminada correctamente!');
      setSelectedClase(null);
    }
  };

  const handleDeleteInscripcionTorneo = async (torneoId) => {
    const token = localStorage.getItem('token');
    let usuarioId;

    try {
      const decoded = jwtDecode(token);
      usuarioId = decoded.id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      toast.error('Error al procesar tu solicitud.');
      return;
    }

    const { error } = await supabase
      .from('inscripcionestorneos')
      .delete()
      .eq('usuario_id', usuarioId)
      .eq('torneo_id', torneoId);

    if (error) {
      console.error('Error al eliminar la inscripción:', error);
      toast.error('Hubo un problema al eliminar la inscripción al torneo.');
    } else {
      setTorneosInscritos(prev => prev.filter(torneo => torneo.id !== torneoId));
      toast.success('¡Inscripción al torneo eliminada correctamente!');
      setSelectedTorneo(null);
    }
  };

  return (
    <div className="flex-grow p-4 flex">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Mis Clases Inscritas</h1>
        {loading ? (
          <p className="text-center text-lg">Cargando clases...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Sección de torneos */}
        <h1 className="text-2xl font-bold mb-4 mt-8">Mis Torneos Inscritos</h1>
        {loading ? (
          <p className="text-center text-lg">Cargando torneos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Detalles de la clase o torneo seleccionado */}
      <div className="w-1/3 ml-4">
        {selectedClase ? (
          <DetallesClase 
            clase={selectedClase} 
            onDelete={() => handleDeleteInscripcion(selectedClase.id)} 
          />
        ) : selectedTorneo ? (
          <DetallesTorneo 
            torneo={selectedTorneo} 
            onDelete={() => handleDeleteInscripcionTorneo(selectedTorneo.id)} 
          />
        ) : (
          <p className="text-center text-lg text-gray-500">
            Selecciona una clase o un torneo para ver los detalles.
          </p>
        )}
      </div>

      {/* Contenedor de Toastify */}
      <ToastContainer />
    </div>
  );
};

export default InscripcionesView;
