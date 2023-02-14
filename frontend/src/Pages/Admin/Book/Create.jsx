import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorOrGenreSelect from "../../../Component/AuthorOrGenreSelect";
import FormikInput from "../../../Component/FormikInput";
import Loading from "../../../Component/Loading";
import Api from "../../../lib/Api";
import convertToFormData from "../../../lib/ConvertToFormData";
import handleFormikBackendValidation from "../../../lib/handleFormikBackendValidation";
import { createBookValidation } from "../../../validation/BookValidation";

export default function Create() {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: '',
            isbn: '',
            image: '',
            published_on: '',
            authors: [],
            genres: []

        },
        validationSchema: createBookValidation,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const res = await Api.post(`/admin/book`, convertToFormData(values, ['authors', 'genres']), { "Content-Type": "multipart/form-data" });
                if (res.success) {
                    navigate('/admin/books')
                }
                else { 
                    handleFormikBackendValidation(res)
                }
                setLoading(false)
            } catch (error) {
                alert(error.message ?? "Something went worng");
                setLoading(false)
            }
        }

    })



    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <FormikInput
                            name={'title'}
                            label={'Title'}
                            type={'text'}
                            formik={formik}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormikInput
                            name={'isbn'}
                            label={'Isbn'}
                            type={'number'}
                            formik={formik}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormikInput
                            name={'image'}
                            label={'Image'}
                            type={'file'}
                            formik={formik}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormikInput
                            name={'published_on'}
                            label={'Published At'}
                            type={'date'}
                            formik={formik}
                        />

                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Authors</label>
                            <AuthorOrGenreSelect
                                type={'author'}
                                values={formik.values.authors}
                                setValues={(values) => { formik.setFieldValue('authors', values) }}
                            />
                            {formik.touched.authors && formik.errors.authors &&
                                <div className='alert alert-warning'>
                                    {formik.errors.authors}
                                </div>
                            }
                        </div>

                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Genres</label>
                            <AuthorOrGenreSelect
                                type={'genre'}
                                values={formik.values.genres}
                                setValues={(values) => { formik.setFieldValue('genres', values) }}
                            />
                            {formik.touched.genres && formik.errors.genres &&
                                <div className='alert alert-warning'>
                                    {formik.errors.genres}
                                </div>
                            }
                        </div>

                    </div>

                    <div className="col-md-12">
                        <FormikInput
                            name={'description'}
                            label={'Description'}
                            formik={formik}
                            type={'textarea'}
                        />
                    </div>

                    {loading &&
                        <Loading />
                    }
                    {!loading &&
                        <button className="btn btn-primary">Save</button>
                    }

                </div>
            </form>



        </div>
    )
}