const CardItem = ({ item, type, onSelect }) => {
  // Formatear las fechas con la zona horaria 'UTC'
  const formattedFechaInicio = item.fecha_inicio
    ? new Date(item.fecha_inicio).toLocaleDateString('es-ES', { timeZone: 'UTC' })
    : null;
  const formattedFechaFin = item.fecha_fin
    ? new Date(item.fecha_fin).toLocaleDateString('es-ES', { timeZone: 'UTC' })
    : null;

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
      onClick={() => onSelect(item)}
    >
      {type === 'class' ? (
        <>
          <h2 className="font-bold text-lg">{item.nombre}</h2>
          <p>Profesor: {item.usuarios ? `${item.usuarios.nombres} ${item.usuarios.apellidos}` : 'Sin asignar'}</p>
          <p>Horario: {item.horario}</p>
          <p>Nivel: {item.nivel}</p>
        </>
      ) : type === 'tournament' ? (
        <>
          <h2 className="font-bold text-lg">{item.nombre}</h2>
          <p>Fecha de Inicio: {formattedFechaInicio}</p>
          <p>Fecha de Fin: {formattedFechaFin}</p>
          <p>Categoría: {item.categoria}</p>
        </>
      ) : null}
    </div>
  );
};

export default CardItem;


  