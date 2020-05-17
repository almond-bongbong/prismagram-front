import { useRef, useEffect } from 'react';

function useUpdateEffect(effect, deps) {
  const isDidMount = useRef(false);

  useEffect(() => {
    if (isDidMount.current) {
      effect();
    }
    isDidMount.current = true;
  }, deps);
}

export default useUpdateEffect;
