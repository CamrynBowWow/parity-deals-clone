// Global cache. Example: Countries there's the same amount of countries for every user and if I change one country I want to refresh my entire cache for all of the countries.
// User cache. Example: When a user creates a product I don't want to refresh the cache for all the products I only want to refresh the cache for that user's products.
// Individual cache. Example: If I delete this one product I only want to update the cache for that one product I don't want to update the cache for literally everybody in our entire application.

/* eslint-disable  @typescript-eslint/no-explicit-any */

// Gives tags that allow to revalidate and cache things
import { revalidateTag, unstable_cache } from 'next/cache';
import { cache } from 'react';

export type ValidTags =
	| ReturnType<typeof getGlobalTag>
	| ReturnType<typeof getUserTag>
	| ReturnType<typeof getIdTag>;

export const CACHE_TAGS = {
	products: 'products',
	productViews: 'productViews',
	subscription: 'subscription',
} as const;

export function getGlobalTag(tag: keyof typeof CACHE_TAGS) {
	return `global:${CACHE_TAGS[tag]}` as const;
}

export function getUserTag(userId: string, tag: keyof typeof CACHE_TAGS) {
	return `user:${userId}-${CACHE_TAGS[tag]}` as const;
}

export function getIdTag(id: string, tag: keyof typeof CACHE_TAGS) {
	return `id:${id}-${CACHE_TAGS[tag]}` as const;
}

export function clearFullCache() {
	revalidateTag('*');
}

// cb: callback
export function dbCache<T extends (...args: any[]) => Promise<any>>(
	cb: Parameters<typeof unstable_cache<T>>[0],
	{ tags }: { tags: ValidTags[] }
) {
	return cache(unstable_cache<T>(cb, undefined, { tags: [...tags, '*'] }));
}

export function revalidateDbCache({
	tag,
	userId,
	id,
}: {
	tag: keyof typeof CACHE_TAGS;
	userId?: string;
	id?: string;
}) {
	revalidateTag(getGlobalTag(tag));

	if (userId != null) {
		revalidateTag(getUserTag(userId, tag));
	}

	if (id != null) {
		revalidateTag(getIdTag(id, tag));
	}
}
