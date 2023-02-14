import { useState } from "react"

export default function BootstrapTable({
    columns,
    tableData,
    pagination = null,
    handlePaginationChange = () => { }
}) {

    const [current_page, setCurrentPage] = useState(null);

    return (
        <div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {columns.map((data, index) => <th key={index} scope="col">{data.header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => {

                        return (
                            <tr key={index}>
                                {columns.map((d, idx) => {
                                    if (d.cell) {
                                        // console.log(item);
                                        
                                        return (<td key={idx}><d.cell row={item} accessorKey={d.accessorKey} /></td>)
                                    }
                                    return <td key={idx}>{item[d.accessorKey]}</td>
                                })}
                            </tr>
                        )

                    })}
                </tbody>

            </table>
            {pagination &&
                <div className="d-flex justify-content-end">
                    
                    <div className="form-group">
                        <input className="form-control" value={pagination.current_page} style={{ maxWidth: '20rem' }} type={'number'}
                            onChange={e => {
                                let newPage = e.target.value;
                                if(e.target.value > pagination.last_page){
                                    newPage = pagination.last_page;
                                }
                                handlePaginationChange(newPage)
                            }}
                        />
                        <small>Showing {pagination.from} - {pagination.to} out of {pagination.total} items</small>
                    </div>
                </div>
            }
        </div>
    )
}