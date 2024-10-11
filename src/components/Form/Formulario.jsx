// src/components/Formulario.js
import React, { useState } from 'react';
import '../../css/Formulario.css'; // Asegúrate de tener estilos para el formulario

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    numero: '',
    categoria: '',
  });

  const categorias = ['Principiante', 'Intermedio', 'Avanzado']; // Categorías disponibles

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario aquí
    console.log(formData);
  };

  return (
    <div className="formulario-page">
      <h1>Formulario de Inscripción</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombres:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>
        <label>
          Apellidos:
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </label>
        <label>
          Correo:
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
        </label>
        <label>
          Número:
          <input type="tel" name="numero" value={formData.numero} onChange={handleChange} required />
        </label>
        <label>
          Categoría:
          <select name="categoria" value={formData.categoria} onChange={handleChange} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;