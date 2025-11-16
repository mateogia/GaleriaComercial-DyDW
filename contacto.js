// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío real del formulario
            
            // Mostrar mensaje de éxito
            alert('✅ ¡Mensaje enviado con éxito!\n\nGracias por contactarnos. Te responderemos a la brevedad.');
            
            // Limpiar el formulario
            contactForm.reset();
        });
    }
});
