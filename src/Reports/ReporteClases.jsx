import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de que tienes esta librería instalada
import { supabase } from '../../supabaseClient';
import logo from '../assets/logo.jpeg'; // Asegúrate de ajustar la ruta según tu estructura

export const generateClasesPDF = async (Id) => {

  const { data: adminData, error: adminError } = await supabase
    .from('usuarios') // Suponiendo que la tabla de usuarios se llama 'usuarios'
    .select('nombres, apellidos')
    .eq('id', Id)
    .single(); // Para obtener un solo resultado

  if (adminError) {
    console.error('Error fetching admin data:', adminError);
    return;
  }

  // Realizar la consulta a Supabase con las columnas deseadas
  const { data: clasesData, error: clasesError } = await supabase
    .from('clases')
    .select(`
      nombre,
      horario,
      nivel,
      fecha_inicio,
      fecha_fin,
      precio_clase,
      instructor:fk_instructor (nombres, apellidos)
    `);

  if (clasesError) {
    console.error('Error fetching classes:', clasesError);
    return;
  }

  console.log('Data de clases obtenida:', clasesData);

  const doc = new jsPDF('l', 'mm', 'a4');
  const img = new Image();
  img.src = logo; // Asegúrate de que 'logo' esté definido y sea accesible

  img.onload = () => {
    // Agregar el logo al PDF
    doc.addImage(img, 'PNG', 25, 5, 40, 40);

    // Agregar títulos y cabecera
    doc.setFontSize(18);
    doc.text('ACADEMIA DE TENNIS CASA BLANCA', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Dirección: Cra. 76 # 146-30, Bogotá', doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });

    doc.setFontSize(16);
    doc.text('Reporte de Clases', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (adminData) {
      doc.setFontSize(12);
      doc.text(`Admin: ${adminData.nombres} ${adminData.apellidos}`, 25, 50);
    } else {
      doc.setFontSize(12);
      doc.text('Admin: No identificado', 25, 50);
    }

    // Verificar si hay datos y mostrar información de instructor
    if (clasesData.length > 0) {
      doc.setFontSize(12);
      doc.text('Fecha de descarga: ' + fechaActual, doc.internal.pageSize.getWidth() - 25, 50, { align: 'right' });
    } else {
      doc.setFontSize(12);
      doc.text('No se encontraron clases disponibles.', 10, 50);
    }

    // Definir las cabeceras y filas de la tabla
    const headers = [['Nombre', 'Horario', 'Nivel', 'Fecha Inicio', 'Fecha Fin', 'Precio Clase', 'Instructor']];
    const rows = clasesData.map(clase => [
      clase.nombre,
      clase.horario,
      clase.nivel,
      clase.fecha_inicio,
      clase.fecha_fin,
      `$${clase.precio_clase.toFixed(2)}`,
      clase.instructor ? `${clase.instructor.nombres} ${clase.instructor.apellidos}` : 'No asignado',
    ]);

    // Generar la tabla
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
    doc.save('reporte_clases.pdf');
  };
};


export const generateMisClasesPDF = async (Id) => {
  const { data: clasesData, error: clasesError } = await supabase
    .from('clases')
    .select(`
      id,
      nombre,
      horario,
      fecha_inicio,
      fecha_fin,
      instructor:fk_instructor (id, nombres, apellidos),
      inscripciones:inscripcionesclases (
        usuario:usuario_id (nombres, apellidos)
      )
    `)
    .eq('instructor_id', Id);

  if (clasesError) {
    console.error('Error fetching classes:', clasesError);
    return;
  }

  console.log('Data de clases filtradas:', clasesData);

  const doc = new jsPDF('l', 'mm', 'a4');
  const img = new Image();
  img.src = logo;

  img.onload = () => {
    doc.addImage(img, 'PNG', 25, 5, 40, 40);

    doc.setFontSize(18);
    doc.text('ACADEMIA DE TENNIS CASA BLANCA', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Dirección: Cra. 76 # 146-30, Bogotá', doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });

    doc.setFontSize(16);
    doc.text('Reporte de Clases', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (clasesData.length > 0) {
      const instructor = clasesData[0]?.instructor;
      if (instructor) {
        doc.setFontSize(12);
        doc.text('Instructor: ' + `${instructor.nombres} ${instructor.apellidos}`, 25, 50);
      } else {
        doc.setFontSize(12);
        doc.text('Instructor: No asignado', 25, 50);
      }

      // Mostrar la fecha al costado derecho
      doc.text('Fecha de descarga: ' + fechaActual, doc.internal.pageSize.getWidth() - 25, 50, { align: 'right' });
    } else {
      doc.text('No se encontraron clases para este instructor.', 10, 50);
    }

    const headers = [['Clase', 'Horario', 'Fecha Inicio', 'Fecha Fin', 'Cantidad Inscritos', 'Nombres de los Inscritos']];
    const rows = clasesData.map(clase => {
      const inscritos = clase.inscripciones.map(inscripcion => {
        return `${inscripcion.usuario.nombres} ${inscripcion.usuario.apellidos}`;
      });

      const inscritosPorColumna = inscritos.reduce((cols, nombre, index) => {
        if (index % 8 === 0) cols.push([]);
        cols[cols.length - 1].push(nombre);
        return cols;
      }, []);

      const inscritosFormateados = inscritosPorColumna.map(col => col.join(', ')).join(' | ');

      return [
        clase.nombre,
        clase.horario,
        clase.fecha_inicio,
        clase.fecha_fin,
        inscritos.length,
        inscritosFormateados,
      ];
    });

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
      theme: 'grid',
      columnStyles: {
        1: { cellWidth: 25 },
        5: { cellWidth: 100 },
      },
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

    doc.save('reporte_mis_clases.pdf');
  };
};