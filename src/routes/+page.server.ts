import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user && locals.session) {
		redirect(307, '/app');
	}

	redirect(307, '/login');
};
