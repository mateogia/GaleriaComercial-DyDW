// Base de datos de locales (incluye los locales importantes de la galería)
const locales = [
    // PLANTA BAJA - Locales arriba del pasillo (Av. Principal)
    { 
        id: 1, 
        nombre: "Florería Primavera", 
        categoria: "servicios", 
        piso: "planta-baja", 
        numero: "1", 
        descripcion: "Flores y arreglos florales",
        posicion: { top: '12%', left: '8%', width: '18%', height: '28%' }
    },
    { 
        id: 2, 
        nombre: "Petshop Amigos", 
        categoria: "servicios", 
        piso: "planta-baja", 
        numero: "2", 
        descripcion: "Productos y accesorios para mascotas",
        posicion: { top: '12%', left: '33%', width: '22%', height: '28%' }
    },
    { 
        id: 3, 
        nombre: "Apple Store", 
        categoria: "tecnologia", 
        piso: "planta-baja", 
        numero: "3", 
        descripcion: "Tecnología y electrónica",
        posicion: { top: '12%', left: '62%', width: '28%', height: '28%' }
    },
    // PLANTA BAJA - Locales abajo del pasillo (Calle Comercio)
    { 
        id: 4, 
        nombre: "Almacén Italiano La Toscana", 
        categoria: "gastronomia", 
        piso: "planta-baja", 
        numero: "4", 
        descripcion: "Productos gourmet italianos",
        posicion: { top: '58%', left: '8%', width: '20%', height: '32%' }
    },
    { 
        id: 5, 
        nombre: "Nike Store", 
        categoria: "moda", 
        piso: "planta-baja", 
        numero: "5", 
        descripcion: "Indumentaria deportiva",
        posicion: { top: '58%', left: '35%', width: '24%', height: '32%' }
    },
    { 
        id: 6, 
        nombre: "Estudio Diseño Interior Espacios", 
        categoria: "servicios", 
        piso: "planta-baja", 
        numero: "6", 
        descripcion: "Decoración y diseño de interiores",
        posicion: { top: '58%', left: '66%', width: '24%', height: '32%' }
    },
    // PRIMER PISO - Locales arriba del pasillo
    { 
        id: 7, 
        nombre: "Cine Ecléctico", 
        categoria: "entretenimiento", 
        piso: "primer-piso", 
        numero: "7", 
        descripcion: "Salas de cine",
        posicion: { top: '14%', left: '8%', width: '40%', height: '30%' }
    },
    { 
        id: 8, 
        nombre: "Game Station", 
        categoria: "entretenimiento", 
        piso: "primer-piso", 
        numero: "8", 
        descripcion: "Videojuegos y arcade",
        posicion: { top: '14%', left: '55%', width: '35%', height: '30%' }
    },
    // PRIMER PISO - Local abajo del pasillo
    { 
        id: 9, 
        nombre: "Food Court", 
        categoria: "gastronomia", 
        piso: "primer-piso", 
        numero: "9", 
        descripcion: "Patio de comidas",
        posicion: { top: '58%', left: '8%', width: '82%', height: '28%' }
    }
];

// Variables globales
let filteredLocales = [...locales];
let currentFloor = 'planta-baja';
let currentCategory = 'todos';

// Función para renderizar locales en el mapa (estilo plano arquitectónico)
function renderFloorMap(piso) {
    const floorMap = document.querySelector(`#${piso} .floor-plan`);
    if (!floorMap) return;

    const localesDelPiso = filteredLocales.filter(local => local.piso === piso);
    
    // IMPORTANTE: Eliminar solo los locales anteriores, NO los elementos espaciales
    const existingStores = floorMap.querySelectorAll('.store-space');
    existingStores.forEach(store => store.remove());
    
    // Agregar los nuevos locales sin borrar los elementos espaciales
    const localesHTML = localesDelPiso.map(local => `
        <div class="store-space" 
             data-id="${local.id}" 
             onclick="showLocalInfo(${local.id})"
             style="top: ${local.posicion.top}; 
                    left: ${local.posicion.left}; 
                    width: ${local.posicion.width}; 
                    height: ${local.posicion.height};">
            <div class="store-number">#${local.numero}</div>
            <div class="store-icon">${getCategoryIcon(local.categoria)}</div>
            <div class="store-name">${local.nombre}</div>
        </div>
    `).join('');
    
    floorMap.insertAdjacentHTML('beforeend', localesHTML);
}

// Función para renderizar lista de locales
function renderStoreList() {
    const storeList = document.getElementById('storeList');
    const noResults = document.getElementById('noResults');
    
    if (filteredLocales.length === 0) {
        storeList.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    storeList.style.display = 'grid';
    noResults.style.display = 'none';
    
    storeList.innerHTML = filteredLocales.map(local => `
        <div class="store-list-card" data-id="${local.id}" onclick="highlightLocal(${local.id})">
            <div class="store-list-icon">${getCategoryIcon(local.categoria)}</div>
            <div class="store-list-info">
                <h3>${local.nombre}</h3>
                <p class="store-list-location">📍 ${getPisoName(local.piso)} - Local ${local.numero}</p>
                <p class="store-list-description">${local.descripcion}</p>
                <span class="store-list-category">${getCategoryName(local.categoria)}</span>
            </div>
        </div>
    `).join('');
    
    updateResultsCount();
}

// Función para obtener icono de categoría
function getCategoryIcon(categoria) {
    const icons = {
        'moda': '👔',
        'gastronomia': '🍽️',
        'tecnologia': '📱',
        'hogar': '🏠',
        'belleza': '💄',
        'entretenimiento': '🎮',
        'servicios': '🔧'
    };
    return icons[categoria] || '🏪';
}

// Función para obtener nombre de categoría
function getCategoryName(categoria) {
    const names = {
        'moda': 'Moda y Accesorios',
        'gastronomia': 'Gastronomía',
        'tecnologia': 'Tecnología',
        'hogar': 'Hogar y Decoración',
        'belleza': 'Belleza',
        'entretenimiento': 'Entretenimiento',
        'servicios': 'Servicios'
    };
    return names[categoria] || 'Otros';
}

// Función para obtener nombre del piso
function getPisoName(piso) {
    const names = {
        'planta-baja': 'Planta Baja',
        'primer-piso': 'Primer Piso',
        'segundo-piso': 'Segundo Piso'
    };
    return names[piso] || piso;
}

// Función para actualizar contador de resultados
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    const total = locales.length;
    resultsCount.innerHTML = `Mostrando <strong>${filteredLocales.length}</strong> de <strong>${total}</strong> locales`;
}

// Función para buscar locales
function searchLocales(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredLocales = locales.filter(local => 
            currentCategory === 'todos' || local.categoria === currentCategory
        );
    } else {
        filteredLocales = locales.filter(local => {
            const matchesSearch = local.nombre.toLowerCase().includes(searchTerm) ||
                                local.descripcion.toLowerCase().includes(searchTerm);
            const matchesCategory = currentCategory === 'todos' || local.categoria === currentCategory;
            return matchesSearch && matchesCategory;
        });
    }
    
    renderAll();
}

// Función para filtrar por categoría
function filterByCategory(categoria) {
    currentCategory = categoria;
    const searchInput = document.getElementById('searchInput');
    searchLocales(searchInput.value);
}

// Función para resaltar un local
function highlightLocal(id) {
    const local = locales.find(l => l.id === id);
    if (!local) return;
    
    // Cambiar al piso del local
    changeFloor(local.piso);
    
    // Remover resaltados previos
    document.querySelectorAll('.store-space').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Resaltar el local
    const localCard = document.querySelector(`.store-space[data-id="${id}"]`);
    if (localCard) {
        localCard.classList.add('highlighted');
        
        // Scroll suave al mapa
        document.querySelector('.map-interactive-container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Efecto de pulso
        setTimeout(() => {
            localCard.classList.add('pulse');
            setTimeout(() => localCard.classList.remove('pulse'), 1500);
        }, 500);
    }
}

// Función para mostrar información del local
function showLocalInfo(id) {
    const local = locales.find(l => l.id === id);
    if (!local) return;
    
    alert(`📍 ${local.nombre}\n\n` +
          `🏢 Ubicación: ${getPisoName(local.piso)} - Local ${local.numero}\n` +
          `📋 Categoría: ${getCategoryName(local.categoria)}\n` +
          `ℹ️ ${local.descripcion}`);
    
    highlightLocal(id);
}

// Función para cambiar de piso
function changeFloor(piso) {
    currentFloor = piso;
    
    // Actualizar botones
    document.querySelectorAll('.floor-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.floor === piso) {
            btn.classList.add('active');
        }
    });
    
    // Actualizar mapas
    document.querySelectorAll('.floor-map').forEach(map => {
        map.classList.remove('active');
    });
    document.getElementById(piso).classList.add('active');
}

// Función para renderizar todo
function renderAll() {
    renderFloorMap('planta-baja');
    renderFloorMap('primer-piso');
    renderFloorMap('segundo-piso');
    renderStoreList();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar inicial
    renderAll();
    
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchLocales(e.target.value);
    });
    
    // Filtros de categoría
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterByCategory(this.dataset.category);
        });
    });
    
    // Cambio de piso
    document.querySelectorAll('.floor-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            changeFloor(this.dataset.floor);
        });
    });
});
