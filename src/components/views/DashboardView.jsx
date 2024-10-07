import { useState } from 'react';

const DashboardView = () => {
  const [selectedItem, setSelectedItem] = useState(null); // Estado para el elemento seleccionado

  // Ejemplo de datos de clases y torneos
  const classes = [
    { id: 1, name: 'Clase de Tenis Intermedio', teacher: 'Juan Pérez', date: '2024-10-10', time: '10:00 AM', difficulty: 'Intermedio' },
    { id: 2, name: 'Clase de Tenis Avanzado', teacher: 'Ana López', date: '2024-10-11', time: '11:00 AM', difficulty: 'Avanzado' },
    // Agrega más clases si es necesario
  ];

  const tournaments = [
    { id: 1, name: 'Torneo Abierto de Tenis', teacher: 'Carlos Ruiz', date: '2024-10-15', time: '2:00 PM', difficulty: 'Avanzado' },
    { id: 2, name: 'Torneo Infantil de Tenis', teacher: 'Lucía Martínez', date: '2024-10-16', time: '3:00 PM', difficulty: 'Básico' },
    // Agrega más torneos si es necesario
  ];

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Establecer el elemento seleccionado
  };

  const renderForm = () => {
    if (!selectedItem) return null; // No mostrar el formulario si no hay elemento seleccionado
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-bold text-lg">Formulario de Inscripción</h2>
        <p>Nombre: {selectedItem.name}</p>
        <p>Profesor: {selectedItem.teacher}</p>
        <p>Fecha: {selectedItem.date}</p>
        <p>Hora: {selectedItem.time}</p>
        <p>Dificultad: {selectedItem.difficulty}</p>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Nombre Completo</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico</label>
            <input type="email" className="mt-1 block w-full border-gray-300 rounded-md" required />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Inscribirse
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      {/* Sección principal: Clases y Torneos */}
      <div className="flex-grow p-4">
        {/* Sección de Clases */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Sección de Clases</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <div 
                key={cls.id} 
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer" 
                onClick={() => handleSelectItem(cls)}
              >
                <h2 className="font-bold text-lg">{cls.name}</h2>
                <p>Profesor: {cls.teacher}</p>
                <p>Fecha: {cls.date}</p>
                <p>Hora: {cls.time}</p>
                <p>Dificultad: {cls.difficulty}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Torneos */}
        <section>
          <h1 className="text-2xl font-bold mb-4">Sección de Torneos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tournaments.map((tor) => (
              <div 
                key={tor.id} 
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer" 
                onClick={() => handleSelectItem(tor)}
              >
                <h2 className="font-bold text-lg">{tor.name}</h2>
                <p>Profesor: {tor.teacher}</p>
                <p>Fecha: {tor.date}</p>
                <p>Hora: {tor.time}</p>
                <p>Dificultad: {tor.difficulty}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sección de Formulario, alineado a la derecha */}
      <div className="w-full lg:w-1/3 p-4 lg:p-6 bg-gray-100 rounded-lg shadow-md">
        {renderForm()} {/* Mostrar el formulario si se seleccionó una clase o torneo */}
      </div>
    </div>
  );
};

export default DashboardView;
