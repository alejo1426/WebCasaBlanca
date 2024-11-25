/* eslint-disable react/prop-types */
const DetallesTorneo = ({ torneo, onDelete }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'No disponible';

  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="font-bold text-2xl mb-2 text-gray-800">{torneo.nombre}</h2>
      <p className="text-gray-600"><strong>Descripción:</strong> {torneo.descripcion}</p>
      <p className="text-gray-600"><strong>Fecha de Inicio:</strong> <span>{formatDate(torneo.fecha_inicio)}</span></p>
      <p className="text-gray-600"><strong>Fecha de Fin:</strong> <span>{formatDate(torneo.fecha_fin)}</span></p>
      <p className="text-gray-600"><strong>Ubicación:</strong> <span>{torneo.ubicacion}</span></p>
      <p className="text-gray-600"><strong>Categoría:</strong> <span>{torneo.categoria}</span></p>
      <p className="text-gray-600"><strong>Premios:</strong> <span>{torneo.premios}</span></p>
      <p className="text-gray-600"><strong>Cupo Máximo:</strong> <span>{torneo.cupo_maximo}</span></p>
      <p className="text-gray-600"><strong>Horario:</strong> <span>{torneo.horario || 'No disponible'}</span></p>
      <p className="text-gray-600"><strong>Fecha de Inscripción:</strong> <span>{formatDate(torneo.fecha_inscripcion)}</span></p>
      <p className="text-gray-600"><strong>Precio:</strong> COP {torneo.precio_torneo ? torneo.precio_torneo.toLocaleString('es-CO') : 'No disponible'}</p>
      <p className="text-gray-600"><strong>Cancha Asociada:</strong> <span>{torneo.cancha}</span></p> {/* Cancha asociada */}
      <p className="text-gray-600"><strong>Instructor:</strong> <span>{torneo.instructor}</span></p> {/* Nuevo campo: Instructor */}
      <button
        onClick={onDelete}
        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Eliminar Inscripción
      </button>
    </div>
  );
};

export default DetallesTorneo;
