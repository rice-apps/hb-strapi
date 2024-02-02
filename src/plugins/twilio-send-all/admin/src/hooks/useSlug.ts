import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useSlug = () => {
  const { pathname } = useLocation();

  const slug = useMemo(() => {
    const matches = pathname.match(/content-manager\/(collectionType|singleType)\/([a-zA-Z0-9\-:_.]*)/);
    return matches?.[2];
  }, [pathname]);

  return slug;
};