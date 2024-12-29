// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'No autorizado - Inicia sesión primero' });
};

// Middleware para verificar si el usuario NO está autenticado (útil para rutas de login)
export const isNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard'); // Redirecciona si ya está autenticado
};