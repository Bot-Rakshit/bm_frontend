import { clsx, type ClassValue } from 'clsx';
import Cookies from 'js-cookie';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setConsentCookie() {
  const consent = Cookies.get('cookie-consent');
  if (!consent) Cookies.set('cookie-consent', 'accepted', { expires: 365 });
}
