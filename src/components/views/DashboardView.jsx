import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../supabaseClient';
import FormInscripcionClases from '../Form/FormInscripcionClases';
import FormInscripcionTorneos from '../Form/FormInscripcionTorneos';
import CardItem from '../Card/CardItem';
import '../../css/DashboardView.css';

const ResolucionMobile = 768; // Definimos el ancho móvil como constante
const ResolucionTablet = 1024; // Umbral de 1024px para tabletas

const DashboardView = () => {
  const [classes, setClasses] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingTournaments, setLoadingTournaments] = useState(true);
  
  const formSectionRef = useRef(null);
  const scrollContainerRef = useRef(null); // Referencia al contenedor del scroll

  const fetchClassesWithInstructors = async () => {
    try {
      const { data, error } = await supabase
        .from('clases')
        .select('id, nombre, descripcion, horario, fecha_inicio, fecha_fin, precio_clase, nivel, instructor_id, usuarios (nombres, apellidos)')
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
        .select('id, nombre, descripcion, fecha_inicio, fecha_fin, categoria, precio_torneo, cupo_maximo, ubicacion, premios,instructor_id, usuarios (nombres, apellidos)')
        .eq('usuarios.rol', 'instructor');

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

  useEffect(() => {
    // Verificar si hay un elemento seleccionado y si se debe desplazar
    if (selectedItem && selectedType) {
      if (window.innerWidth <= ResolucionMobile || window.innerWidth <= ResolucionTablet) {
        // Desplazarse en resoluciones móviles o tabletas
        formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (window.innerWidth > ResolucionTablet) {
        // Desplazarse hacia arriba en resoluciones mayores a 1024px
        formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedItem, selectedType]);

  // Función para manejar el scroll y verificar si el contenedor está al final
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container.scrollHeight - container.scrollTop === container.clientHeight) {
      container.style.maskImage = 'none'; // Eliminar la máscara cuando se llega al final
    } else {
      container.style.maskImage = 'linear-gradient(to bottom, black 90%, transparent 100%)'; // Aplicar la máscara
    }
  };

  const renderSection = (title, loading, data, type) => (
    <section className="mb-8">
      <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      {loading ? (
        <p className="text-center text-lg">Cargando {title.toLowerCase()}...</p>
      ) : data.length === 0 ? (
        <p>No hay {title.toLowerCase()} disponibles</p>
      ) : (
        <div
          className="scroll-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            paddingBottom: '20px',
          }}
          onScroll={handleScroll}
          ref={scrollContainerRef}
        >
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
      <div ref={formSectionRef} className="w-full lg:w-1/2 p-4 lg:p-6 flex justify-center items-center">
        {selectedItem && selectedType === 'class' && <FormInscripcionClases selectedItem={selectedItem} />}
        {selectedItem && selectedType === 'tournament' && <FormInscripcionTorneos selectedItem={selectedItem} />}
      </div>
    </div>
  );
};

export default DashboardView;
