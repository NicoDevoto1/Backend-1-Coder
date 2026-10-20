import { Router } from 'express';
import { 
    getServices, 
    getServiceById, 
    createService, 
    updateService, 
    deleteService 
} from '../controllers/services.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createServiceSchema, updateServiceSchema } from '../validators/service.schema.js';

const router = Router();

router.get('/', getServices);
router.get('/:sid', getServiceById);
router.post('/', validateSchema(createServiceSchema), createService);
router.put('/:sid', validateSchema(updateServiceSchema), updateService);
router.delete('/:sid', deleteService);

export default router;