import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Api from '../lib/Api';

export default function AuthorOrGenreSelect({type = 'author', values, setValues}){
    const [loading, setLoading] = useState(false)

    const [options, setOptions] = useState([]);



    useEffect(() => {
        Api.get(`${type === 'author' ? '/admin/author' : '/admin/genre'}`, {
            disable_pagination: true
        }).then(res => {
            setOptions(res.data.map(val => {
                return {
                    label: val.title,
                    value: val.id
                }
            }))
        })
    }, [])

    const handleOptionCreate = (value) => {
        setLoading(true)
        Api.post(`${type === 'author' ? '/admin/author' : '/admin/genre'}`, {
            title: value
        })
            .then(res => {
                if(res.success){
                    console.log();
                    const newOption = {
                        label: res[type == 'author' ? 'author' : 'genre'].title,
                        value: res[type == 'author' ? 'author' : 'genre'].id
                    }
                    
                    setOptions((prev) => [...prev, newOption]);
                    
                    setValues([...values, newOption])
                }
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }

    const handleChange = (newValue) => {
        
        setValues(newValue)
    }
    
    return (
        <CreatableSelect 
            
            isLoading={loading}
            onCreateOption={handleOptionCreate}
            isClearable={true}
            isMulti={true}
            options={options}
            value={values}
            onChange={handleChange}
        />
    )
}