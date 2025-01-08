import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../db/connection.js';
import { ObjectId } from "mongodb";

// Serialización
passport.serializeUser((user, done) => {
	done(null, user);
});

// Deserialización
passport.deserializeUser((obj, done) => {
	done(null, obj);
});

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
async (accessToken, refreshToken, profile, done) => {
	try {
		const existingUser = await db.collection('users').findOne({ _id: ObjectId.createFromTime(profile.id) });

		if (existingUser) {
			return done(null, existingUser);
		}
		const newUser = {
			_id: ObjectId.createFromTime(profile.id),
			email: profile.emails[0].value,
		};
		const result = await db.collection('users').insertOne(newUser);
		return done(null, newUser);
	} catch (err) {
		return done(err, null);
	}
}));

export default passport;
