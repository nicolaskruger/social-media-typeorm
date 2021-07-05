import { useState } from "react";

export const useLocalStorage = <T>(initVal: T, name: string): [T, (n: T) => void] => {
    const getLocaStorage = (name: string) => {
        return JSON.parse(localStorage.getItem(name) as string);
    }
    const setLocalStorege = (val: T, name: string) => {
        localStorage.setItem(name, JSON.stringify(val));
    }

    const init: T = getLocaStorage(name) || initVal;

    const [val, setVal] = useState(init);

    const set = (newVal: T) => {
        setLocalStorege(newVal, name)
        setVal(val);
    }

    return [val, set];
}