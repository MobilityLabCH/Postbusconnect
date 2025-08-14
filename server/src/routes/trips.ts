import { Router } from 'express';
import { db } from '../store/memory.js';
import { randomUUID } from 'crypto';

const r = Router();

r.post('/', (req, res) => {
  const { partner_id, route, date, departure_time, capacity, pricing_model, visibility } = req.body;
  if (!partner_id || !route || !date || !departure_time || !capacity || !pricing_model) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const id = `TRIP_${randomUUID().slice(0,8)}`;
  const trip = { id, partner_id, route, date, departure_time, capacity, pricing_model, visibility: visibility ?? { public: false }, booked: 0 };
  db.trips.set(id, trip);
  res.status(201).json(trip);
});

export default r;
