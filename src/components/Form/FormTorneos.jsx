import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormTorneo = ({ onTournamentAdded }) => {
  const [tournamentData, setTournamentData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    ubicacion: '',
    categoria: 'principiante', // Valor por defecto
    premios: '',
    cupo_maximo: '',
    instructor_id: '', // Campo para el instructor
  });

  const [instructors, setInstructors] = useState([]); // Lista de instructores

  // Función para obtener la lista de instructores
  const fetchInstructors = async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('rol', 'instructor'); // Filtrar solo aquellos con rol de instructor
  
    if (error) {
      console.error('Error fetching instructors:', error);
      toast.error('Error al cargar instructores.');
    } else {
      setInstructors(data);
    }
  };

  // Llamar a la función para obtener instructores al montar el componente
  useEffect(() => {
    fetchInstructors();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournamentData({ ...tournamentData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de que todos los campos están llenos
    for (const key in tournamentData) {
      if (!tournamentData[key] && key !== 'descripcion' && key !== 'premios') {
        toast.error(`El campo ${key} es obligatorio.`);
        return;
      }
    }

    // Validación del campo "cupo_maximo"
    const cupoMaximo = parseInt(tournamentData.cupo_maximo, 10);
    if (cupoMaximo <= 0 || cupoMaximo > 16) {
      toast.error('El cupo debe ser mayor a 0 y menor o igual a 16.');
      return;
    }

    // Insertar torneo en la base de datos
    const { error } = await supabase.from('torneos').insert([tournamentData]);
    if (error) {
      console.error('Error al agregar el torneo:', error);
      toast.error('Error al agregar el torneo. Inténtalo de nuevo.');
    } else {
      toast.success('Torneo agregado exitosamente');
      setTournamentData({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        ubicacion: '',
        categoria: 'principiante',
        premios: '',
        cupo_maximo: '',
        instructor_id: '', // Reiniciar el campo de instructor
      });
      onTournamentAdded(); // Recargar datos después de agregar el torneo
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
        {/* Nombre del torneo */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={tournamentData.nombre}
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
            value={tournamentData.descripcion}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fecha de inicio */}
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={tournamentData.fecha_inicio}
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
            value={tournamentData.fecha_fin}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Ubicación */}
        <div className="mb-4">
          <label className="block text-gray-700">Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            value={tournamentData.ubicacion}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label className="block text-gray-700">Categoría</label>
          <select
            name="categoria"
            value={tournamentData.categoria}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        {/* Instructores */}
        <div className="mb-4">
          <label className="block text-gray-700">Seleccionar Instructor</label>
          <select
            name="instructor_id"
            value={tournamentData.instructor_id}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccione un instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {`${instructor.nombres} ${instructor.apellidos}`} {/* Modificado para incluir nombres y apellidos */}
              </option>
            ))}
          </select>
        </div>

        {/* Premios */}
        <div className="mb-4">
          <label className="block text-gray-700">Premios</label>
          <textarea
            name="premios"
            value={tournamentData.premios}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Cupo máximo */}
        <div className="mb-4">
          <label className="block text-gray-700">Cupo Máximo</label>
          <input
            type="number"
            name="cupo_maximo"
            value={tournamentData.cupo_maximo}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Botón de submit */}
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Agregar Torneo
        </button>
      </form>
    </>
  );
};

export default FormTorneo;
