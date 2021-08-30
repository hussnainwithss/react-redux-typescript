/**
 * user.js is used to manage the user information which stores in cookies
 */
import Cookies, { CookieSetOptions } from 'universal-cookie';
import { COOKIE_USER_TOKEN_FIELD } from 'config';

export function setUserToken(payload: string, rememberMe?: boolean): void {
    const date = new Date();
    const cookies = new Cookies();
    const options: CookieSetOptions = { path: '/', sameSite: 'strict' };
    options.expires = rememberMe
        ? new Date(date.setFullYear(date.getFullYear() + 1))
        : undefined;
    cookies.set(COOKIE_USER_TOKEN_FIELD, payload, options);
}

export function getUserToken(): string {
    const cookies = new Cookies();
    return cookies.get(COOKIE_USER_TOKEN_FIELD);
}

export function deleteUserToken(): void {
    const cookies = new Cookies();
    cookies.remove(COOKIE_USER_TOKEN_FIELD);
}
