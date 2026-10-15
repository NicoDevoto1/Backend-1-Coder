//Actualizo el modelo, DAO, Service y Controller de services para usar el plugin de paginación.

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const serviceSchema = new mongoose.Schema({
    // ... tus campos actuales siguen exactamente igual ...
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, required: true }
}, { versionKey: false });

serviceSchema.plugin(mongoosePaginate); // <-- Agregamos el plugin
export const ServiceModel = mongoose.model('Service', serviceSchema);