import { useState } from 'react';

const ClasesView = () => {
  const [selectedClass, setSelectedClass] = useState(null); // Estado para la clase seleccionada

  const classes = [
    { id: 1, name: 'Clase de Tenis Intermedio', teacher: 'Juan Pérez', date: '2024-10-10', time: '10:00 AM', difficulty: 'Intermedio' },
    { id: 2, name: 'Clase de Tenis Avanzado', teacher: 'Ana López', date: '2024-10-11', time: '11:00 AM', difficulty: 'Avanzado' },
    // Más clases pueden agregarse aquí
  ];

  const handleSelectClass = (cls) => {
    setSelectedClass(cls); // Establecer la clase seleccionada
  };

  return (
    <div className="flex-grow p-4">
      <h1 className="text-2xl font-bold mb-4">Clases Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div 
            key={cls.id} 
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer" 
            onClick={() => handleSelectClass(cls)}
          >
            <h2 className="font-bold text-lg">{cls.name}</h2>
            <p>Profesor: {cls.teacher}</p>
            <p>Fecha: {cls.date}</p>
            <p>Hora: {cls.time}</p>
            <p>Dificultad: {cls.difficulty}</p>
          </div>
        ))}
      </div>

      {selectedClass && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg">Detalles de la Clase</h2>
          <p>Nombre: {selectedClass.name}</p>
          <p>Profesor: {selectedClass.teacher}</p>
          <p>Fecha: {selectedClass.date}</p>
          <p>Hora: {selectedClass.time}</p>
          <p>Dificultad: {selectedClass.difficulty}</p>
        </div>
      )}
    </div>
  );
};

export default ClasesView;
