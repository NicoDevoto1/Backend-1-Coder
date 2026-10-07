import app from './app.js';
import { config } from '../config/env.config.js';

// Usamos el puerto que viene del archivo .env a través de env.config.js
const PORT = config.port || 8080;

app.listen(PORT, () => {
    console.log(`🚀 Servidor Express iniciado en el puerto ${PORT}`);
    console.log(`🌐 Entorno: ${config.nodeEnv}`);
});