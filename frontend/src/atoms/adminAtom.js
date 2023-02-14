import { atom } from "recoil";

const adminAtom = atom({
    key: 'admin', // unique ID (with respect to other atoms/selectors)
    default: {
        isLoggedIn: false,
        isLoading: true,
        admin: null
    }, // default value (aka initial value)
});

export default adminAtom;