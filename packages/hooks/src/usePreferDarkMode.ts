import { useEffect, useState } from 'react';

const usePreferDarkMode = () => {
  // Reasonable we can assume that by default a user will be using light mode as most operating
  // systems make that a default

  const [usingDarkMode, setUsingDarkMode] = useState(false);
  useEffect(() => {
    // We check if window is defined first so that we can ensure SSR applications don't fall over
    if (typeof window !== 'undefined') {
      setUsingDarkMode(window.matchMedia('(prefers-color-scheme: dark)')?.matches ?? false);
    }
  }, []);

  return usingDarkMode;
};

export default usePreferDarkMode;
