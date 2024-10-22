import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

const FormClases = () => {
  const [classData, setClassData] = useState({
    nombre: '',
    descripcion: '',
    horario: '',
    nivel: 'principiante', // Valor predeterminado
    instructor_id: '', // Se llenará con el ID de un instructor
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
      } else {
        setInstructors(fetchedInstructors);
      }
    };
    
    fetchInstructors();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de la clase a agregar:', classData);
    // Aquí puedes agregar la lógica para enviar los datos a Supabase
  };

  return (
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
        />
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Agregar Clase
      </button>
    </form>
  );
};

export default FormClases;
