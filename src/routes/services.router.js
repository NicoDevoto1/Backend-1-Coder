import { Router } from 'express';
// ... importaciones del controller ...
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createServiceSchema, updateServiceSchema } from '../validators/service.schema.js';

const router = Router();

router.get('/', getServices);
router.get('/:sid', getServiceById);
router.post('/', validateSchema(createServiceSchema), createService); // <-- Validación aplicada
router.put('/:sid', validateSchema(updateServiceSchema), updateService); // <-- Validación aplicada
router.delete('/:sid', deleteService);

export default router;