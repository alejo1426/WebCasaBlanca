import React, { useState } from 'react';

const ClasesFormulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    numero: '',
    claseSeleccionada: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos, como enviar a un servidor
    console.log(formData);
  };

  return (
    <div className="formulario-page">
      <h1>Inscripción a Clases</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo de nombre */}
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        {/* Campo de apellido */}
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />

        {/* Campo de email */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Campo de número de teléfono */}
        <label htmlFor="numero">Número de teléfono:</label>
        <input
          type="tel"
          id="numero"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
          placeholder=" "
          required
        />

        {/* Selección de clase */}
        <label htmlFor="claseSeleccionada">Clase Seleccionada:</label>
        <select
          id="claseSeleccionada"
          name="claseSeleccionada"
          value={formData.claseSeleccionada}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una clase</option>
          <option value="claseIndividual">Clase Individual</option>
          <option value="claseGrupal">Clase Grupal</option>
        </select>

        <button type="submit">Inscribirse</button>
      </form>
    </div>
  );
};

export default ClasesFormulario;