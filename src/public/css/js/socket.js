const socket = io();

// Escuchamos el evento que emite el controller
socket.on('newService', (service) => {
    const servicesList = document.getElementById('services-list');
    
    if (servicesList) {
        const li = document.createElement('li');
        li.id = `service-${service._id}`;
        const isAvailable = service.available ? 'Sí' : 'No';
        
        li.innerHTML = `
            <strong>${service.name}</strong> (${service.category}) - $${service.price}<br>
            ${service.description} <br>
            Duración: ${service.duration} min | Disponible: ${isAvailable}
        `;
        
        // Agregamos el nuevo servicio al final de la lista sin recargar la página
        servicesList.appendChild(li);
    }
});