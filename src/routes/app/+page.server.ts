import type { PageServerLoad } from './$types';
import { db } from '$lib/drizzle/db';
import { eq, desc } from 'drizzle-orm';
import { towel } from '$lib/drizzle/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { calculateDateAgo } from '$lib/utils';
import dayjs from 'dayjs';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || !locals.user) {
		redirect(307, '/login');
	}

	const towelsDb: TowelDb[] = await db
		.select()
		.from(towel)
		.where(eq(towel.userId, locals.user.id))
		.orderBy(desc(towel.createdAt))
		.limit(5);

	const towels = towelsDb.map(
		(item): TowelProps => ({
			...item,
			createdAtFormatted: dayjs(item.createdAt).format('DD MMM'),
			createdAtSemantic: calculateDateAgo(new Date(item.createdAt))
		})
	);

	let towelDirty: number | undefined;

	if (towelsDb.length > 0) {
		/**
		 * No need to correct timezone, because the difference is correct.
		 * If I do want it, I can just do
		 * 	 		const lastWashDate = dayjs(towelsDb[0].createdAt).tz('Asia/Singapore');
		 * 			const today = dayjs().tz('Asia/Singapore');
		 */
		const lastWashDate = dayjs(towelsDb[0].createdAt);
		const today = dayjs();
		/**
		 * https://stackoverflow.com/questions/36560806/the-left-hand-side-of-an-arithmetic-operation-must-be-of-type-any-number-or
		 */
		towelDirty = today.diff(lastWashDate, 'hours', true);
	}

	return { towels, towelDirty };
};

export const actions = {
	refresh: async ({ locals }) => {
		if (!locals.user) {
			return fail(403);
		}
		try {
			await db.insert(towel).values({ userId: locals.user.id });
		} catch (err) {
			console.log(err);
		}
	}
} satisfies Actions;
