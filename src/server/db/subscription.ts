import { db } from '@/drizzle/db';
import { UserSubscriptionTable } from '@/drizzle/schema';

//$inferInsert: Essentially saying that this data is whatever we can insert into our particular table
export function createUserSubscription(data: typeof UserSubscriptionTable.$inferInsert) {
	return db
		.insert(UserSubscriptionTable)
		.values(data)
		.onConflictDoNothing({ target: UserSubscriptionTable.clerkUserId });
}
