import express from "express";
import session from "express-session";
import passport from "passport";
import index from "./routes/index.js";
import "./middleware/passport.js"; // Importaremos la configuración de passport
import 'dotenv/config';

const { PORT = 3001 } = process.env;
const app = express();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);

// Configuración de session antes de passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'tu_secreto_temporal',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/", index);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});