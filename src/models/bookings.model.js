import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'pending' },
    services: [
        {
            service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
            quantity: { type: Number, default: 1 }
        }
    ]
}, { versionKey: false });

export const BookingModel = mongoose.model('Booking', bookingSchema);