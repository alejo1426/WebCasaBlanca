/* eslint-disable react/prop-types */
import '../../css/Report.css';
import { useState } from 'react';
import { generateUsuariosPDF } from '../../Reports/ReporteUsuarios';
import { generateTorneosPDF, generateMisTorneosPDF } from '../../Reports/ReporteTorneos';
import { generateClasesPDF, generateMisClasesPDF } from '../../Reports/ReporteClases';

const ReportModal = ({ onClose, role, Id }) => {
  console.log('User ID:', Id); // Agregar instructorId como prop
  const options = role === 'admin'
    ? [
        { label: 'Usuarios', value: 'usuarios' },
        { label: 'Torneos', value: 'torneos' },
        { label: 'Clases', value: 'clases' }
      ]
    : role === 'instructor'
    ? [
        { label: 'Mis Clases', value: 'Misclases' },
        { label: 'Mis Torneos', value: 'Mistorneos' }
      ]
    : [];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (value) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((option) => option !== value)
        : [...prevSelected, value]
    );
  };

  const generatePDFs = async () => {
    for (const option of selectedOptions) {
      switch (option) {
        case 'usuarios':
          await generateUsuariosPDF(Id);
          break;
        case 'torneos':
          await generateTorneosPDF(Id);
          break;
        case 'clases':
          await generateClasesPDF(Id);
          break;
        case 'Misclases':
          if (Id) {
            await generateMisClasesPDF(Id); // Pasar el ID del instructor a la función
          } else {
            console.error('Instructor ID is missing');
          }
          break;
        case 'Mistorneos':
          if (Id) {
            await generateMisTorneosPDF(Id); // Pasar el ID del instructor a la función
          } else {
            console.error('Instructor ID is missing');
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Descargar Reporte</h2>
        <p className="mb-6 text-gray-600 text-center">Seleccione el/los tipos de reporte que desea descargar:</p>
        
        <form className="flex flex-col items-center">
          {options.map((option) => (
            <label key={option.value} className="flex items-center mb-4 text-gray-700">
              <input
                type="checkbox"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={generatePDFs}
              disabled={selectedOptions.length === 0}
              className={`download-button ${selectedOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="docs flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <text x="9" y="16" fontSize="7" fill="currentColor">PDF</text>
                </svg>
                <span>PDF</span>
              </div>
              <div className="download">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
