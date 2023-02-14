import { useEffect } from "react";
import { useRecoilState } from "recoil";
import adminAtom from "../atoms/adminAtom";
import publicConfigAtom from "../atoms/publicConfigAtom";
import Api from "../lib/Api";

export default function AdminStateManager() {
    const [admin, setAdmin] = useRecoilState(adminAtom);

    const [props, setProps] = useRecoilState(publicConfigAtom)

    useEffect(() => {
        Api.get('/../sanctum/csrf-cookie').then(() => {
            async function checkAdmin() {
                try {
                    const res = await Api.get('/admin/check');
                    if (res.success) {
                        setAdmin({
                            isLoggedIn: true,
                            isLoading: false,
                            admin: res.admin
                        })
                    }
                    else {
                        setAdmin({
                            isLoggedIn: false,
                            isLoading: false,
                            admin: null
                        })
                    }
                } catch (error) {
                    setAdmin({
                        isLoggedIn: false,
                        isLoading: false,
                        admin: null
                    })

                }
            }

            checkAdmin()
        })



    }, [])

    return (
        <></>
    )
}