import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function protect(req, res, next) {
    const token = req.cookies?.jwt;

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, env.jwt.secret);
        req.user = { id: decoded.id, role: decoded.role};
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}