import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './drizzle/db';

export const auth = betterAuth({
	baseURL: 'http://localhost:5273',
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	emailAndPassword: {
		enabled: true
		// requireEmailVerification: false
	},
	advanced: {
		cookiePrefix: 'towelie'
	}
});
