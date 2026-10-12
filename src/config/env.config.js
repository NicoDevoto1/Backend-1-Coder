import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['PORT', 'NODE_ENV', 'MONGO_URI'];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`Error crítico: Falta la variable de entorno requerida -> ${envVar}`);
        process.exit(1); // Detiene la ejecución
    }
});

export const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI
};