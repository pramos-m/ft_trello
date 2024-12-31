import express from "express";
import index from "./routes/index.js"
import session from "express-session";
import passport from "./middleware/passport.js"; // Importaremos la configuración de passport

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

app.use("/", index);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});