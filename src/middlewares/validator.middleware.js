export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next(); // Si todo es válido, deja pasar la petición al Controller
    } catch (error) {
        // Zod devuelve un array de errores, los mapeamos para que sean legibles
        return res.status(400).json({ 
            error: "Datos inválidos", 
            details: error.errors.map(e => e.message) 
        });
    }
};