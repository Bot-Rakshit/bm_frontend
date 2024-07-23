import { useEffect, useState } from 'react';

import useRouteChange from '@/hooks/useRouteChange';
import { cn, setConsentCookie } from '@/lib/utils';
import Cookies from 'js-cookie';
import { CookieIcon } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';

import { Button } from './ui/button';

interface CookieConsentProps {
  isVisible: boolean;
  onAccept: () => void;
}

const CookieConsent = ({ isVisible, onAccept }: CookieConsentProps) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700',
        !isVisible ?
          'transition-[opacity,transform] translate-y-8 opacity-0'
        : 'transition-[opacity,transform] translate-y-0 opacity-100',
        !isVisible && 'hidden',
      )}
    >
      <div className="dark:bg-gray-900 rounded-md m-3 border border-border shadow-lg dark:shadow-none">
        <div className="grid gap-2">
          <div className="border-b border-border dark:border-background/20 h-14 flex items-center justify-between p-4">
            <h1 className="text-lg font-medium">We use cookies</h1>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-4">
            <p className="text-sm font-normal text-start">
              We use cookies to ensure you get the best experience on our
              website.
              <br />
              <br />
              <span className="text-xs">
                By clicking "
                <span className="font-medium opacity-80">Accept</span>", you
                agree to our use of cookies.
              </span>
              <br />
            </p>
          </div>
          <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-gray-900">
            <Button
              onClick={onAccept}
              className="rounded-full px-6 py-3 text-base sm:text-lg font-medium bg-neon-green text-black hover:bg-opacity-80 transition-all duration-300 w-full"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CookieConsentWrapper = () => {
  const [consentStatus, setConsentStatus] = useState(true);
  const location = useLocation();

  useRouteChange({ callback: setConsentCookie });

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    setConsentStatus(true);
  };

  const checkCookieConsent = () => {
    const consent = Cookies.get('cookie-consent');
    setConsentStatus(consent === 'accepted');
  };

  useEffect(() => {
    checkCookieConsent();
  }, [location.pathname]);

  return (
    <>
      <Outlet />
      <CookieConsent isVisible={!consentStatus} onAccept={acceptCookies} />
    </>
  );
};

export default CookieConsentWrapper;
