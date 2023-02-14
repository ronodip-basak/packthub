import { useEffect, useMemo, useState } from 'react'

import Api from '../../../lib/Api'
import BootstrapTable from '../../../Component/BootstrapTable'
import { useFormik } from 'formik'
import convertToFormData from '../../../lib/ConvertToFormData'
import AuthorOrGenreSelect from '../../../Component/AuthorOrGenreSelect'
import { Link } from 'react-router-dom'



export default function Index() {

    const [books, setBooks] = useState({
        data: [],
        meta: {
            current_page: 1
        },
        loading: true
    })

    const formik = useFormik({
        initialValues: {
            search: '',
            authors: [],
            genres: [],
            page: 1,
            per_page: 10
        },
        onSubmit: (values) => fetchData(setBooks, values)
    })





    useEffect(() => {
        console.log(formik.values);
        fetchData(setBooks, formik.values)
    }, [formik.values])

    const handlePaginationChange = (newPage) => {
        const myBooks = { ...books };
        myBooks.meta.current_page = newPage;
        setBooks(myBooks)
        formik.setFieldValue('page', newPage)
        formik.submitForm();
    }

    const deleteBook = (id) => {
        // console.log(books);
        if (confirm("Are you sure you want to delete this book?")) {
            Api.delete(`/admin/book/${id}`)
                .then(res => {
                    
                    fetchData(setBooks,formik.values)
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
                header: 'Author',
                accessorKey: 'authors',
                cell: ({ row, accessorKey }) => {
                    const authors = row[accessorKey];
                    if (!authors) {
                        return <></>
                    }
                    return (
                        <div>
                            {authors.map(author => <span>{author.title}</span>)}
                        </div>
                    )
                }
            },
            {
                header: 'Genres',
                accessorKey: 'genres',
                cell: ({ row, accessorKey }) => {
                    const genres = row[accessorKey];
                    if (!genres) {
                        return <></>
                    }
                    return (
                        <div>
                            {genres.map(genre => <span>{genre.title}</span>)}
                        </div>
                    )
                }
            },
            {
                header: 'Action',
                accessorKey: 'id',
                cell: ({ row, accessorKey }) => {

                    return (
                        <div>
                            <a href={`/admin/books/${row[accessorKey]}/edit`} target="_blank" className='btn btn-secondary'>Edit</a>
                            <button className='btn btn-danger' onClick={() => {
                                deleteBook(row[accessorKey])
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.search}
                        />
                    </div>
                </div>
                <div className='col-md-3'>
                    <label>Author</label>
                    <AuthorOrGenreSelect
                        type='author'
                        values={formik.values.authors}
                        setValues={(val) => {
                            formik.setFieldValue('authors', val)
                        }}
                    />
                </div>
                <div className='col-md-3'>
                    <label>Genre</label>
                    <AuthorOrGenreSelect
                        type='genre'
                        values={formik.values.genres}
                        setValues={(val) => {
                            formik.setFieldValue('genres', val)
                        }}

                    />
                </div>
                <div className='col-md-3 pt-4'>
                    <Link to={'/admin/books/create'} className="btn btn-primary">
                        Add New
                    </Link>
                </div>
            </div>
            <BootstrapTable
                columns={columns}
                tableData={books.data}
                pagination={books.meta}
                handlePaginationChange={handlePaginationChange}
            />
        </div>

    )
}

const fetchData = (setBooks, values) => {
    const myValues = {
        page: values.page,
        search: values.search,
        genres: values.genres.map(genre => genre.value),
        authors: values.authors.map(author => author.value),
    };
    Api.get(`/admin/book`, myValues)
        .then(res => {
            setBooks({
                data: res.data,
                meta: res.meta,
                loading: false
            })
        })
        .catch(e => {
            alert(e.message ?? "Something went wrong")
        })
}