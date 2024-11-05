import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de que tienes esta librería instalada
import { supabase } from '../../supabaseClient';
import logo from '../assets/logo.jpeg'; // Asegúrate de ajustar la ruta según tu estructura

export const generateUsuariosPDF = async () => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('nombres, apellidos, correo, usuario, telefono, direccion, edad'); // Eliminamos la columna 'id'

  if (error) {
    console.error('Error fetching users:', error);
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
    doc.text('Reporte de Usuarios', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

    // Definir encabezados de tabla, cambiando 'ID' por 'No.'
    const headers = [['No.', 'Nombres', 'Apellidos', 'Correo', 'Usuario', 'Teléfono', 'Dirección', 'Edad']];

    // Mapeo de datos para la tabla, con numeración en la primera columna
    const rows = data.map((user, index) => [
      index + 1, // Agrega un número que incrementa con cada fila
      user.nombres,
      user.apellidos,
      user.correo,
      user.usuario,
      user.telefono,
      user.direccion,
      user.edad
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

    doc.save('reporte_usuarios.pdf');
  };
};
