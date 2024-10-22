import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import FormInscripcionClases from '../Form/FormInscripcionClases';
import FormInscripcionTorneos from '../Form/FormInscripcionTorneos';
import CardItem from '../Card/CardItem';

const DashboardView = () => {
  const [classes, setClasses] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClassesWithInstructors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clases')
        .select('id, nombre, descripcion, horario, fecha_inicio, fecha_fin, nivel, instructor_id, usuarios!clases_instructor_id_fkey(nombres, apellidos)')
        .eq('usuarios.rol', 'instructor');

      if (error) throw error;

      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('torneos')
        .select('id, nombre, descripcion, fecha_inicio, fecha_fin, categoria, cupo_maximo, ubicacion, premios');

      if (error) throw error;

      setTournaments(data);
    } catch (error) {
      console.error('Error fetching tournaments:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesWithInstructors();
    fetchTournaments();
  }, []);

  const handleSelectItem = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="flex-grow p-4">
        {/* Sección de Clases */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Sección de Clases</h1>
          {loading ? (
            <p className="text-center text-lg">Cargando clases...</p>
          ) : classes.length === 0 ? (
            <p>No hay clases disponibles</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((cls) => (
                <CardItem key={cls.id} item={cls} type="class" onSelect={() => handleSelectItem(cls, 'class')} />
              ))}
            </div>
          )}
        </section>

        {/* Sección de Torneos */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Sección de Torneos</h1>
          {loading ? (
            <p className="text-center text-lg">Cargando torneos...</p>
          ) : tournaments.length === 0 ? (
            <p>No hay torneos disponibles</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tournaments.map((tournament) => (
                <CardItem key={tournament.id} item={tournament} type="tournament" onSelect={() => handleSelectItem(tournament, 'tournament')} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Sección de Formulario */}
      <div className="w-full lg:w-1/3 p-4 lg:p-6 bg-gray-100 rounded-lg shadow-md">
        {selectedItem && selectedType === 'class' && <FormInscripcionClases selectedItem={selectedItem} />}
        {selectedItem && selectedType === 'tournament' && <FormInscripcionTorneos selectedItem={selectedItem} />}
      </div>
    </div>
  );
};

export default DashboardView;
