import { supabase } from '../../../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormInscripcionTorneos = ({ selectedItem }) => {
  const { 
    nombre, 
    descripcion, 
    fecha_inicio, 
    fecha_fin, 
    ubicacion, 
    categoria, 
    premios, 
    cupo_maximo, 
    id: torneoId 
  } = selectedItem;

  const formattedFechaInicio = new Date(fecha_inicio).toLocaleDateString('es-ES', { timeZone: 'UTC' });
  const formattedFechaFin = new Date(fecha_fin).toLocaleDateString('es-ES', { timeZone: 'UTC' });

  const handleError = (message) => {
    console.error(message);
    toast.error(message);
  };

  const handleInscripcion = async () => {
    const token = localStorage.getItem('token');
    let usuarioId;

    // Decodificar el token para obtener el usuario_id
    try {
      const decoded = jwtDecode(token);
      usuarioId = decoded.id;
    } catch {
      handleError('Error al decodificar el token.');
      return;
    }

    // Obtener el nivel del usuario desde Supabase
    let usuarioCategoria;
    try {
      const { data: usuarioData, error: usuarioError } = await supabase
        .from('usuarios')
        .select('nivel_aprendizaje')
        .eq('id', usuarioId)
        .single();
      
      if (usuarioError) throw usuarioError;
      usuarioCategoria = usuarioData.nivel_aprendizaje; // Asegúrate de que esto refleja la categoría
    } catch {
      handleError('Error al obtener la categoría del usuario.');
      return;
    }

    // Validar si la categoría del usuario coincide con la categoría del torneo
    if (usuarioCategoria !== categoria) {
      handleError(`No puedes inscribirte. Tu categoría es ${usuarioCategoria}, pero el torneo es de categoría ${categoria}.`);
      return;
    }

    // Verificar si el usuario ya está inscrito en el torneo
    try {
      const { data: inscripciones, error: inscripcionError } = await supabase
        .from('inscripcionestorneos')
        .select('*')
        .eq('usuario_id', usuarioId)
        .eq('torneo_id', torneoId);

      if (inscripcionError) throw inscripcionError;

      if (inscripciones.length > 0) {
        toast.warning('Ya estás inscrito en este torneo.');
        return;
      }
    } catch {
      handleError('Error al verificar la inscripción.');
      return;
    }

    // Usar Supabase para insertar en la tabla InscripcionesTorneos
    try {
      const { error } = await supabase
        .from('inscripcionestorneos')
        .insert([{ usuario_id: usuarioId, torneo_id: torneoId }]);
      
      if (error) throw error;
      toast.success('¡Inscripción exitosa!');
    } catch {
      handleError('Hubo un problema al procesar la inscripción. Por favor, intenta de nuevo.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInscripcion();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="font-bold text-xl text-center mb-4">Formulario de Inscripción - Torneo: {nombre}</h2>
      <div className="space-y-2">
        <p><strong>Descripción:</strong> {descripcion}</p>
        <p><strong>Fecha de Inicio:</strong> {formattedFechaInicio}</p>
        <p><strong>Fecha de Fin:</strong> {formattedFechaFin}</p>
        <p><strong>Ubicación:</strong> {ubicacion}</p>
        <p><strong>Categoría:</strong> {categoria}</p>
        <p><strong>Premios:</strong> {premios}</p>
        <p><strong>Cupo Máximo:</strong> {cupo_maximo}</p>
      </div>

      <button 
        onClick={handleSubmit} 
        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Inscribirse
      </button>

      <ToastContainer />
    </div>
  );
};

export default FormInscripcionTorneos;
