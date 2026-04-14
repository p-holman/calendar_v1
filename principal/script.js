/**
 * Script para gestionar la vista de enfoque del calendario escolar (Bootstrap Version)
 */

// Modelos de datos para asignaturas (Codificación visual por color)
const subjects = {
    math: { name: 'Matemáticas', color: 'var(--color-math)' },
    lang: { name: 'Lenguaje y Com.', color: 'var(--color-lang)' },
    sci: { name: 'Ciencias', color: 'var(--color-sci)' },
    hist: { name: 'Historia', color: 'var(--color-hist)' },
    eng: { name: 'Inglés', color: 'var(--color-eng)' }
};

// Modelos de datos para tipos de actividad (Simbología visual)
const activityTypes = {
    task: { name: 'Tarea', icon: 'ph-pencil-simple' },
    material: { name: 'Material', icon: 'ph-book-open' },
    eval: { name: 'Evaluación', icon: 'ph-bell-ringing' }
};

// Datos simulados (Mock data) demostrando el escenario descrito en el problema_solucion.md
const activities = [
    {
        id: 1,
        day: 'hoy',
        subject: 'math',
        type: 'task',
        title: 'Ejercicios de Álgebra',
        description: 'Resolver los ejercicios de la página 45 a la 47 del libro rojo. Se revisarán los resultados durante los primeros 15 minutos de la clase.',
        resources: [
            { name: 'Guía complementaria Álgebra.pdf', url: '#', type: 'pdf' }
        ]
    },
    {
        id: 2,
        day: 'hoy',
        subject: 'lang',
        type: 'material',
        title: 'Plan Lector: "1984"',
        description: 'Lectura obligatoria de los capítulos 1 y 2 para el control de lectura que se realizará el próximo jueves. El libro se encuentra disponible en PDF.',
        resources: [
            { name: 'Libro 1984 - George Orwell.pdf', url: '#', type: 'pdf' },
            { name: 'Pauta de Análisis.doc', url: '#', type: 'doc' }
        ]
    },
    {
        id: 3,
        day: 'manana',
        subject: 'sci',
        type: 'eval',
        title: 'Prueba: Sistema Digestivo',
        description: 'Evaluación sumativa abarcando todos los contenidos de la unidad 2. Recuerden revisar el esquema entregado en la clase anterior.',
        resources: [
            { name: 'Esquema de Resumen Estudiantil.jpg', url: '#', type: 'image' },
            { name: 'Video Explicativo (Repaso)', url: '#', type: 'video' }
        ]
    },
    {
        id: 4,
        day: 'manana',
        subject: 'hist',
        type: 'task',
        title: 'Línea de Tiempo',
        description: 'Construir una línea de tiempo sobre la Revolución Industrial ilustrando al menos 5 hitos principales. Puede ser a mano o digital.',
        resources: []
    },
    {
        id: 5,
        day: 'manana',
        subject: 'eng',
        type: 'material',
        title: 'Verbos Irregulares',
        description: 'Traer el listado de verbos irregulares impreso y pegado en el cuaderno para la actividad grupal.',
        resources: [
            { name: 'Irregular_Verbs_List.pdf', url: '#', type: 'pdf' },
            { name: 'Audio Pronunciación', url: '#', type: 'audio' }
        ]
    }
];

// Inicialización de la Interfaz
document.addEventListener('DOMContentLoaded', () => {
    establecerFechas();
    renderizarActividades();
});

// Configurar los encabezados de fecha dinámica
function establecerFechas() {
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const opcionesFormato = { weekday: 'long', day: 'numeric', month: 'long' };

    // Capitalizar la primera letra
    const formatearFecha = (fecha) => {
        let texto = fecha.toLocaleDateString('es-ES', opcionesFormato);
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    document.getElementById('date-hoy').textContent = formatearFecha(hoy);
    document.getElementById('date-manana').textContent = formatearFecha(manana);
}

// Renderizar las tarjetas de actividad correspondientes a hoy y mañana
function renderizarActividades() {
    const listaHoy = document.getElementById('list-hoy');
    const listaManana = document.getElementById('list-manana');

    listaHoy.innerHTML = '';
    listaManana.innerHTML = '';

    activities.forEach(act => {
        const sub = subjects[act.subject];
        const type = activityTypes[act.type];

        const card = document.createElement('div');
        card.className = 'activity-card rounded-4 p-3 d-flex align-items-start gap-3';
        // Inyectando variables CSS en la tarjeta individual de manera dinámica
        card.style.setProperty('--subject-color', sub.color);

        card.innerHTML = `
            <div class="activity-icon rounded-3 fs-4 flex-shrink-0">
                <i class="ph ${type.icon}"></i>
            </div>
            <div class="flex-grow-1">
                <div class="activity-subject text-uppercase fw-bold mb-1" style="font-size: 0.75rem;">${sub.name}</div>
                <div class="fs-5 fw-semibold mb-2 text-dark lh-sm">${act.title}</div>
                <div class="d-flex align-items-center gap-3 fs-6 text-secondary fw-medium">
                    <span class="d-flex align-items-center gap-1">
                        <i class="ph ${type.icon}"></i> ${type.name}
                    </span>
                    ${act.resources.length > 0
                ? `<span class="d-flex align-items-center gap-1"><i class="ph ph-paperclip"></i> ${act.resources.length} adjunto(s)</span>`
                : ''}
                </div>
            </div>
        `;

        // Añadir el comportamiento modal de Bootstrap
        card.addEventListener('click', () => abrirModal(act));

        if (act.day === 'hoy') {
            listaHoy.appendChild(card);
        } else {
            listaManana.appendChild(card);
        }
    });

    // Estados vacíos (Zero states)
    if (listaHoy.children.length === 0) {
        listaHoy.innerHTML = `
            <div class="text-secondary text-center py-5 d-flex flex-column align-items-center gap-3 opacity-75">
                <i class="ph ph-confetti display-3"></i>
                <p class="mb-0">No tienes actividades académicas agendadas para hoy.<br>¡Disfruta tu tiempo libre!</p>
            </div>
        `;
    }

    if (listaManana.children.length === 0) {
        listaManana.innerHTML = `
            <div class="text-secondary text-center py-5 d-flex flex-column align-items-center gap-3 opacity-75">
                <i class="ph ph-coffee display-3"></i>
                <p class="mb-0">Mañana está libre de actividades agendadas.</p>
            </div>
        `;
    }
}

// Abrir modal y poblar datos usando Bootstrap API
function abrirModal(actividad) {
    const sub = subjects[actividad.subject];
    const type = activityTypes[actividad.type];

    // Ajustar cabeceras y color del tag modal
    const tagSubject = document.getElementById('modal-subject');
    tagSubject.textContent = sub.name;
    tagSubject.style.setProperty('--subject-color', sub.color);

    document.getElementById('modal-type').innerHTML = `<i class="ph ${type.icon}"></i> ${type.name}`;
    document.getElementById('modal-title').textContent = actividad.title;
    document.getElementById('modal-description').textContent = actividad.description;

    // Manejo de Repositorio Unificado en el modal
    const contenedorRecursos = document.getElementById('modal-resources');
    contenedorRecursos.innerHTML = '';

    if (actividad.resources && actividad.resources.length > 0) {
        const tituloRecursos = document.createElement('h6');
        tituloRecursos.textContent = 'Material de Apoyo y Entregables';
        tituloRecursos.className = 'text-dark fw-bold mt-2 mb-3';
        contenedorRecursos.appendChild(tituloRecursos);

        actividad.resources.forEach(res => {
            const btnEnlace = document.createElement('a');
            btnEnlace.className = 'resource-link text-dark d-flex align-items-center gap-3 p-3 rounded-3';
            btnEnlace.href = res.url;

            // Asignar icono dinámico según extensión/tipo de recurso
            let resIcon = 'ph-file';
            if (res.type === 'pdf') resIcon = 'ph-file-pdf';
            if (res.type === 'doc') resIcon = 'ph-file-text';
            if (res.type === 'image') resIcon = 'ph-image';
            if (res.type === 'video') resIcon = 'ph-video-camera';
            if (res.type === 'audio') resIcon = 'ph-speaker-high';

            btnEnlace.innerHTML = `
                <i class="ph ${resIcon} fs-3"></i>
                <span>${res.name}</span>
            `;
            contenedorRecursos.appendChild(btnEnlace);
        });
    }

    // Activar modal con Bootstrap
    const modalElement = document.getElementById('activity-modal');
    const myModal = new bootstrap.Modal(modalElement);
    myModal.show();
}
