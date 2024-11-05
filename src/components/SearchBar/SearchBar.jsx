import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const BarraFiltro = ({ onFilterChange, onSearchChange, showFilter = true, showSearch = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('clases'); // Por defecto "clases"

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    onFilterChange(e.target.value); // Pasar el filtro seleccionado al padre
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value); // Pasar el término de búsqueda al padre
  };

  return (
    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
      {showFilter && (
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="rounded-lg p-2"
        >
          <option value="clases">Clases</option>
          <option value="usuarios">Usuarios</option>
          <option value="torneos">Torneos</option>
          <option value="canchas">Canchas</option>
        </select>
      )}
      
      {showSearch && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar..."
          className="border-gray-300 rounded-md p-2 w-full text-white font-bold"
        />
      )}
    </div>
  );
};

export default BarraFiltro;
