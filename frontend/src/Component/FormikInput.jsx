export default function FormikInput({ formik, name, label, type = 'text', placeholder = '' }) {

    if (type === 'file') {
        return (
            <div className="form-group">
                <label>{label}</label>
                <input className="form-control" type={type} name={name}
                    placeholder={placeholder}
                    onChange={(e) => {
                        formik.setFieldValue(name, e.target.files)
                    }}
                    onBlur={formik.handleBlur}
                />

                <div>
                    {formik.values[name] instanceof FileList &&
                        <img className="p-4" style={{ maxWidth: '100%', maxHeight: '20rem' }} src={URL.createObjectURL(formik.values[name][0])} />
                    }
                    {!(formik.values[name] instanceof FileList) &&
                        <img className="p-4" style={{ maxWidth: '100%', maxHeight: '20rem' }} src={formik.values[name]} />
                    }
                </div>

                {formik.touched[name] && formik.errors[name] &&
                    <div className='alert alert-warning'>
                        {formik.errors[name]}
                    </div>
                }
            </div>
        )
    }

    if (type == 'textarea') {
        return (
            <div className="form-group">
                <label>{label}</label>
                <textarea className="form-control" name={name}
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  
                    value={formik.values[name]}                  
                ></textarea>

                {formik.touched[name] && formik.errors[name] &&
                    <div className='alert alert-warning'>
                        {formik.errors[name]}
                    </div>
                }
            </div>
        )
    }

    return (
        <div className="form-group">
            <label>{label}</label>
            <input className="form-control" type={type} name={name}
                placeholder={placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
            />

            {formik.touched[name] && formik.errors[name] &&
                <div className='alert alert-warning'>
                    {formik.errors[name]}
                </div>
            }
        </div>
    )
}