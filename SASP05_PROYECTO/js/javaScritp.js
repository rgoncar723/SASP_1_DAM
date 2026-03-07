/* 
    1. VARIABLES GLOBALES / DATOS
 */
const eventos = [
     { id: 1, nombre: "Reforestación Sierra Central", tipo: "Plantación", lugar: "Madrid", fecha: "2024-05-15", riesgo: "Bajo", claseRiesgo: "safe" },
     { id: 2, nombre: "Limpieza Playa de Postiguet", tipo: "Limpieza", lugar: "Alicante", fecha: "2024-05-20", riesgo: "Moderado", claseRiesgo: "warning" },
     { id: 3, nombre: "Rescate de Pinos Jóvenes", tipo: "Mantenimiento", lugar: "Sevilla", fecha: "2024-06-02", riesgo: "Alto (Sequía)", claseRiesgo: "danger" },
     { id: 4, nombre: "Identificación de Especies", tipo: "Monitoreo", lugar: "Barcelona", fecha: "2024-06-10", riesgo: "Bajo", claseRiesgo: "safe" }
];

/*
    2. DASHBOARD DE MONITOREO (ÁRBOLES E IOT)
    */

/**
 * Actualiza la información del árbol seleccionado en el panel lateral
 */
function showTreeDetails(id, moisture, status) {
     document.querySelector('#tree-id').innerText = id;
     document.querySelector('#soil-moisture').innerText = moisture;
     document.querySelector('#irrigation-status').innerText = status;
     
     const bar = document.querySelector('#moisture-bar');
     if (bar) {
          bar.style.width = moisture + "%";
          // Cambia a naranja si la humedad es crítica (<30%)
          bar.style.backgroundColor = moisture < 30 ? "#e67e22" : "#2980b9";
     }
}

/**
 * Simula el envío de una orden de riego a través de un sistema IoT
 */
function activateIrrigation() {
     const id = document.querySelector('#tree-id').innerText;
     if(id === "Seleccione un ejemplar") { 
          alert("Selecciona un ejemplar en el mapa."); 
          return; 
     }
     alert(`Señal IoT enviada: Riego activado para ${id}`);
}

/* 
 3. INICIALIZACIÓN DEL MAPA (LEAFLET)
     */

window.addEventListener('load', function() {
     console.log("Iniciando BioAcción Map...");

     const mapDiv = document.querySelector('#map');
     if (!mapDiv) {
          console.error("No se encontró <div id='map'>");
          return;
     }

     const map = L.map('map').setView([37.3891, -5.9845], 6);

     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap'
     }).addTo(map);

     // Ajuste técnico para asegurar que el mapa ocupe todo su contenedor
     setTimeout(() => {
          map.invalidateSize();
          console.log("Redimensionamiento forzado completado.");
     }, 200);

     // Capa de calor para zonas de riesgo de sequía
     const puntosCalor = [
          [37.38, -5.98, 0.8], [37.40, -5.99, 0.7], [37.35, -6.00, 0.9],
          [38.98, -3.92, 0.8], [37.99, -1.13, 0.9]
     ];
     L.heatLayer(puntosCalor, {radius: 25, blur: 15}).addTo(map);

     // Marcadores de ejemplares monitoreados
     L.marker([37.3891, -5.9845]).addTo(map)
          .bindPopup('<b>Sierra Sur</b><br><button onclick="showTreeDetails(\'Encina #42\', 25, \'Crítico\')">Detalles</button>');
     
     L.marker([38.9848, -3.9273]).addTo(map)
          .bindPopup('<b>Cabañeros</b><br><button onclick="showTreeDetails(\'Roble #12\', 75, \'Óptimo\')">Detalles</button>');
});

/* 
4. GESTIÓN DE EVENTOS COMUNITARIOS
     */

/**
 * Renderiza la lista de eventos en la tabla HTML
 */
function cargarEventos() {
     const tablaBody = document.querySelector('#lista-eventos-body');
     if(!tablaBody) return;
     
     tablaBody.innerHTML = ''; 

     eventos.forEach(evento => {
          const fila = `
                <tr>
                     <td><strong>${evento.nombre}</strong></td>
                     <td>${evento.tipo}</td>
                     <td>${evento.lugar}</td>
                     <td>${evento.fecha}</td>
                     <td><span class="badge ${evento.claseRiesgo}">${evento.riesgo}</span></td>
                     <td><button class="btn-unirse" onclick="unirseEvento(${evento.id})">Unirme</button></td>
                </tr>
          `;
          tablaBody.innerHTML += fila;
     });
}

function unirseEvento(id) {
     const eventoEncontrado = eventos.find(e => e.id === id);
     alert(`¡Genial! Te has pre-inscrito en: ${eventoEncontrado.nombre}. Revisa tu correo para más detalles.`);
}

/* 
5. FORMULARIO DE NUEVOS EVENTOS
    */

document.addEventListener('DOMContentLoaded', () => {
     cargarEventos();

     const form = document.querySelector('#event-form');
     if(form) {
          form.addEventListener('submit', function(event) {
                event.preventDefault();

                const nuevoEvento = {
                     id: Date.now(),
                     nombre: document.querySelector('#nombre').value,
                     categoria: document.querySelector('#categoria').value,
                     fecha: document.querySelector('#fecha').value,
                     ubicacion: document.querySelector('#ubicacion').value,
                     descripcion: document.querySelector('#descripcion').value,
                     estado: 'Pendiente de Validación'
                };

                console.log("Enviando datos al servidor...", nuevoEvento);

                this.reset();
                const mensaje = document.querySelector('#mensaje-exito');
                mensaje.style.display = 'block';

                setTimeout(() => {
                     mensaje.style.display = 'none';
                }, 5000);
          });
     }
});

