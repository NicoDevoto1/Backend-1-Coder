import { Router } from 'express';
import { 
    createBooking, 
    getBookingById, 
    addServiceToBooking 
} from '../controllers/bookings.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createBookingSchema } from '../validators/booking.schema.js';

const router = Router();

router.post('/', validateSchema(createBookingSchema), createBooking);
router.get('/:bid', getBookingById);
router.post('/:bid/services/:sid', addServiceToBooking);

export default router;