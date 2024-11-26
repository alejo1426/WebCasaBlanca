import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormUpdateClases = ({ initialData, onUpdate }) => {
  const [classData, setClassData] = useState({
    nombre: '',
    descripcion: '',
    horario: '',
    precio_clase: '',
    nivel: 'principiante',
    instructor_id: '',
    fecha_inicio: '',
    fecha_fin: '',
    cancha_id: '', // Campo para la cancha
  });

  const [instructors, setInstructors] = useState([]);
  const [canchas, setCanchas] = useState([]); // Para obtener las canchas disponibles

  // Obtener la lista de instructores desde la tabla Usuarios
  useEffect(() => {
    const fetchInstructors = async () => {
      const { data: fetchedInstructors, error } = await supabase
        .from('usuarios')
        .select('id, nombres, apellidos')
        .eq('rol', 'instructor');

      if (error) {
        console.error('Error fetching instructors:', error);
        toast.error('Error al obtener instructores');
      } else {
        setInstructors(fetchedInstructors);
      }
    };

    fetchInstructors();
  }, []);

  // Obtener las canchas disponibles desde la tabla Canchas
  useEffect(() => {
    const fetchCanchas = async () => {
      const { data: fetchedCanchas, error } = await supabase
        .from('canchas')
        .select('id, nombre');

      if (error) {
        console.error('Error fetching canchas:', error);
        toast.error('Error al obtener canchas');
      } else {
        setCanchas(fetchedCanchas);
      }
    };

    fetchCanchas();
  }, []);

  // Cargar datos iniciales si se proporcionan
  useEffect(() => {
    const fetchCancha = async () => {
      if (initialData) {
        // Obtener la cancha asociada a la clase desde la tabla pivote 'clasescanchas'
        const { data: canchaData, error } = await supabase
          .from('clasescanchas')
          .select('cancha_id')
          .eq('clase_id', initialData.id)
          .single(); // Solo debe haber una asociación por clase

        if (error) {
          console.error('Error fetching cancha for class:', error);
          toast.error('Error al obtener la cancha asociada');
        } else {
          setClassData({
            ...initialData,
            cancha_id: canchaData ? canchaData.cancha_id : '', // Cargar la cancha asociada
          });
        }
      }
    };

    fetchCancha();
  }, [initialData]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  // Validar el formato del horario
  const isHorarioValido = (horario) => {
    const horarioRegex = /^(1[0-2]|[1-9])(am|pm) - (1[0-2]|[1-9])(am|pm)$/;
    return horarioRegex.test(horario);
  };

  // Validar fechas: fecha_fin debe ser posterior a fecha_inicio
  const areDatesValid = () => {
    if (classData.fecha_fin && classData.fecha_inicio > classData.fecha_fin) {
      toast.error('La fecha de fin debe ser posterior a la fecha de inicio.');
      return false;
    }
    return true;
  };

  // Comprobar si ya existe una clase con el mismo horario y fecha de inicio, excluyendo la propia clase si no han cambiado
  const claseConflicto = async () => {
    if (
      initialData.fecha_inicio === classData.fecha_inicio &&
      initialData.horario === classData.horario
    ) {
      return false; // No hay conflicto si no han cambiado estos campos
    }

    const { data, error } = await supabase
      .from('clases')
      .select('id')
      .eq('fecha_inicio', classData.fecha_inicio)
      .eq('horario', classData.horario)
      .neq('id', initialData.id);

    if (error) {
      console.error('Error al verificar conflictos de horario:', error);
      toast.error('Error al verificar horarios');
      return false;
    }
    return data.length > 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos de la clase a modificar:', classData);

    // Validar que todos los campos estén llenos
    if (Object.values(classData).some((value) => value === '')) {
      toast.error('Todos los campos deben estar llenos.');
      return;
    }

    // Validar fechas
    if (!areDatesValid()) {
      return;
    }

    // Validar horario
    if (!isHorarioValido(classData.horario)) {
      toast.error('El horario debe estar en el formato correcto (ej: 7am - 8am)');
      return;
    }

    // Comprobar conflictos
    const conflicto = await claseConflicto();
    if (conflicto) {
      toast.error('Ya existe una clase programada para ese horario y fecha de inicio.');
      return;
    }

    if (classData.precio_clase < 20000) {
      toast.error("El precio no puede ser negativo ni menor a 20.000");
      return;
    }

    // Detectar si hubo cambios en los campos de 'clases'
    const updatedFields = {};
    for (const key in classData) {
      if (classData[key] !== initialData[key] && key !== 'cancha_id') {
        updatedFields[key] = classData[key];
      }
    }

    // Detectar si cambió la cancha
    const canchaChanged = classData.cancha_id !== initialData.cancha_id;

    // Validar si no hay cambios
    if (Object.keys(updatedFields).length === 0 && !canchaChanged) {
      toast.info('No se modificó ningún campo.');
      return;
    }

    try {
      // Primero, actualizamos los datos de la clase en la tabla 'clases', si corresponde
      if (Object.keys(updatedFields).length > 0) {
        const { error: updateClassError } = await supabase
          .from('clases')
          .update(updatedFields)
          .eq('id', initialData.id);

        if (updateClassError) {
          throw updateClassError;
        }
      }

      // Actualizar la cancha en la tabla pivote 'clasescanchas', si cambió
      if (canchaChanged) {
        // Eliminar la asociación anterior
        const { error: deleteCanchaError } = await supabase
          .from('clasescanchas')
          .delete()
          .eq('clase_id', initialData.id);

        if (deleteCanchaError) {
          throw deleteCanchaError;
        }

        // Insertar la nueva asociación
        const { error: insertCanchaError } = await supabase
          .from('clasescanchas')
          .insert([{ clase_id: initialData.id, cancha_id: classData.cancha_id }]);

        if (insertCanchaError) {
          throw insertCanchaError;
        }
      }

      toast.success('Clase modificada con éxito');
      onUpdate(); // Llamamos a onUpdate para actualizar la lista de resultados
    } catch (error) {
      console.error('Error al modificar la clase:', error);
      toast.error('Error al modificar la clase');
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
        {/* Nombre de la clase */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={classData.nombre}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={classData.descripcion}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Horario */}
        <div className="mb-4">
          <label className="block text-gray-700">Horario</label>
          <input
            type="text"
            name="horario"
            value={classData.horario}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Precio por clase */}
        <div className="mb-4">
          <label className="block text-gray-700">Precio por clase</label>
          <input
            type="number"
            name="precio_clase"
            value={classData.precio_clase}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Nivel */}
        <div className="mb-4">
          <label className="block text-gray-700">Nivel</label>
          <select
            name="nivel"
            value={classData.nivel}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-black pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        {/* Fecha de inicio */}
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={classData.fecha_inicio}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fecha de fin */}
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={classData.fecha_fin}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Instructor */}
        <div className="mb-4">
          <label className="block text-gray-700">Instructor</label>
          <select
            name="instructor_id"
            value={classData.instructor_id}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-black pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.nombres} {instructor.apellidos}
              </option>
            ))}
          </select>
        </div>

        {/* Cancha */}
        <div className="mb-4">
          <label className="block text-gray-700">Cancha</label>
          <select
            name="cancha_id"
            value={classData.cancha_id}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-black pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {canchas.map((cancha) => (
              <option key={cancha.id} value={cancha.id}>
                {cancha.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
          Actualizar clase
        </button>
      </form>

      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
      />
    </>
  );
};

export default FormUpdateClases;
