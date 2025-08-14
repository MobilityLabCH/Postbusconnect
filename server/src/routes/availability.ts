import { Router } from 'express';

const r = Router();

r.get('/', (req, res) => {
  const { from, to, date } = req.query as any;
  res.json({
    from, to, date,
    vehicles_available: 3,
    drivers_available: 2,
    notes: 'Opérable sous réserve de confirmation opérationnelle'
  });
});

export default r;
