import { useFormik } from 'formik'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import adminAtom from '../../atoms/adminAtom';
import FormikInput from '../../Component/FormikInput';
import Loading from '../../Component/Loading';
import Api from '../../lib/Api';
import handleFormikBackendValidation from '../../lib/handleFormikBackendValidation';
import loginValidation from '../../validation/LoginValidation';

export default function Login() {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [adminState, setAdminState] = useRecoilState(adminAtom);

    useEffect(() => {
        if(adminState.isLoggedIn){
            navigate('/admin')
        }
    }, [adminState])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidation,
        onSubmit: async (values, actions) => {
            try {
                setLoading(true)
                const res = await Api.post('/login', values)
                if (!res.success) {
                    setLoading(false);
                    handleFormikBackendValidation(res, actions)
                }
                else{
                    setAdminState({
                        isLoading: false,
                        isLoggedIn: true,
                        admin: res.admin
                    })
                }
            } catch (error) {
                alert(error.message ?? "Something Went wrong");
                setLoading(false);
            }
        }
    });

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="">{import.meta.env.VITE_APP_NAME}</a>
                </div>

                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form action="" method="post" onSubmit={formik.handleSubmit}>


                            <FormikInput
                                name={"email"}
                                type={'email'}
                                formik={formik}
                                label={'Email'}
                                placeholder={'me@example.com'}
                            />

                            <FormikInput
                                name={"password"}
                                type={'password'}
                                formik={formik}
                                label={'Password'}
                                placeholder={'Password'}
                            />

                            <div className="row">
                                <div className="col-8">

                                </div>

                                <div className="col-4">
                                    {loading &&
                                        <Loading />
                                    }
                                    {!loading &&
                                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                    }
                                </div>

                            </div>
                        </form>


                    </div>

                </div>
            </div>


        </div>
    )
}