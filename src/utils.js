import {useEffect} from 'react';

export function useLogChange(value) {
  useEffect(() => {
    console.log(value);
  }, [value]);
}
