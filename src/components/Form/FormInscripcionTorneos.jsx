import { supabase } from '../../../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify'; // Asegúrate de tener la biblioteca instalada
import 'react-toastify/dist/ReactToastify.css';

const FormInscripcionTorneos = ({ selectedItem }) => {
  const { 
    nombre, 
    descripcion, 
    fecha_inicio, 
    fecha_fin, 
    ubicacion, 
    categoria, // Cambiado a categoría
    premios, 
    cupo_maximo,
    id: torneoId // Asegúrate de tener el ID del torneo
  } = selectedItem;

  const formattedFechaInicio = new Date(fecha_inicio).toLocaleDateString('es-ES', { timeZone: 'UTC' });
  const formattedFechaFin = new Date(fecha_fin).toLocaleDateString('es-ES', { timeZone: 'UTC' });

  const handleInscripcion = async () => {
    const token = localStorage.getItem('token');
    let usuarioId;

    // Decodificar el token para obtener el usuario_id
    try {
      const decoded = jwtDecode(token);
      usuarioId = decoded.id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      toast.error('Error al procesar tu solicitud.');
      return;
    }

    // Obtener el nivel del usuario desde Supabase
    let usuarioCategoria;
    try {
      const { data: usuarioData, error: usuarioError } = await supabase
        .from('usuarios')
        .select('nivel_aprendizaje') // Asegúrate de que este campo es correcto
        .eq('id', usuarioId)
        .single();
      
      if (usuarioError) {
        console.error("Error al obtener la categoría del usuario:", usuarioError);
        toast.error('No se pudo obtener la categoría del usuario.');
        return;
      }
      usuarioCategoria = usuarioData.nivel_aprendizaje; // Asegúrate de que esto refleja la categoría
    } catch (error) {
      console.error('Error al buscar la categoría del usuario:', error);
      toast.error('Error al buscar la categoría del usuario.');
      return;
    }

    // Validar si la categoría del usuario coincide con la categoría del torneo
    if (usuarioCategoria !== categoria) {
      toast.error(`No puedes inscribirte. Tu categoría es ${usuarioCategoria}, pero el torneo es de categoría ${categoria}.`);
      return;
    }

    // Verificar si el usuario ya está inscrito en el torneo
    const { data: inscripciones, error: inscripcionError } = await supabase
      .from('inscripcionestorneos') // Asegúrate que este es el nombre correcto de tu tabla
      .select('*')
      .eq('usuario_id', usuarioId)
      .eq('torneo_id', torneoId);

    if (inscripcionError) {
      console.error('Error al verificar la inscripción:', inscripcionError);
      toast.error('Error al verificar tu inscripción.');
      return;
    }

    if (inscripciones.length > 0) {
      toast.warning('Ya estás inscrito en este torneo.');
      return;
    }

    // Usar Supabase para insertar en la tabla InscripcionesTorneos
    try {
      const { data, error } = await supabase
        .from('inscripcionestorneos') // Asegúrate que este es el nombre correcto de tu tabla
        .insert([{ usuario_id: usuarioId, torneo_id: torneoId }]);
      
      if (error) {
        console.error('Error al inscribir:', error);
        toast.error('Hubo un problema al procesar la inscripción. Por favor, intenta de nuevo.');
      } else {
        console.log('Inscripción exitosa:', data);
        toast.success('¡Inscripción exitosa!');
      }
    } catch (error) {
      console.error('Error al procesar la inscripción:', error);
      toast.error('Ocurrió un error inesperado.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInscripcion();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg">Formulario de Inscripción - Torneo: {nombre}</h2>
      <p><strong>Descripción:</strong> {descripcion}</p>
      <p><strong>Fecha de Inicio:</strong> {formattedFechaInicio}</p>
      <p><strong>Fecha de Fin:</strong> {formattedFechaFin}</p>
      <p><strong>Ubicación:</strong> {ubicacion}</p>
      <p><strong>Categoría:</strong> {categoria}</p>
      <p><strong>Premios:</strong> {premios}</p>
      <p><strong>Cupo Máximo:</strong> {cupo_maximo}</p>

      <button onClick={handleSubmit} className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Inscribirse
      </button>

      {/* Contenedor de Toastify */}
      <ToastContainer />
    </div>
  );
};

export default FormInscripcionTorneos;
