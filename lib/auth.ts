import { cookies } from 'next/headers';

const COOKIE_NAME = 'spyton_admin';

export function isAdminAuthenticated() {
  const cookie = cookies().get(COOKIE_NAME)?.value;
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(cookie && password && cookie === password);
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}
