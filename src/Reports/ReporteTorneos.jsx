import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de que tienes esta librería instalada
import { supabase } from '../../supabaseClient';
import logo from '../assets/logo.jpeg'; // Asegúrate de ajustar la ruta según tu estructura

export const generateTorneosPDF = async (Id) => {
  const { data: adminData, error: adminError } = await supabase
    .from('usuarios') // Suponiendo que la tabla de usuarios se llama 'usuarios'
    .select('nombres, apellidos')
    .eq('id', Id)
    .single(); // Para obtener un solo resultado

  if (adminError) {
    console.error('Error fetching admin data:', adminError);
    return;
  }

  // Obtener los datos de los torneos
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
    `);

  if (error) {
    console.error('Error fetching tournaments:', error);
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');

  // Convertir la imagen a base64
  const img = new Image();
  img.src = logo;

  img.onload = () => {
    // Agregar el logo al PDF
    doc.addImage(img, 'PNG', 25, 5, 40, 40);

    // Agregar títulos y cabecera
    doc.setFontSize(18);
    doc.text('ACADEMIA DE TENNIS CASA BLANCA', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Dirección: Cra. 76 # 146-30, Bogotá', doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });

    doc.setFontSize(16);
    doc.text('Reporte de Torneos', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

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

    // Verificar si hay datos y mostrar fecha de descarga
    if (data.length > 0) {
      doc.setFontSize(12);
      doc.text('Fecha de descarga: ' + fechaActual, doc.internal.pageSize.getWidth() - 25, 50, { align: 'right' });
    } else {
      doc.setFontSize(12);
      doc.text('No se encontraron torneos disponibles.', 10, 50);
    }

    // Definir las cabeceras de la tabla
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

    // Mapeo de datos para la tabla
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

    // Generar la tabla con autoTable
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
    doc.save('reporte_torneos.pdf');
  };
};


export const generateMisTorneosPDF = async (Id) => {
  // Consultamos los torneos donde el instructor es el usuario con el Id recibido
  const { data: torneosData, error: torneosError } = await supabase
    .from('torneos')
    .select(`
      id,
      nombre,
      fecha_inicio,
      fecha_fin,
      categoria,
      inscripciones:inscripcionestorneos (
        usuario:usuario_id (nombres, apellidos)
      ),
      instructor_id
    `)
    .eq('instructor_id', Id); // Filtramos por el ID del instructor

  if (torneosError) {
    console.error('Error fetching torneos:', torneosError);
    return;
  }

  console.log('Data de torneos filtrados:', torneosData);

  // Verificación de instructor_id en torneos
  if (torneosData.length > 0) {
    console.log('instructor_id en el primer torneo:', torneosData[0].instructor_id);
  } else {
    console.log('No se encontraron torneos para este instructor.');
    return;
  }

  // Ahora, obtenemos la información del instructor (nombres y apellidos) de la tabla 'usuarios'
  const { data: instructorData, error: instructorError } = await supabase
    .from('usuarios')
    .select('nombres, apellidos')
    .eq('id', Id)
    .single(); // Aseguramos que solo nos devuelvan un resultado

  if (instructorError) {
    console.error('Error fetching instructor data:', instructorError);
    return;
  }

  console.log('Data del instructor:', instructorData);

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
    doc.text('Reporte de Torneos', doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (instructorData) {
      // Mostrar el nombre del instructor
      doc.setFontSize(12);
      doc.text('Instructor: ' + `${instructorData.nombres} ${instructorData.apellidos}`, 25, 50);
    } else {
      doc.setFontSize(12);
      doc.text('Instructor: No asignado', 25, 50);
    }

    // Mostrar la fecha al costado derecho
    doc.text('Fecha de descarga: ' + fechaActual, doc.internal.pageSize.getWidth() - 25, 50, { align: 'right' });

    const headers = [['Torneo', 'Fecha Inicio', 'Fecha Fin', 'Categoría', 'Cantidad Inscritos', 'Nombres de los Inscritos']];

    const rows = torneosData.map(torneo => {
      const inscritos = torneo.inscripciones.map(inscripcion => {
        return `${inscripcion.usuario.nombres} ${inscripcion.usuario.apellidos}`;
      });

      const inscritosPorColumna = inscritos.reduce((cols, nombre, index) => {
        if (index % 8 === 0) cols.push([]);
        cols[cols.length - 1].push(nombre);
        return cols;
      }, []);

      const inscritosFormateados = inscritosPorColumna.map(col => col.join(', ')).join(' | ');

      return [
        torneo.nombre,
        torneo.fecha_inicio,
        torneo.fecha_fin,
        torneo.categoria,
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
        5: { cellWidth: 100 },  // Ajusta el ancho de la columna de inscritos
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

    doc.save('reporte_mis_torneos.pdf');
  };
};
