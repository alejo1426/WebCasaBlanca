import { supabase } from '../../../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormInscripcionClases = ({ selectedItem }) => {
  const { nombre, descripcion, usuarios, horario, nivel: nivelClase, fecha_inicio, fecha_fin, id: claseId } = selectedItem;

  const handleInscripcion = async () => {
    const token = localStorage.getItem('token');

    // Decodificar el token para obtener el usuario_id
    let usuarioId;
    try {
      const decoded = jwtDecode(token);
      usuarioId = decoded.id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      toast.error('Error al decodificar el token.');
      return;
    }

    // Verificar si el usuario ya está inscrito en la clase
    const { data: inscripciones, error: inscripcionError } = await supabase
      .from('inscripcionesclases')
      .select('*')
      .eq('usuario_id', usuarioId)
      .eq('clase_id', claseId);

    if (inscripcionError) {
      console.error('Error al verificar la inscripción:', inscripcionError);
      toast.error('Error al verificar la inscripción.');
      return;
    }

    if (inscripciones.length > 0) {
      toast.warn('Ya estás inscrito en esta clase.');
      return;
    }

    // Obtener el nivel del usuario desde Supabase
    let usuarioNivel;
    try {
      const { data: usuarioData, error: usuarioError } = await supabase
        .from('usuarios')
        .select('nivel_aprendizaje')
        .eq('id', usuarioId)
        .single();
      
      if (usuarioError) {
        console.error("Error al obtener el nivel del usuario:", usuarioError);
        toast.error('No se pudo obtener el nivel del usuario.');
        return;
      }
      usuarioNivel = usuarioData.nivel_aprendizaje;
    } catch (error) {
      console.error('Error al buscar el nivel del usuario:', error);
      toast.error('Error al buscar el nivel del usuario.');
      return;
    }

    // Validar si el nivel del usuario coincide con el nivel de la clase
    if (usuarioNivel !== nivelClase) {
      toast.error(`No puedes inscribirte. Tu nivel es ${usuarioNivel}, pero la clase es de nivel ${nivelClase}.`);
      return;
    }

    // Usar Supabase para insertar en la tabla InscripcionesClases
    try {
      const { data, error } = await supabase
        .from('inscripcionesclases')
        .insert([{ usuario_id: usuarioId, clase_id: claseId }]);
      
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

  const formattedFechaInicio = new Date(fecha_inicio).toLocaleDateString('es-ES', { timeZone: 'UTC' });
  const formattedFechaFin = new Date(fecha_fin).toLocaleDateString('es-ES', { timeZone: 'UTC' });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg">Formulario de Inscripción - Clase: {nombre}</h2>
      <p><strong>Descripción:</strong> {descripcion}</p>
      <p><strong>Profesor:</strong> {usuarios?.nombres ? `${usuarios.nombres} ${usuarios.apellidos}` : 'Sin asignar'}</p>
      <p><strong>Horario:</strong> {horario}</p>
      <p><strong>Nivel:</strong> {nivelClase}</p>
      <p><strong>Fecha de Inicio:</strong> {formattedFechaInicio}</p>
      <p><strong>Fecha de Fin:</strong> {formattedFechaFin}</p>

      <button onClick={handleSubmit} className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Inscribirse
      </button>

      {/* Contenedor de Toastify */}
      <ToastContainer />
    </div>
  );
};

export default FormInscripcionClases;
