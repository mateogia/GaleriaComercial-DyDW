// Control del menú hamburguesa
(function() {
    'use strict';
    
    console.log('Menu.js cargando...');
    
    function initMenu() {
        console.log('initMenu ejecutándose');
        
        const hamburger = document.getElementById('hamburger');
        const nav = document.getElementById('nav');
        const navClose = document.getElementById('navClose');
        const body = document.body;

        console.log('Elementos encontrados:');
        console.log('- Hamburger:', hamburger);
        console.log('- Nav:', nav);
        console.log('- NavClose:', navClose);

        if (!hamburger || !nav) {
            console.error('¡ERROR! No se encontraron los elementos necesarios');
            return;
        }

        // Abrir menú
        hamburger.addEventListener('click', function(e) {
            console.log('¡Click en hamburguesa!');
            e.preventDefault();
            e.stopPropagation();
            
            nav.classList.add('active');
            body.style.overflow = 'hidden';
            
            console.log('Clases del nav después del click:', nav.className);
        });

        // Cerrar menú con botón X
        if (navClose) {
            navClose.addEventListener('click', function(e) {
                console.log('¡Click en cerrar!');
                e.preventDefault();
                e.stopPropagation();
                
                nav.classList.remove('active');
                body.style.overflow = '';
            });
        }

        // Cerrar menú al hacer clic fuera
        nav.addEventListener('click', function(e) {
            if (e.target === nav) {
                console.log('Click fuera del menú');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Cerrar menú al presionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                console.log('ESC presionado');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer clic en un link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('Click en link');
                nav.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        console.log('Menu inicializado correctamente');
    }

    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
    
    console.log('Menu.js cargado');
})();
