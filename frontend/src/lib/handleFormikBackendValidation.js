export default function handleFormikBackendValidation(res, actions){
    const errors = {};
    for (const x in res.errors) {
        if (Object.hasOwnProperty.call(res.errors, x)) {
            const element = res.errors[x];
            errors[x] = element[0]            
            actions.setFieldError(x, element[0])
        }
    }    
}