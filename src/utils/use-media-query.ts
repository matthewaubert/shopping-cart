import { useState, useEffect } from 'react';

/**
 * custom React hook: check if window matches given media query
 * @param {string} mediaQuery - e.g. '(max-width: 875px)'
 * @returns {boolean} boolean
 */
export default function useMediaQuery(mediaQuery: string): boolean {
  const [matchesMediaQuery, setMatchesMediaQuery] = useState(
    window.matchMedia(mediaQuery).matches,
  );

  // on window change: check if matches media query && set state to bool value
  useEffect(() => {
    const handleMatchMediaChange = (e: MediaQueryListEvent) =>
      setMatchesMediaQuery(e.matches);

    window
      .matchMedia(mediaQuery)
      .addEventListener('change', handleMatchMediaChange);

    return () => {
      window
        .matchMedia(mediaQuery)
        .removeEventListener('change', handleMatchMediaChange);
    };
  }, [mediaQuery]);

  return matchesMediaQuery;
}
