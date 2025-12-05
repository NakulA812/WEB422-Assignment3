import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isAuthenticated, readToken } from '../lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { getFavourites } from '../lib/userData';

const PUBLIC_PATHS = ['/login', '/register', '/about', '/'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  useEffect(() => {
    async function updateAtom() {
      if (!isAuthenticated()) {
        setFavouritesList([]); 
        return;
      }
      const favs = await getFavourites();
      setFavouritesList(favs);
    }

    updateAtom();

    if (PUBLIC_PATHS.includes(router.pathname)) return;

    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router.pathname]);

  return children;
}
