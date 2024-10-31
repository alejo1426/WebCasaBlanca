/* eslint-disable react/prop-types */
const DetallesClase = ({ clase, enrolledUsers }) => {
  const formatDate = (date) => 
    date ? new Date(date).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'No disponible';

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="font-bold text-2xl mb-2 text-gray-800">{clase.nombre}</h2>
      <p className="text-gray-600"><strong>Descripción:</strong> {clase.descripcion}</p>
      <p className="text-gray-600"><strong>Horario:</strong> <span className="font-semibold">{clase.horario}</span></p>
      <p className="text-gray-600"><strong>Nivel:</strong> <span className="font-semibold">{clase.nivel}</span></p>
      <p className="text-gray-600"><strong>Fecha de Inicio:</strong> <span className="font-semibold">{formatDate(clase.fecha_inicio)}</span></p>
      <p className="text-gray-600"><strong>Fecha de Fin:</strong> <span className="font-semibold">{formatDate(clase.fecha_fin)}</span></p>

      <h3 className="text-lg font-semibold mt-4">Usuarios Inscritos:</h3>
      {enrolledUsers.length > 0 ? (
        <ul>
          {enrolledUsers.map(user => (
            <li key={user.id}>
              {user.nombres} {user.apellidos}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios inscritos en esta clase.</p>
      )}
    </div>
  );
};

export default DetallesClase;
