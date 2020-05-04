import { MutableRefObject, useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number): void => {
  const savedCallback = useRef<Function>(Function);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const handler = (
      ...args: unknown[]
    ): MutableRefObject<Function | undefined> => savedCallback.current(...args);
    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
