import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormikInput from "../../../Component/FormikInput"
import Loading from "../../../Component/Loading"
import Api from "../../../lib/Api"
import convertToFormData from "../../../lib/ConvertToFormData"
import handleFormikBackendValidation from "../../../lib/handleFormikBackendValidation"

export default function Create() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: '',
            image: ''
        },
        onSubmit: (values, actions) => {
            setLoading(true)
            Api.post(`/admin/genre`, convertToFormData(values), {
                "Content-Type": "multipart/form-data"
            }).then(res => {
                if (res.success) {
                    navigate(`/admin/genres`)
                }
                else {
                    handleFormikBackendValidation(res, actions);
                }
                setLoading(false)
            })
                .catch(res => {
                    alert(res.message ?? "Something Went Wrong");
                    setLoading(false)
                })
        }
    })
    return (
        <div className="container my-4">
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <FormikInput
                            label={'Title'}
                            placeholder={'Title'}
                            name={'title'}
                            formik={formik}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormikInput
                            label={'Image'}
                            placeholder={'Image'}
                            name={'image'}
                            formik={formik}
                            type={'file'}
                        />
                    </div>
                </div>
                {loading &&
                    <Loading />
                }
                {!loading &&
                    <button className="btn btn-primary">Save</button>
                }
            </form>


        </div>
    )
}