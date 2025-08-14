import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import availability from './availability.js';
import trips from './trips.js';
import bookings from './bookings.js';
import webhooks from './webhooks.js';

export const router = Router();

router.get('/health', (_, res) => res.json({ ok: true }));

router.use('/availability', auth(['availability:read']), availability);
router.use('/trips', auth(['trips:create']), trips);
router.use('/bookings', auth(['bookings:create']), bookings);
router.use('/webhooks', webhooks); // public endpoint (signature à ajouter)
