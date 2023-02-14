import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FormikInput from "../../../Component/FormikInput"
import FullScreenLoading from "../../../Component/FullScreenLoading"
import Loading from "../../../Component/Loading"
import Api from "../../../lib/Api"
import convertToFormData from "../../../lib/ConvertToFormData"
import handleFormikBackendValidation from "../../../lib/handleFormikBackendValidation"

export default function Edit() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {id} = useParams();

    const [genre, setGenre] = useState(null)
    const formik = useFormik({
        initialValues: {
            title: '',
            image: ''
        },
        onSubmit: (values, actions) => {
            setLoading(true)
            const myData = {...values}
            if(!(myData.image instanceof FileList)){
                delete myData.image;
            }
            Api.put(`/admin/genre/${id}`, convertToFormData(myData), {
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

    useEffect(() => {
        Api.get(`/admin/genre/${id}`)
            .then(res => {
                const myGenre = {
                    title: res.title,
                    image: res.image
                };
                formik.setValues(myGenre)
                setGenre(myGenre)
            })
    }, [])


    if(!genre){
        return <FullScreenLoading />
    }

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