/* eslint-disable react/prop-types */
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
    categoria: 'principiante',
    precio_torneo: '',
    horario: '',
    cancha_id: '', // Valor por defecto
    premios: '',
    cupo_maximo: '',
    instructor_id: '', // Campo para el instructor
  });

  const [instructors, setInstructors] = useState([]);
  const [cancha, setCancha] = useState([]); // Lista de canchas

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

  // Función para obtener la lista de canchas
  const fetchCanchas = async () => {
    const { data, error } = await supabase
      .from('canchas')
      .select('id, nombre'); // Asegurarse de traer id y nombre
  
    if (error) {
      console.error('Error fetching canchas:', error);
      toast.error('Error al cargar canchas.');
    } else {
      setCancha(data);
    }
  };

  // Llamar a la función para obtener instructores y canchas al montar el componente
  useEffect(() => {
    fetchInstructors();
    fetchCanchas();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournamentData({ ...tournamentData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de campos obligatorios
    for (const key in tournamentData) {
      if (!tournamentData[key] && key !== 'descripcion' && key !== 'premios') {
        toast.error(`El campo ${key} es obligatorio.`);
        return;
      }
    }
  
    // Validación de formato del horario (6am - 7am)
    const horarioRegex = /^\d{1,2}(am|pm)\s-\s\d{1,2}(am|pm)$/;
    if (!horarioRegex.test(tournamentData.horario)) {
      toast.error(
        'El campo horario debe tener el formato "6am - 7am". Por favor corrige el valor.'
      );
      return;
    }
  
    // Validación de fechas
    const fechaInicio = new Date(tournamentData.fecha_inicio);
    const fechaFin = new Date(tournamentData.fecha_fin);
    if (fechaInicio > fechaFin) {
      toast.error('La fecha de inicio no puede ser posterior a la fecha de fin.');
      return;
    }
  
    if (fechaFin < fechaInicio) {
      toast.error('La fecha de fin no puede ser anterior a la fecha de inicio.');
      return;
    }
  
    // Validación del campo "precio_torneo"
    const precio = parseFloat(tournamentData.precio_torneo);
    if (precio < 20000) {
      toast.error('El precio del torneo no puede ser menor a 20.000');
      return;
    }
  
    // Validación del campo "cupo_maximo"
    const cupoMaximo = parseInt(tournamentData.cupo_maximo, 10);
    if (cupoMaximo !== 16) {
      toast.error('El cupo máximo debe ser exactamente 16.');
      return;
    }
  
    // Primero insertamos el torneo en la tabla 'torneos' sin el campo 'cancha_id'
    const { cancha_id, ...torneoSinCancha } = tournamentData;
  
    const { data: torneoData, error: torneoError } = await supabase
      .from('torneos')
      .insert([torneoSinCancha])
      .select('id'); // Obtener el id del torneo recién insertado
  
    if (torneoError) {
      console.error('Error al agregar el torneo:', torneoError);
      toast.error('Error al agregar el torneo. Inténtalo de nuevo.');
      return;
    }
  
    // Obtener el ID del torneo recién insertado
    const torneoId = torneoData[0].id;
  
    // Insertar la relación entre el torneo y la cancha en la tabla 'torneoscanchas'
    const { error: pivoteError } = await supabase
      .from('torneoscanchas')
      .insert([
        {
          torneo_id: torneoId,
          cancha_id: tournamentData.cancha_id, // Usamos el id de la cancha seleccionada
        },
      ]);
  
    if (pivoteError) {
      console.error('Error al agregar la relación torneo-cancha:', pivoteError);
      toast.error(
        'Error al agregar la relación torneo-cancha. Inténtalo de nuevo.'
      );
      return;
    }
  
    toast.success('Torneo y relación con cancha agregados exitosamente');
    setTournamentData({
      nombre: '',
      descripcion: '',
      fecha_inicio: '',
      fecha_fin: '',
      ubicacion: '',
      categoria: 'principiante',
      precio_torneo: '',
      horario: '',
      premios: '',
      cupo_maximo: '',
      instructor_id: '', // Reiniciar el campo de instructor
      cancha_id: '', // Reiniciar el campo de cancha
    });
    onTournamentAdded(); // Recargar datos después de agregar el torneo
  };  

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
        {/* Nombre del torneo */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={tournamentData.nombre}
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
            value={tournamentData.descripcion}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
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
            value={tournamentData.fecha_fin}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
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
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
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

        {/* Precio */}
        <div className="mb-4">
          <label className="block text-gray-700">Precio Torneo</label>
          <input
            type='number'
            name="precio_torneo"
            value={tournamentData.precio_torneo}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 pl-2 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Horario */}
        <div className="mb-4">
          <label className="block text-gray-700">Horario</label>
          <input
            type="text"
            name="horario"
            value={tournamentData.horario}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
            required
          />
        </div>

        {/* Premios */}
        <div className="mb-4">
          <label className="block text-gray-700">Premios</label>
          <textarea
            name="premios"
            value={tournamentData.premios}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-2"
          />
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
                {`${instructor.nombres} ${instructor.apellidos}`}
              </option>
            ))}
          </select>
        </div>

        {/* Canchas */}
        <div className="mb-4">
          <label className="block text-gray-700">Seleccionar Cancha</label>
          <select
            name="cancha_id"
            value={tournamentData.cancha_id}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccione una cancha</option>
            {cancha.map((cancha) => (
              <option key={cancha.id} value={cancha.id}>
                {cancha.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Cupo máximo */}
        <div className="mb-4">
          <label className="block text-gray-700">Cupo Máximo</label>
          <input
            type="number"
            name="cupo_maximo"
            value={tournamentData.cupo_maximo}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 pl-2 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Botón de envío */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Torneo
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default FormTorneo;
