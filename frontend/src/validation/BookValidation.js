import * as Yup from 'yup'

const createSchema = {
    title: Yup.string().required().min(2).max(255),
    isbn: Yup.number().required(),
    description: Yup.string().required().min(10).max(1000),
    image: Yup.mixed().required(),
    published_on: Yup.date().required(),
    authors: Yup.array().min(1),
    genres: Yup.array().min(1)
}

export const createBookValidation = Yup.object(createSchema)


export const editBookVaildation = Yup.object({...createSchema, ...{
    image: Yup.mixed(),
} })
