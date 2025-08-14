import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { cfg } from '../config.js';

export function auth(requiredScopes: string[] = []) {
  return (req: Request, res: Response, next: NextFunction) => {
    const h = req.headers.authorization || '';
    const token = h.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ error: 'Missing token' });
    try {
      const payload = jwt.verify(token, cfg.jwtSecret) as any;
      (req as any).partner = { id: payload.sub, scopes: payload.scopes || [] };
      const has = requiredScopes.every(s => (payload.scopes || []).includes(s));
      if (!has) return res.status(403).json({ error: 'Insufficient scope' });
      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}
