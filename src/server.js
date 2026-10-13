import app from './app.js';
import { config } from './config/env.config.js';
import { connectDB } from './config/db.config.js';
import { Server } from 'socket.io'; // <-- Importar Socket.io

const PORT = config.port || 8080;

connectDB().then(() => {
    // 1. Levantamos el servidor HTTP
    const httpServer = app.listen(PORT, () => {
        console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });

    // 2. Configuramos Socket.io sobre el servidor HTTP
    const io = new Server(httpServer);
    
    // 3. Guardamos la instancia en el 'io' en la app para poder usarlo en los controllers
    app.set('io', io);

    io.on('connection', (socket) => {
        console.log(`🟢 Nuevo cliente conectado (ID: ${socket.id})`);
    });
});