import app from './app.js';
import { config } from './config/env.config.js';
import { connectDB } from './config/db.config.js';

// Usamos el puerto que viene del archivo .env a través de env.config.js
const PORT = config.port || 8080;

connectDB().then (() => {
    app.listen(PORT, () => {
        console.log('Servidor escuchando en el puerto ${PORT}');
    });
});