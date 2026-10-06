import express from 'express';
import servicesRouter from './router/services.router.js';

const app = express();

//Middlewares fundamentales para que express entienda los JSON que le enviemos en req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Conectamos nuestro router a la ruta base "/api/services"
app.use('/api/services', servicesRouter);

//Exportamos "app" para que el servidor lo levante en otro archivo
export default app;