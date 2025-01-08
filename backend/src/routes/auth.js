import express from "express";
import passport from 'passport';

const	router = express.Router();

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: "/",
    failureRedirect: '/login' 
  })
);

// Ruta para verificar usuario actual
router.get('/session', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  res.json(req.user);
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default router;
