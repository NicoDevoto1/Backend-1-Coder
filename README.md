# Sistema de Turnos y Reservas

Pre entrega para el curso de Backend. Implementación de un `ServiceManager` con Node.js y módulos ESM.

## Instalación
1. Clonar este repositorio.
2. Ejecutar `npm install` para instalar las dependencias (`dotenv`).
3. Crear un archivo `.env` en la raíz (usar `.env.example` como guía) con las variables `PORT` y `NODE_ENV`.

## Ejecución
Ejecutar el siguiente comando para probar la aplicación y ver las demostraciones por consola:
\`npm start\`

## Recurso: Services
Estructura de un servicio:
- `id`: UUID generado automáticamente.
- `name`: Nombre del servicio.
- `description`: Descripción.
- `duration`: Duración en minutos.
- `price`: Precio.
- `category`: Categoría.
- `available`: Booleano indicando disponibilidad.

## Recurso: Bookings
Estructura de una reserva:
- `id`: UUID autogenerado.
- `clientName`: Nombre del cliente.
- `clientEmail`: Email del cliente.
- `date`: Fecha de la reserva.
- `time`: Hora de la reserva.
- `status`: Estado (ej. pending).
- `services`: Array de objetos `{ service: idDelServicio, quantity: cantidad }`.

### Endpoints de Bookings
- `POST /api/bookings`: Crea una nueva reserva. Requiere `clientName`, `clientEmail`, `date`, y `time` en el body.
- `GET /api/bookings/:bid`: Devuelve la reserva correspondiente al ID brindado.
- `POST /api/bookings/:bid/services/:sid`: Agrega el servicio indicado por `sid` a la reserva `bid`. Incrementa la cantidad si ya existe. Valida la existencia de ambos IDs.

## Endpoints de la API (Services)

A continuación se detallan los endpoints disponibles y ejemplos de cómo consumirlos.

### Obtener todos los servicios
Devuelve la lista completa de servicios. Acepta filtros por query params (`category` y `available`).
- **Ruta:** `GET /api/services`
- **Ejemplo de petición:**
  \`\`\`bash
  curl -X GET http://localhost:8080/api/services?category=salud&available=true
  \`\`\`

### Obtener un servicio por ID
- **Ruta:** `GET /api/services/:sid`
- **Ejemplo de petición:**
  \`\`\`bash
  curl -X GET http://localhost:8080/api/services/a1b2c3d4...
  \`\`\`

### Crear un servicio
Crea un nuevo servicio validando los campos obligatorios. El ID se autogenera.
- **Ruta:** `POST /api/services`
- **Ejemplo de petición:**
  \`\`\`bash
  curl -X POST http://localhost:8080/api/services \
  -H "Content-Type: application/json" \
  -d '{
        "name": "Terapia Física",
        "description": "Sesión de kinesiología de 1 hora",
        "duration": 60,
        "price": 5000,
        "category": "Salud",
        "available": true
      }'
  \`\`\`

### Actualizar un servicio
Actualiza campos específicos. Valida que `price` sea positivo y `duration` mayor a cero. No permite modificar el ID.
- **Ruta:** `PUT /api/services/:sid`
- **Ejemplo de petición:**
  \`\`\`bash
  curl -X PUT http://localhost:8080/api/services/a1b2c3d4... \
  -H "Content-Type: application/json" \
  -d '{"price": 5500}'
  \`\`\`

### Eliminar un servicio
- **Ruta:** `DELETE /api/services/:sid`
- **Ejemplo de petición:**
  \`\`\`bash
  curl -X DELETE http://localhost:8080/api/services/a1b2c3d4...
  \`\`\`
