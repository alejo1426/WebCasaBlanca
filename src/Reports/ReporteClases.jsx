import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de que tienes esta librería instalada
import { supabase } from '../../supabaseClient';
import logo from '../assets/logo.jpeg'; // Asegúrate de ajustar la ruta según tu estructura

export const generateClasesPDF = async () => {
  // Hacer la consulta a Supabase excluyendo las columnas no deseadas
  const { data, error } = await supabase
    .from('clases')
    .select(`
      nombre,
      horario,
      nivel,
      fecha_inicio,
      fecha_fin,
      precio_clase,
      instructor:fk_instructor (nombres, apellidos)  // Especificar la relación
    `);

  if (error) {
    console.error('Error fetching classes:', error);
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
    doc.text('Reporte de Clases', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

    const headers = [['Nombre', 'Horario', 'Nivel', 'Fecha Inicio', 'Fecha Fin', 'Precio Clase', 'Instructor']];
    const rows = data.map(clase => [
      clase.nombre,
      clase.horario,
      clase.nivel,
      clase.fecha_inicio,
      clase.fecha_fin,
      clase.precio_clase,
      clase.instructor ? `${clase.instructor.nombres} ${clase.instructor.apellidos}` : 'No asignado', // Manejo de instructor
    ]);

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
        fillColor: [29, 53, 87], // Color de encabezado
        textColor: [255, 255, 255], // Color del texto de encabezado
        fontSize: 12,
      },
    });

    doc.save('reporte_clases.pdf');
  };
};
