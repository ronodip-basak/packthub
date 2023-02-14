export default function convertToFormData(data, convertToIds = []) {
    const formData = new FormData();

    console.log(data);
    for (const x in data) {
        if (Object.hasOwnProperty.call(data, x)) {
            if (data[x] instanceof FileList) {
                for (const z in data[x]) {
                    if (Object.hasOwnProperty.call(data[x], z)) {
                        const element = data[x][z];
                        formData.append(x, element)
                    }
                }
            }
            else {
                if (convertToIds.indexOf(x) != -1) {
                    console.log(data[x]);
                    data[x].forEach(v => {
                        formData.append(`${x}[]`, v.value);
                    });
                }
                else {
                    formData.append(x, data[x]);
                }
            }


        }
    }

    console.log(formData);

    return formData;
}