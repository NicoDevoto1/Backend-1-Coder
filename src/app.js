import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';
import viewsRouter from './routes/views.router.js'; // Último router añadido

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'handlebars');

// Archivos estáticos (CSS, JS del cliente)
app.use(express.static(path.resolve('src', 'public')));

// Rutas de la API (siguen intactas)
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

// Ruta de las vistas
app.use('/views', viewsRouter);

export default app;