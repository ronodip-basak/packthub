import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../../Component/Loading"
import Api from "../../lib/Api"

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
        loading: true,
    })

    useEffect(() => {
        Api.get('/admin/dashboard')
            .then(res => {
                if (res.success) {
                    setDashboardData({ isLoading: false, data: res.data });
                }
                else {
                    alert(res.message ?? "Something went wrong");
                }
            })
            .catch(error => {
                alert(error.message ?? "Something went wrong");
            })
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-info">
                        <div className="inner">
                            {dashboardData.loading &&
                                <Loading />
                            }

                            {!dashboardData.loading &&
                                <>
                                    <h3>{dashboardData.data.book_count}</h3>

                                    <p>Total Books</p>
                                </>
                            }


                        </div>
                        <div className="icon">
                            <i className="ion ion-bag"></i>
                        </div>
                        <Link to={'/admin/books'} className="small-box-footer">More info </Link>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            {dashboardData.loading &&
                                <Loading />
                            }

                            {!dashboardData.loading &&
                                <>
                                    <h3>{dashboardData.data.genre_count}</h3>

                                    <p>Different Genres</p>
                                </>
                            }
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag"></i>
                        </div>
                        <Link to={'/admin/genres'} className="small-box-footer">More info </Link>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-success">
                        <div className="inner">
                            {dashboardData.loading &&
                                <Loading />
                            }

                            {!dashboardData.loading &&
                                <>
                                    <h3>{dashboardData.data.author_count}</h3>

                                    <p>Different Authors</p>
                                </>
                            }

                        </div>
                        <div className="icon">
                            <i className="ion ion-bag"></i>
                        </div>
                        <Link to={'/admin/authors'} className="small-box-footer">More info </Link>

                    </div>
                </div>
            </div>
        </>
    )
}