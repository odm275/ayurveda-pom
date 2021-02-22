import { useEffect, useRef } from 'react';

export function useEffectWithoutOnMount(callback, dependencies) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true;
    }
  }, [dependencies]);
}
