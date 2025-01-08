import express from "express";
import session from "express-session";

import passport from "./middleware/passport.js"; // Importaremos la configuración de passport
import { isAuthenticated } from "./middleware/auth.js";

import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import boardsRouter from "./routes/boards.js";
import tasksRouter from "./routes/tasks.js";
import listsRouter from "./routes/lists.js";

const { PORT = 3001 } = process.env;
const app = express();

// Configuración de session antes de passport
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'Mi3str1ng_S3cr3t0_L4rg0_Y_C0mpl3j0_2024',
    resave: false,
    saveUninitialized: true
	})
);

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.use("/auth", authRouter);

// Rutas de usuarios
// TMP: Ruta para crear un nuevo usuario
app.use("/users", isAuthenticated, usersRouter);

// Rutas de boards
app.use("/boards", isAuthenticated, boardsRouter);

// Rutas de tasks
app.use("/tasks", isAuthenticated, tasksRouter);

// Rutas de lists
app.use("/lists", isAuthenticated, listsRouter);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
