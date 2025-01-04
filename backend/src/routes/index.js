import express from "express";
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
			successReturnToOrRedirect: "/",
			failureRedirect: '/login' 
		})
);

// Ruta para verificar usuario actual
router.get('/current-user', (req, res) => {
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

router.get('/dashboard', isAuthenticated, (req, res) => {
		res.json({ user: req.user });
});

router.get('/', (req, res) => {
		res.send({message : "Hello from Express!"});
})

router.post("/board/new", (req, res) => {
	console.log(req.body);
	res.send({message: `new board created with ${req.body.name}`});
});

export default router;
