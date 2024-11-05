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
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingTournaments, setLoadingTournaments] = useState(true);

  const fetchClassesWithInstructors = async () => {
    try {
      const { data, error } = await supabase
        .from('clases')
        .select('id, nombre, descripcion, horario, fecha_inicio, fecha_fin, nivel, instructor_id, usuarios (nombres, apellidos)')
        .eq('usuarios.rol', 'instructor');

      if (error) throw error;
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    } finally {
      setLoadingClasses(false);
    }
  };

  const fetchTournaments = async () => {
    try {
      const { data, error } = await supabase
        .from('torneos')
        .select('id, nombre, descripcion, fecha_inicio, fecha_fin, categoria, cupo_maximo, ubicacion, premios');

      if (error) throw error;
      setTournaments(data);
    } catch (error) {
      console.error('Error fetching tournaments:', error.message);
    } finally {
      setLoadingTournaments(false);
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

  const renderSection = (title, loading, data, type) => (
    <section className="mb-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {loading ? (
        <p className="text-center text-lg">Cargando {title.toLowerCase()}...</p>
      ) : data.length === 0 ? (
        <p>No hay {title.toLowerCase()} disponibles</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(item => (
            <CardItem key={item.id} item={item} type={type} onSelect={() => handleSelectItem(item, type)} />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="flex-grow p-4">
        {renderSection('Sección de Clases', loadingClasses, classes, 'class')}
        {renderSection('Sección de Torneos', loadingTournaments, tournaments, 'tournament')}
      </div>

      {/* Sección de Formulario */}
      <div className="w-full lg:w-1/2 p-4 lg:p-6">
        {selectedItem && selectedType === 'class' && <FormInscripcionClases selectedItem={selectedItem} />}
        {selectedItem && selectedType === 'tournament' && <FormInscripcionTorneos selectedItem={selectedItem} />}
      </div>
    </div>
  );
};

export default DashboardView;
