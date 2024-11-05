import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de que tienes esta librería instalada
import { supabase } from '../../supabaseClient';
import logo from '../assets/logo.jpeg'; // Asegúrate de ajustar la ruta según tu estructura

export const generateTorneosPDF = async () => {
  const { data, error } = await supabase
    .from('torneos')
    .select(`
      nombre,
      fecha_inicio,
      fecha_fin,
      ubicacion,
      categoria,
      cupo_maximo,
      inscripciones_actuales,
      precio_torneo,
      horario,
      instructor:usuarios (nombres, apellidos)
    `); // Asegúrate de que la relación entre tablas esté configurada en Supabase

  if (error) {
    console.error('Error fetching tournaments:', error);
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');

  // Convertir la imagen a base64
  const img = new Image();
  img.src = logo;

  img.onload = () => {
    doc.addImage(img, 'PNG', 25, 5, 40, 40); // Ajusta la posición y tamaño del logo

    doc.setFontSize(18);
    doc.text('ACADEMIA DE TENNIS CASA BLANCA', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Dirección: Cra. 76 # 146-30, Bogotá', doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });

    doc.setFontSize(16);
    doc.text('Reporte de Torneos', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

    // Definir encabezados de tabla, sin incluir los campos excluidos
    const headers = [
      [
        'No.',
        'Nombre del Torneo',
        'Fecha de Inicio',
        'Fecha de Fin',
        'Ubicación',
        'Categoría',
        'Cupo Máximo',
        'Inscripciones Actuales',
        'Precio',
        'Horario',
        'Instructor'
      ]
    ];

    // Mapeo de datos para la tabla, con numeración y nombre completo del instructor
    const rows = data.map((torneo, index) => [
      index + 1, // Numeración
      torneo.nombre,
      torneo.fecha_inicio,
      torneo.fecha_fin,
      torneo.ubicacion,
      torneo.categoria,
      torneo.cupo_maximo,
      torneo.inscripciones_actuales,
      `$${torneo.precio_torneo.toFixed(2)}`, // Formato de precio
      torneo.horario,
      `${torneo.instructor.nombres} ${torneo.instructor.apellidos}` // Nombre completo del instructor
    ]);

    // Crear la tabla con autoTable
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 45,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        halign: 'left',
      },
      headStyles: {
        fillColor: [29, 53, 87],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
    });

    doc.save('reporte_torneos.pdf');
  };
};
