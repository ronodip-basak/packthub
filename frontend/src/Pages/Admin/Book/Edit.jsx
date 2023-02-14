import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthorOrGenreSelect from "../../../Component/AuthorOrGenreSelect";
import FormikInput from "../../../Component/FormikInput";
import FullScreenLoading from "../../../Component/FullScreenLoading";
import Api from "../../../lib/Api";
import convertToFormData from "../../../lib/ConvertToFormData";
import handleFormikBackendValidation from "../../../lib/handleFormikBackendValidation";
import { editBookVaildation } from "../../../validation/BookValidation";

export default function Edit() {

    const [loading, setLoading] = useState(false)
    const [book, setBook] = useState(null); 
    const {id} = useParams()

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
        validationSchema: editBookVaildation,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const data = values;
                if(!(data.image instanceof FileList)){
                    delete data.image;
                }
                const res = await Api.put(`/admin/book/${id}`, convertToFormData(data, ['authors', 'genres']), { "Content-Type": "multipart/form-data" });
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

    useEffect(() => {
        Api.get(`/admin/book/${id}`)
            .then(res => {
                const myBook = {};
                
                myBook.title = res.data.title;
                myBook.description = res.data.description;
                myBook.image = res.data.image;
                myBook.isbn = res.data.isbn;
                myBook.published_on = res.data.published_on;
                myBook.authors = res.data.authors.map(author => {
                    return {
                        label: author.title,
                        value: author.id
                    }
                })
                myBook.genres = res.data.genres.map(genre => {
                    return {
                        label: genre.title,
                        value: genre.id
                    }
                })
                formik.setValues(myBook);
                setBook(myBook)

            })
            .catch(e => {
                alert(e.message ?? "Something went wrong")
            })
    }, [])


    if(!book){
        return <FullScreenLoading />
    }


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

                    <button className="btn btn-primary">Save</button>

                </div>
            </form>



        </div>
    )
}