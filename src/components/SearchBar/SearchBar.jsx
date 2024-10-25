import { useState } from 'react';

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
    <div className="flex items-center space-x-4 mb-4">
      {showFilter && (
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="border-gray-300 rounded-md p-2"
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
          className="border-gray-300 rounded-md p-2 w-full"
        />
      )}
    </div>
  );
};

export default BarraFiltro;
