import { useEffect, useMemo, useState } from 'react'

import Api from '../../../lib/Api'
import BootstrapTable from '../../../Component/BootstrapTable'
import { useFormik } from 'formik'
import convertToFormData from '../../../lib/ConvertToFormData'
import AuthorOrGenreSelect from '../../../Component/AuthorOrGenreSelect'
import { Link } from 'react-router-dom'



export default function Index() {

    const [genres, setGenres] = useState({
        data: [],
        meta: {
            current_page: 1
        },
        loading: true
    })


    const formik = useFormik({
        initialValues: {
            search: '',
            page: 1
        },
        onSubmit: (values) => fetchData(setGenres, values)
    })





    useEffect(() => {
        fetchData(setGenres, formik.values)
    }, [formik.values])

    const handlePaginationChange = (newPage) => {
        const myGenre = { ...genres };
        myGenre.meta.current_page = newPage;
        setGenres(myGenre)
        formik.setFieldValue('page', newPage)
        formik.submitForm();
    }

    const deleteGenre = (id) => {
        if (confirm("Are you sure you want to delete this Genre?")) {
            Api.delete(`/admin/genre/${id}`)
                .then(res => {
                    fetchData(setGenres,formik.values)
                })
                .catch(e => {
                    alert(e.message ?? "Something went wrong")
                })
        }


    }

    const columns = useMemo(
        () => [
            {
                header: 'Title',
                accessorKey: 'title'
            },
            {
                header: 'Image',
                accessorKey: 'image',
                cell: ({ row, accessorKey }) => {
                    return <img style={{ maxWidth: '10rem', maxHeight: '10rem' }} src={row[accessorKey]} />
                }
            },
            {
                header: 'Action',
                accessorKey: 'id',
                cell: ({ row, accessorKey }) => {

                    return (
                        <div>
                            <a href={`/admin/genres/${row[accessorKey]}/edit`} target="_blank" className='btn btn-secondary'>Edit</a>
                            <button className='btn btn-danger' onClick={() => {
                                deleteGenre(row[accessorKey])
                            }}>Delete</button>
                        </div>
                    )
                }
            },

        ],
        []
    )





    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Search</label>
                        <input name='search' className='form-control'
                            onChange={(e) => {
                                formik.setFieldValue('page', 1)
                                formik.handleChange(e)
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.search}
                        />
                    </div>
                </div>
                
                <div className='col-md-3 pt-4'>
                    <Link to={'/admin/genres/create'} className="btn btn-primary">
                        Add New
                    </Link>
                </div>
            </div>
            <BootstrapTable
                columns={columns}
                tableData={genres.data}
                pagination={genres.meta}
                handlePaginationChange={handlePaginationChange}
            />
        </div>

    )
}

const fetchData = (setGenres, values) => {
    const myValues = {
        page: values.page,
        search: values.search
    };
    Api.get(`/admin/genre`, myValues)
        .then(res => {
            setGenres({
                data: res.data,
                meta: res.meta,
                loading: false
            })
        })
        .catch(e => {
            alert(e.message ?? "Something went wrong")
        })
}