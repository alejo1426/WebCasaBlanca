import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormUpdateClases = ({ initialData, onUpdate }) => {
  const [classData, setClassData] = useState({
    nombre: '',
    descripcion: '',
    horario: '',
    nivel: 'principiante',
    instructor_id: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  const [instructors, setInstructors] = useState([]);

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

  // Cargar datos iniciales si se proporcionan
  useEffect(() => {
    if (initialData) {
      setClassData(initialData);
    }
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

    // Preparar solo los campos que han cambiado para la actualización
    const updatedFields = {};
    for (const key in classData) {
        if (classData[key] !== initialData[key]) {
            updatedFields[key] = classData[key];
        }
    }

    // Validar que se hayan realizado modificaciones
    if (Object.keys(updatedFields).length === 0) {
        toast.info('No se modificó ningún campo.');
        return;
    }

    try {
        const { error } = await supabase
            .from('clases')
            .update(updatedFields)
            .eq('id', initialData.id);

        if (error) {
            throw error;
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={classData.descripcion}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: 7am - 8am"
            required
          />
        </div>

        {/* Nivel */}
        <div className="mb-4">
          <label className="block text-gray-700">Nivel</label>
          <select
            name="nivel"
            value={classData.nivel}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        {/* Instructor */}
        <div className="mb-4">
          <label className="block text-gray-700">Instructor</label>
          <select
            name="instructor_id"
            value={classData.instructor_id}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecciona un instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {`${instructor.nombres} ${instructor.apellidos}`}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha de inicio */}
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={classData.fecha_inicio}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Fecha de fin */}
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={classData.fecha_fin}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Botón para enviar */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Modificar Clase
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormUpdateClases;
