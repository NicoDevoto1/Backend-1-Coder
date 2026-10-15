import { z } from 'zod';

export const createBookingSchema = z.object({
    clientName: z.string({ required_error: "El nombre del cliente es obligatorio" }),
    clientEmail: z.string().email("Debe ser un email válido"),
    date: z.string({ required_error: "La fecha es obligatoria" }),
    time: z.string({ required_error: "La hora es obligatoria" }),
    status: z.string().optional()
});