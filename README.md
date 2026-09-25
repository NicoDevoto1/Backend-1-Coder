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

## Métodos de ServiceManager
- `getServices()`: Devuelve todos los servicios guardados.
- `getServiceById(id)`: Busca un servicio por su ID.
- `addService(data)`: Crea un servicio validando campos y autogenerando ID.
- `updateService(id, data)`: Actualiza un servicio sin permitir modificar su ID.
- `deleteService(id)`: Elimina el servicio especificado por ID.
