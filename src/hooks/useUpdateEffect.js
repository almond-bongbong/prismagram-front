/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react';

function useUpdateEffect(effect, deps) {
  const isDidMount = useRef(false);
  const effectRef = useRef(effect);

  useEffect(() => {
    if (isDidMount.current) {
      effectRef.current();
    }
    isDidMount.current = true;
  }, deps);
}

export default useUpdateEffect;
