import { Router } from 'express';
// ... importaciones del controller ...
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createBookingSchema } from '../validators/booking.schema.js';

const router = Router();

router.post('/', validateSchema(createBookingSchema), createBooking); // <-- Validación aplicada
router.get('/:bid', getBookingById);
router.post('/:bid/services/:sid', addServiceToBooking);

export default router;