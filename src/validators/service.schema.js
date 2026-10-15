//Reglas de los servidores

import { z } from 'zod';

export const createServiceSchema = z.object({
    name: z.string({ required_error: "El nombre es obligatorio" }),
    description: z.string({ required_error: "La descripción es obligatoria" }),
    duration: z.number({ required_error: "La duración debe ser un número" }).positive("La duración debe ser mayor a 0"),
    price: z.number({ required_error: "El precio debe ser un número" }).nonnegative("El precio no puede ser negativo"),
    category: z.string({ required_error: "La categoría es obligatoria" }),
    available: z.boolean({ required_error: "La disponibilidad es obligatoria" })
});

// El esquema de actualización hace que todos los campos sean opcionales (partial)
export const updateServiceSchema = createServiceSchema.partial();