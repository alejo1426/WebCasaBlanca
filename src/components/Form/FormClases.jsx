/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormClases = ({ onClassAdded }) => {
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

  useEffect(() => {
    const fetchInstructors = async () => {
      const { data: fetchedInstructors, error } = await supabase
        .from('usuarios')
        .select('id, nombres, apellidos')
        .eq('rol', 'instructor');

      if (error) {
        console.error('Error fetching instructors:', error);
      } else {
        setInstructors(fetchedInstructors);
      }
    };

    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const validateHorario = (horario) => {
    const horarioRegex = /^(1[0-2]|[1-9])(am|pm) - (1[0-2]|[1-9])(am|pm)$/;
    return horarioRegex.test(horario);
  };

  const areDatesValid = () => {
    const fechaInicio = new Date(classData.fecha_inicio);
    const fechaFin = new Date(classData.fecha_fin);
  
    if (classData.fecha_fin && fechaInicio > fechaFin) {
      toast.error('La fecha de fin debe ser posterior a la fecha de inicio.');
      return false;
    }
    return true;
  };

  const checkClassExists = async () => {
    const { data, error } = await supabase
      .from('clases')
      .select('*')
      .eq('horario', classData.horario)
      .eq('fecha_inicio', classData.fecha_inicio)
      .eq('nivel', classData.nivel);

    if (error) {
      console.error('Error checking existing classes:', error);
    }

    return data.length > 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!Object.values(classData).every((field) => field !== '')) {
      toast.error('Todos los campos deben estar llenos.');
      return;
    }

    if (!areDatesValid()) {
      return;
    }

    if (!validateHorario(classData.horario)) {
      toast.error('El horario debe tener el formato correcto (ej. 7am - 8am).');
      return;
    }

    const classExists = await checkClassExists();
    if (classExists) {
      toast.error('Ya existe una clase en este horario y nivel.');
      return;
    }

    const { data, error } = await supabase
      .from('clases')
      .insert([classData]);

    if (error) {
      console.error('Error inserting class:', error);
      toast.error('Error al agregar la clase.');
    } else {
      console.log('Clase agregada:', data);
      toast.success('Clase agregada con éxito.');

      // Llamar a la función para recargar los datos
      onClassAdded();

      setClassData({
        nombre: '',
        descripcion: '',
        horario: '',
        nivel: 'principiante',
        instructor_id: '',
        fecha_inicio: '',
        fecha_fin: '',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
        {/* Nombre de la clase */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={classData.nombre}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
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
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
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
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
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
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
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
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
            required
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Agregar Clase
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormClases;
