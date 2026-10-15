# Sistema de Turnos y Reservas

Implementación de un `ServiceManager` con Node.js y módulos ESM.

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
- `price`: Precio.# Sistema Backend de Turnos y Reservas

Este proyecto es una API RESTful desarrollada con Node.js y Express para la gestión de turnos y reservas. Implementa una arquitectura profesional en capas, persistencia de datos en MongoDB Atlas, validaciones estrictas, renderizado de vistas del lado del servidor y actualizaciones en tiempo real.

## 🚀 Tecnologías y Dependencias

Para que el proyecto funcione correctamente, hace uso de las siguientes dependencias clave:
- **express**: Framework web para la creación del servidor y manejo de rutas.
- **mongoose**: ODM para modelar y persistir los datos en MongoDB.
- **mongoose-paginate-v2**: Plugin para manejar la paginación avanzada de consultas en la base de datos.
- **zod**: Herramienta de validación de esquemas tipados para sanitizar los datos de entrada (`req.body`).
- **express-handlebars**: Motor de plantillas para renderizar las vistas HTML desde el servidor.
- **socket.io**: Librería para habilitar la comunicación bidireccional y actualizaciones en tiempo real en el frontend.
- **dotenv**: Carga de variables de entorno desde un archivo `.env`.

## ⚙️ Instalación y Configuración

1. Clonar este repositorio.
2. Ejecutar el comando para instalar todas las dependencias:
   \`\`\`bash
   npm install
   \`\`\`
3. Crear un archivo `.env` en la raíz del proyecto (puedes usar `.env.example` como guía) con las siguientes variables obligatorias:
   \`\`\`env
   PORT=8080
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombreDB>?retryWrites=true&w=majority
   \`\`\`
   *(Nota: La aplicación validará que `MONGO_URI` exista al iniciar; de lo contrario, detendrá la ejecución por seguridad).*

4. Iniciar el servidor:
   \`\`\`bash
   npm start
   \`\`\`

## 🏗️ Arquitectura en Capas (Layered Architecture)

El proyecto está diseñado bajo un estricto patrón de separación de responsabilidades:
- **Router (`/routes`)**: Define los endpoints y delega la petición, aplicando middlewares de validación (Zod).
- **Controller (`/controllers`)**: Maneja el flujo HTTP (`req` y `res`), extrae parámetros y llama a los servicios.
- **Service (`/services`)**: Contiene la lógica de negocio pura, agnóstica a la red y a la base de datos.
- **Repository (`/repositories`)**: Actúa como puente o interfaz, desacoplando la lógica de negocio del DAO.
- **DAO (`/dao`)**: Data Access Object. Es la única capa que interactúa directamente con los modelos de la base de datos.
- **Models (`/models`)**: Esquemas de Mongoose que definen la estructura estricta en MongoDB Atlas.

## 📦 Modelos de Datos

### Recurso: Services
- `_id`: ObjectId generado por MongoDB.
- `name`, `description`, `category`: Cadenas de texto.
- `duration`, `price`: Valores numéricos.
- `available`: Booleano indicando disponibilidad.

### Recurso: Bookings
- `_id`: ObjectId autogenerado.
- `clientName`, `clientEmail`, `date`, `time`: Datos de contacto y agendamiento.
- `status`: Estado de la reserva (ej. `pending`).
- `services`: Array de referencias a servicios utilizando `ObjectId` (`{ service: ObjectId, quantity: Number }`). Al consultar una reserva, se utiliza `.populate()` para hidratar estos IDs y devolver la información completa del servicio.

## 📡 Endpoints de la API REST

### Servicios (`/api/services`)

- **`GET /api/services`**: Obtiene el catálogo de servicios. 
  - *Soporta Consultas Avanzadas (Paginación y Filtros):* `category`, `available` (true/false), `page` (def: 1), `limit` (def: 10), `sortBy` (ej: price), `order` (asc/desc).
  - *Ejemplo:* `/api/services?category=salud&available=true&sortBy=price&order=desc&limit=5&page=1`
- **`GET /api/services/:sid`**: Devuelve un servicio específico.
- **`POST /api/services`**: Crea un nuevo servicio (Validado por Zod).
- **`PUT /api/services/:sid`**: Actualiza campos específicos de un servicio (Validado por Zod).
- **`DELETE /api/services/:sid`**: Elimina un servicio lógicamente o físicamente.

### Reservas (`/api/bookings`)

- **`POST /api/bookings`**: Crea una nueva reserva inicial (Validada por Zod).
- **`GET /api/bookings/:bid`**: Devuelve una reserva específica. **Utiliza Populate** para devolver el detalle completo de los servicios contratados en lugar de solo sus IDs.
- **`POST /api/bookings/:bid/services/:sid`**: Añade un servicio a la reserva. Si el servicio ya existe en el array, incrementa la propiedad `quantity`.

## 🖥️ Vistas y Tiempo Real

La aplicación incluye una interfaz visual básica para usuarios:
- **`GET /views/services`**: Renderiza el catálogo de servicios utilizando Handlebars. 
- **Socket.io**: Esta vista está conectada mediante WebSockets. Al realizar un `POST /api/services` de forma externa (ej. vía Postman/Thunder Client), el nuevo servicio aparecerá automáticamente en la pantalla de todos los clientes conectados sin necesidad de recargar la página.
- **`GET /views/availability`**: Muestra exclusivamente los servicios habilitados (`available: true`).
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

## Arquitectura en Capas (Layered Architecture)
Este proyecto implementa un patrón de diseño en capas para separar responsabilidades y facilitar el mantenimiento y escalabilidad:
- **Router:** Define los endpoints y delega la petición al controlador.
- **Controller:** Maneja el flujo HTTP (req/res) y llama a los servicios.
- **Service:** Contiene la lógica de negocio y reglas de la aplicación, agnóstico al protocolo HTTP.
- **Repository:** Actúa como interfaz para el acceso a datos.
- **DAO (Data Access Object):** Interactúa directamente con la persistencia física (FileSystem) sin involucrar reglas de negocio.