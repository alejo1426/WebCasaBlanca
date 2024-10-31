/* eslint-disable react/prop-types */
import { supabase } from '../../../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormInscripcionClases = ({ selectedItem }) => {
  const { 
    nombre, 
    descripcion, 
    usuarios, 
    horario, 
    nivel: nivelClase, 
    fecha_inicio, 
    fecha_fin, 
    id: claseId 
  } = selectedItem;

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

    // Verificar si el usuario ya está inscrito en la clase
    try {
      const { data: inscripciones, error: inscripcionError } = await supabase
        .from('inscripcionesclases')
        .select('*')
        .eq('usuario_id', usuarioId)
        .eq('clase_id', claseId);

      if (inscripcionError) throw inscripcionError;

      if (inscripciones.length > 0) {
        toast.warn('Ya estás inscrito en esta clase.');
        return;
      }
    } catch {
      handleError('Error al verificar la inscripción.');
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

      if (usuarioError) throw usuarioError;
      usuarioNivel = usuarioData.nivel_aprendizaje;
    } catch {
      handleError('No se pudo obtener el nivel del usuario.');
      return;
    }

    // Validar si el nivel del usuario coincide con el nivel de la clase
    if (usuarioNivel !== nivelClase) {
      handleError(`No puedes inscribirte. Tu nivel es ${usuarioNivel}, pero la clase es de nivel ${nivelClase}.`);
      return;
    }

    // Inscribir al usuario en la clase
    try {
      const { error } = await supabase
        .from('inscripcionesclases')
        .insert([{ usuario_id: usuarioId, clase_id: claseId }]);
      
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

  const formattedFechaInicio = new Date(fecha_inicio).toLocaleDateString('es-ES', { timeZone: 'UTC' });
  const formattedFechaFin = new Date(fecha_fin).toLocaleDateString('es-ES', { timeZone: 'UTC' });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="font-bold text-xl text-center mb-4">Inscripción a Clase: {nombre}</h2>
      <div className="space-y-2">
        <p><strong>Descripción:</strong> {descripcion}</p>
        <p><strong>Profesor:</strong> {usuarios?.nombres ? `${usuarios.nombres} ${usuarios.apellidos}` : 'Sin asignar'}</p>
        <p><strong>Horario:</strong> {horario}</p>
        <p><strong>Nivel:</strong> {nivelClase}</p>
        <p><strong>Fecha de Inicio:</strong> {formattedFechaInicio}</p>
        <p><strong>Fecha de Fin:</strong> {formattedFechaFin}</p>
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

export default FormInscripcionClases;
