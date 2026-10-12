import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { versionKey: false });

export const MessageModel = mongoose.model('Message', messageSchema);