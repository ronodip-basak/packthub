import { atom } from "recoil";

const publicConfigAtom = atom({
    key: 'publicConfigAtom', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

export default publicConfigAtom;