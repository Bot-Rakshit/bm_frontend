import { useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';

interface UseRouteChangeProps {
  callback: () => void;
}

const useRouteChange = ({ callback }: UseRouteChangeProps): void => {
  const { pathname } = useLocation();
  const isInitialMount = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (location.pathname !== prevPathname.current) {
      callback();
    }
    prevPathname.current = location.pathname;
  }, [pathname]);
};

export default useRouteChange;
