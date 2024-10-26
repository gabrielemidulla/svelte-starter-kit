import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import { generateRandomString } from "@oslojs/crypto/random";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const flyAndScale = (
	node,
	params = { y: -8, x: 0, start: 0.95, duration: 150 }
) => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (valueA, scaleA, scaleB) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style) => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

/**
 * Validates an email
 * @param {string} email 
 * @returns {boolean}
 */
export function validateEmail(email) {
	console.log(email);
	return typeof email === 'string' && email.length >= 3 && email.length <= 255 && /^[^@]+@[^@]+$/.test(email);
}

/**
 * Validates a password
 * @param {string} password 
 * @returns {boolean}
 */
export function validatePassword(password) {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

/**
 * Generates a unique user id
 * @param {number} length 
 * @returns {string}
 */
export function generateUserId(length = 21) {
	return generateRandomString({ read: (bytes) => crypto.getRandomValues(bytes) }, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_', length);
}

/**
 * Validates a username
 * @param {string} username 
 * @returns {boolean}
 */
export function validateUsername(username) {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}
