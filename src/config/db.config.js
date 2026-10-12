import mongoose from 'mongoose';
import { config } from './env.config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('✅ Base de datos conectada a MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        process.exit(1);
    }
};