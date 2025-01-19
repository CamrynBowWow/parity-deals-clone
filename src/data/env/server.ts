// Gives me type safe access to all the environment variables

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	emptyStringAsUndefined: true,
	server: {
		DATABASE_URL: z.string().url(),
		CLERK_SECRET_KEY: z.string(),
		CLERK_WEBHOOK_SECRET: z.string(),
	},
	experimental__runtimeEnv: process.env, // Hooks up everything for me

	/* 
        If using 'runtimeEnv' then you will need to manually to add the values
    */
	// runtimeEnv: {
	//     DATABASE_URL: process.env.DATABASE_URL
	// }
});
