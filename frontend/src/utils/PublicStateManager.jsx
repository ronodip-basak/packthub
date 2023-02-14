import { useEffect } from "react";
import { useRecoilState } from "recoil";
import adminAtom from "../atoms/adminAtom";
import publicConfigAtom from "../atoms/publicConfigAtom";
import Api from "../lib/Api";

export default function PublicStateManager() {
    const [admin, setAdmin] = useRecoilState(adminAtom);

    const [props, setProps] = useRecoilState(publicConfigAtom)

    useEffect(() => {
        Api.get('/../sanctum/csrf-cookie').then(() => {
            
            Api.get('/index')
                .then(res => {
                    setProps(res)
                })
        })



    }, [])

    return (
        <></>
    )
}