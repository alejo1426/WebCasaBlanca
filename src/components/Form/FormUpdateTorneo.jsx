/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormUpdateTorneos = ({ initialData, onUpdate = () => {} }) => {
  const [tournamentData, setTournamentData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    ubicacion: '',
    categoria: 'principiante',
    premios: '',
    cupo_maximo: '',
    instructor_id: '',
    precio_torneo: '',
    horario: '',
    cancha_id: '',
  });

  const [instructors, setInstructors] = useState([]);
  const [canchas, setCanchas] = useState([]);

  // Obtener la lista de instructores
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

  // Obtener las canchas disponibles
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
        // Obtener la cancha asociada al torneo desde la tabla pivote 'torneoscanchas'
        const { data: canchaData, error } = await supabase
          .from('torneoscanchas')
          .select('cancha_id')
          .eq('torneo_id', initialData.id)
          .single(); // Solo debe haber una asociación por torneo

        if (error) {
          console.error('Error fetching cancha for tournament:', error);
          toast.error('Error al obtener la cancha asociada');
        } else {
          setTournamentData({
            ...initialData,
            cancha_id: canchaData ? canchaData.cancha_id : '',
          });
        }
      }
    };

    fetchCancha();
  }, [initialData]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setTournamentData({ ...tournamentData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (Object.values(tournamentData).some((value) => value === '')) {
      toast.error('Todos los campos deben estar llenos.');
      return;
    }

    try {
      // Actualizar los datos del torneo
      const { error: updateTournamentError } = await supabase
        .from('torneos')
        .update({
          nombre: tournamentData.nombre,
          descripcion: tournamentData.descripcion,
          fecha_inicio: tournamentData.fecha_inicio,
          fecha_fin: tournamentData.fecha_fin,
          ubicacion: tournamentData.ubicacion,
          categoria: tournamentData.categoria,
          premios: tournamentData.premios,
          cupo_maximo: tournamentData.cupo_maximo,
          instructor_id: tournamentData.instructor_id,
          precio_torneo: tournamentData.precio_torneo,
          horario: tournamentData.horario,
        })
        .eq('id', initialData.id);

      if (updateTournamentError) {
        throw updateTournamentError;
      }

      // Actualizar la cancha en la tabla pivote 'torneoscanchas', si cambió
      if (tournamentData.cancha_id !== initialData.cancha_id) {
        // Eliminar la asociación anterior
        const { error: deleteCanchaError } = await supabase
          .from('torneoscanchas')
          .delete()
          .eq('torneo_id', initialData.id);

        if (deleteCanchaError) {
          throw deleteCanchaError;
        }

        // Insertar la nueva asociación
        const { error: insertCanchaError } = await supabase
          .from('torneoscanchas')
          .insert([{ torneo_id: initialData.id, cancha_id: tournamentData.cancha_id }]);

        if (insertCanchaError) {
          throw insertCanchaError;
        }
      }

      toast.success('Torneo modificado con éxito');
      onUpdate(); // Llamamos a onUpdate para actualizar la lista de torneos
    } catch (error) {
      console.error('Error al modificar el torneo:', error);
      toast.error('Error al modificar el torneo');
    }
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                {`${instructor.nombres} ${instructor.apellidos}`}
              </option>
            ))}
          </select>
        </div>

        {/* Horario */}
        <div className="mb-4">
          <label className="block text-gray-700">Horario</label>
          <input
            type="text"
            name="horario"
            value={tournamentData.horario}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Precio del torneo */}
        <div className="mb-4">
          <label className="block text-gray-700">Precio del Torneo</label>
          <input
            type="number"
            name="precio_torneo"
            value={tournamentData.precio_torneo}
            onChange={handleChange}
            className="mt-1 block w-full text-white pl-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Cancha asociada */}
        <div className="mb-4">
          <label className="block text-gray-700">Cancha</label>
          <select
            name="cancha_id"
            value={tournamentData.cancha_id}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {canchas.map((cancha) => (
              <option key={cancha.id} value={cancha.id}>
                {cancha.nombre}
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Botón de submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Actualizar Torneo
          </button>
        </div>
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

export default FormUpdateTorneos;
