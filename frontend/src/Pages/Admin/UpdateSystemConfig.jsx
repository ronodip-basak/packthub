import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AuthorOrGenreSelect from "../../Component/AuthorOrGenreSelect";
import FullScreenLoading from "../../Component/FullScreenLoading";
import Api from "../../lib/Api";
import convertToFormData from "../../lib/ConvertToFormData";
import handleFormikBackendValidation from "../../lib/handleFormikBackendValidation";

export default function UpdateSystemConfig() {

    const [bookOptions, setBookOptions] = useState([]);

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            featured_genre: [],
            featured_books: []
        },
        onSubmit: (values, actions) => {
            Api.post('/admin/system_config/update', convertToFormData(values, [
                'featured_genre',
                'featured_books'
            ]), {
                "Content-Type": "multipart/form-data"
            })
            .then(res => {
                if(!res.success){
                    handleFormikBackendValidation(res, actions);
                }
                else{
                    alert("Updated Successfully")
                    navigate('/admin')
                }
            })
            .catch(e => {
                alert(e.message ?? "Something went wrong")
            })
        }
    });

    useEffect(() => {
        Api.get('/admin/book', {
            disable_pagination: true
        }).then(res => {
            setBookOptions(res.data.map(book => {
                return {
                    label: book.title,
                    value: book.id
                }
            }))
        })

        Api.get('/admin/system_config').then(res => {
            const featured_genre = res.featured_genre.map(genre => {
                return {
                    value: genre.id,
                    label: genre.title
                }
            })

            const featured_books = res.featured_books.map(book => {
                return {
                    value: book.id,
                    label: book.title
                }
            })
            formik.setFieldValue('featured_genre', featured_genre);
            formik.setFieldValue('featured_books', featured_books);
            setLoading(false)
        })
    }, [])

    if(loading){
        return <FullScreenLoading />
    }

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Featured Books</label>
                    <Select
                        isSearchable={true}
                        isMulti={true}
                        options={bookOptions}
                        value={formik.values.featured_books}
                        onChange={(value) => {
                            formik.setFieldValue('featured_books', value)
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Featured Genres</label>
                    <AuthorOrGenreSelect
                        type='genre'
                        values={formik.values.featured_genre}
                        setValues={(value) => {
                            formik.setFieldValue('featured_genre', value)
                        }}
                    />
                </div>

                <button className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}