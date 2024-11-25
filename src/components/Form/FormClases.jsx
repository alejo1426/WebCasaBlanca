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
    precio_clase: '',
    // El campo cancha_id ya no va aquí
  });

  const [instructors, setInstructors] = useState([]);
  const [canchas, setCanchas] = useState([]);

  // Obtener instructores y canchas
  useEffect(() => {
    const fetchInstructorsAndCanchas = async () => {
      // Obtener instructores
      const { data: fetchedInstructors, error: instructorError } = await supabase
        .from('usuarios')
        .select('id, nombres, apellidos')
        .eq('rol', 'instructor');
      
      if (instructorError) {
        console.error('Error fetching instructors:', instructorError);
      } else {
        setInstructors(fetchedInstructors);
      }

      // Obtener canchas
      const { data: fetchedCanchas, error: canchaError } = await supabase
        .from('canchas')
        .select('id, nombre');
      
      if (canchaError) {
        console.error('Error fetching canchas:', canchaError);
      } else {
        setCanchas(fetchedCanchas);
      }
    };

    fetchInstructorsAndCanchas();
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

    // Insertar clase sin cancha_id
    const { data: insertedClass, error: insertClassError } = await supabase
      .from('clases')
      .insert([{
        nombre: classData.nombre,
        descripcion: classData.descripcion,
        horario: classData.horario,
        nivel: classData.nivel,
        instructor_id: classData.instructor_id,
        fecha_inicio: classData.fecha_inicio,
        fecha_fin: classData.fecha_fin,
        precio_clase: classData.precio_clase,
      }])
      .select('id'); // Obtener el ID de la clase recién insertada

    if (insertClassError) {
      console.error('Error inserting class:', insertClassError);
      toast.error('Error al agregar la clase.');
      return;
    }

    const classId = insertedClass[0].id;

    // Insertar la relación clase-cancha en la tabla 'clasescanchas'
    const { error: insertRelationError } = await supabase
      .from('clasescanchas')
      .insert([
        {
          clase_id: classId,
          cancha_id: classData.cancha_id, // Usamos el ID de la cancha seleccionada
        },
      ]);

    if (insertRelationError) {
      console.error('Error inserting class-court relation:', insertRelationError);
      toast.error('Error al agregar la relación clase-cancha.');
      return;
    }

    toast.success('Clase agregados exitosamente');

    // Restablecer datos del formulario
    setClassData({
      nombre: '',
      descripcion: '',
      horario: '',
      nivel: 'principiante',
      instructor_id: '',
      fecha_inicio: '',
      fecha_fin: '',
      precio_clase: '',
    });

    onClassAdded(); // Recargar datos después de agregar la clase
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

        {/* Precio */}
        <div className="mb-4">
          <label className="block text-gray-700">Precio Clase</label>
          <input
            type="number"
            name="precio_clase"
            value={classData.precio_clase}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
            required
          />
        </div>

        {/* Cancha */}
        <div className="mb-4">
          <label className="block text-gray-700">Cancha</label>
          <select
            name="cancha_id"
            value={classData.cancha_id}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecciona una cancha</option>
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
          Agregar Clase
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormClases;
