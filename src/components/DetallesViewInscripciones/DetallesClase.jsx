/* eslint-disable react/prop-types */
const DetallesClase = ({ clase, onDelete }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'No disponible';

  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="font-bold text-2xl mb-2 text-gray-800">{clase.nombre}</h2>
      <p className="text-gray-600"><strong>Descripción:</strong> {clase.descripcion}</p>
      <p className="text-gray-600"><strong>Horario:</strong> <span>{clase.horario}</span></p>
      <p className="text-gray-600"><strong>Nivel:</strong> <span>{clase.nivel}</span></p>
      <p className="text-gray-600"><strong>Instructor:</strong> <span>{clase.usuarios.nombres} {clase.usuarios.apellidos}</span></p>
      <p className="text-gray-600"><strong>Fecha de Inicio:</strong> <span>{formatDate(clase.fecha_inicio)}</span></p>
      <p className="text-gray-600"><strong>Fecha de Fin:</strong> <span>{formatDate(clase.fecha_fin)}</span></p>
      <p className="text-gray-600"><strong>Fecha de Inscripción:</strong> <span>{formatDate(clase.fecha_inscripcion)}</span></p>
      <p className="text-gray-600"><strong>Precio:</strong> COP {clase.precio_clase ? clase.precio_clase.toLocaleString('es-CO') : 'No disponible'}</p>
      <p className="text-gray-600"><strong>Cancha Asociada:</strong> <span>{clase.cancha}</span></p> {/* Nuevo campo */}
      <button
        onClick={onDelete}
        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Eliminar Inscripción
      </button>
    </div>
  );
};

export default DetallesClase;
