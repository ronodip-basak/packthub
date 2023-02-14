import { atom } from "recoil";

const adminPageNameAtom = atom({
    key: 'adminPageName', // unique ID (with respect to other atoms/selectors)
    default: 'Dashboard', // default value (aka initial value)
});

export default adminPageNameAtom;