import {useEffect} from 'react';

export default function(value) {
  useEffect(() => {
    console.log(value);
  }, [value]);
}
