import express from 'express';
import passport from 'passport';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Rutas de autenticación
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { 
        failureRedirect: '/login-failed' 
    }),
    (req, res) => {
        // Autenticación exitosa
        res.redirect('/dashboard'); // O donde quieras redirigir
    }
);

// Ruta para verificar usuario actual
router.get('/api/current-user', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'No autenticado' });
    }
    res.json(req.user);
});

// Ruta para cerrar sesión
router.get('/api/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/dashboard', isAuthenticated, (req, res) => {
    res.json({ user: req.user });
});

export default router;