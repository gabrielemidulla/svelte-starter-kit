import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/sign-in');
	}
	return { user: event.locals.user };
};

export const actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		event.cookies.delete(auth.sessionCookieName, { path: '/' });

		return redirect(302, '/sign-in');
	}
};
