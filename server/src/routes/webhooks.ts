import { Router } from 'express';

const r = Router();

// TODO: signature HMAC
r.post('/booking.created', (req, res) => {
  console.log('Webhook booking.created', req.body);
  res.sendStatus(204);
});

export default r;
