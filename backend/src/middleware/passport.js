import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../db/connection.js';

// Serialización
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialización
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.collection('users').findOne({ _id: id });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    proxy: true
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await db.collection('users').findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        const newUser = {
            googleId: profile.id,
            email: profile.emails[0].value,
            boards: [],
            favorites: [],
            createdAt: new Date(),
        };
        const result = await db.collection('users').insertOne(newUser);
        newUser._id = result.insertedId;
        done(null, newUser);
    } catch (err) {
        done(err, null);
    }
}
));


export default passport;