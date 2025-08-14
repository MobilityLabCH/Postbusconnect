import { Router } from 'express';
import { db } from '../store/memory.js';
import { randomUUID } from 'crypto';
import { priceCHF } from '../services/pricing.js';
import { verifyMagicPass } from '../services/magicpass.js';
import { cfg } from '../config.js';
import { toDataURL } from '../services/qrcode.js';

const r = Router();

r.post('/', async (req, res) => {
  const { trip_id, passengers, source, magic_pass_id } = req.body;
  const trip = db.trips.get(trip_id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  if ((trip.booked + (passengers?.length || 0)) > trip.capacity) {
    return res.status(409).json({ error: 'Capacity exceeded' });
  }

  if (magic_pass_id) {
    const ok = await verifyMagicPass(magic_pass_id);
    if (!ok) return res.status(400).json({ error: 'Invalid Magic Pass' });
  }

  const id = `BKG_${randomUUID().slice(0,8)}`;
  const booking = { id, trip_id, passengers: passengers || [], source, created_at: new Date().toISOString() };
  db.bookings.set(id, booking);
  trip.booked += (passengers?.length || 0);

  const amount = priceCHF(trip.pricing_model, passengers?.length || 0);

  const miniSiteUrl = `${cfg.publicBaseUrl}/ticket/${id}`;
  const qr = await toDataURL(miniSiteUrl);

  res.status(201).json({
    booking, trip, amount_chf: amount, ticket_qr: qr, ticket_url: miniSiteUrl
  });
});

export default r;
