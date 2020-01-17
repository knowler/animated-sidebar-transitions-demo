import {useEffect, useRef} from 'react';

export function useLogChange(value) {
  useEffect(() => {
    console.log(value);
  }, [value]);
}

export function usePrevious(value) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
