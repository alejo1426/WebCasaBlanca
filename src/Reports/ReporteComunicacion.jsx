import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de que tienes esta librería instalada
import { supabase } from '../../supabaseClient';
import logo from '../assets/logo.jpeg'; // Ajusta la ruta según tu estructura

export const generateComunicacionPDF = async (Id) => {
  // Consulta para obtener el nombre del usuario que descarga el PDF
  const { data: adminData, error: adminError } = await supabase
    .from('usuarios')
    .select('nombres, apellidos')
    .eq('id', Id)
    .single();

  if (adminError) {
    console.error('Error fetching admin data:', adminError);
    return;
  }

  // Consulta para obtener los usuarios
  const { data, error } = await supabase
    .from('contactos')
    .select('nombres, apellidos, correo, celular, mensaje, fecha_emision');

  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const img = new Image();
  img.src = logo;

  img.onload = () => {
    // Agregar el logo
    doc.addImage(img, 'PNG', 25, 5, 40, 40);

    // Títulos principales
    doc.setFontSize(18);
    doc.text('ACADEMIA DE TENNIS CASA BLANCA', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Dirección: Cra. 76 # 146-30, Bogotá', doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });

    doc.setFontSize(16);
    doc.text('Reporte de Comunicacion', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

    // Fecha de generación del reporte
    const fechaActual = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Nombre del administrador
    if (adminData) {
      doc.setFontSize(12);
      doc.text(`Admin: ${adminData.nombres} ${adminData.apellidos}`, 25, 50);
    } else {
      doc.setFontSize(12);
      doc.text('Admin: No identificado', 25, 50);
    }

    // Mostrar la fecha en el encabezado
    doc.setFontSize(12);
    doc.text('Fecha de descarga: ' + fechaActual, doc.internal.pageSize.getWidth() - 25, 50, { align: 'right' });

    // Definir encabezados de tabla
    const headers = [['No.', 'Nombres', 'Apellidos', 'Correo', 'Celular', 'Mensaje', 'Fecha']];

    // Crear las filas para la tabla
    const rows = data.map((user, index) => [
      index + 1,
      user.nombres,
      user.apellidos,
      user.correo,
      user.celular,
      user.mensaje,
      user.fecha_emision,
    ]);

    // Crear la tabla
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
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

    // Guardar el PDF
    doc.save('reporte_comunicacion.pdf');
  };
};
