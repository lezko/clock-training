import {MutableRefObject, useRef, useState} from 'react';

export function useStateAndRef<T>(initial: T): [T, (v: T) => void, MutableRefObject<T>] {
    const [value, setValue] = useState(initial);
    const ref = useRef(value);

    function setValueWithRef(v: T) {
        setValue(v);
        ref.current = v;
    }

    return [value, setValueWithRef, ref];
}