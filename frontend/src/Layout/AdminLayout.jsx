import { Outlet, Link, useNavigate } from "react-router-dom";
import '../adminlte.css'
import { FaBars, FaChartLine, FaBook, FaKeyboard, FaDna, FaSlidersH } from 'react-icons/fa';
import { useState } from "react";
import { useRecoilState } from "recoil";
import adminAtom from "../atoms/adminAtom";
import { useEffect } from "react";
import Loading from "../Component/Loading";
import adminPageNameAtom from "../atoms/adminPageNameAtom";
import FullScreenLoading from "../Component/FullScreenLoading";
import Api from "../lib/Api";

export default function AdminLayout() {

    const [showSideBar, setShowSidebar] = useState(false)
    const [admin, setAdmin] = useRecoilState(adminAtom);

    const [pageName, setPageName] = useRecoilState(adminPageNameAtom);

    const navigate = useNavigate();
    useEffect(() => {
        if (!admin.isLoading && !admin.isLoggedIn) {
            navigate('/admin/login')
        }
    }, [admin]);

    const logout = () => {
        Api.post('/logout')
            .then(res => {
                setAdmin({
                    isLoggedIn: false,
                    isLoading: true,
                    admin: null
                })
                navigate('/admin/login')
            })
    }
    if (!admin.isLoggedIn) {
        return <FullScreenLoading />
    }
    return (
        <div className={showSideBar ? 'sidebar-mini' : 'sidebar-mini sidebar-collapse'}>
            <div className="wrapper">

                <div className="preloader flex-column justify-content-center align-items-center" style={{ height: '0px' }}>
                    <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" style={{ display: 'none' }}
                        width="60" height="60" />
                </div>

                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button" onClick={() => {
                                setShowSidebar(!showSideBar)
                            }}>
                                <FaBars />
                            </a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <Link to={'/index'} className="nav-link">Home</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item">
                            <a href="#" className="nav-link mx-4" onClick={() => {logout()}}>Log Out</a>
                        </li>

                    </ul>
                </nav>




                <aside className="main-sidebar sidebar-dark-primary elevation-4">



                    <div className={
                        showSideBar ?
                            'sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-transition os-host-scrollbar-horizontal-hidden' :
                            'sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-transition os-host-overflow-x'}>
                        <div className="os-resize-observer-host observed">
                            <div className="os-resize-observer" style={{ left: '0px', right: 'auto' }}></div>
                        </div>
                        <div className="os-size-auto-observer observed" style={{ height: 'calc(100% + 1px)', float: 'left' }}>
                            <div className="os-resize-observer"></div>
                        </div>
                        <div className="os-content-glue" style={{ margin: '0px -8px', width: '249px', height: '834px' }}>
                            <div className="os-padding">
                                <div className="os-viewport os-viewport-native-scrollbars-invisible os-viewport-native-scrollbars-overlaid"
                                    style={{ overflowY: 'scroll' }}>
                                    <div className="os-content" style={{ padding: '0px 8px', height: '100%', width: '100%' }}>


                                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                            <div className="image">
                                                <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" className="img-circle elevation-2" alt="User Image" />
                                            </div>
                                            <div className="info">
                                                <a href="#" className="d-block">{admin.admin.name}</a>
                                            </div>
                                        </div>





                                        <nav className="mt-2">
                                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                                data-accordion="false">

                                                <Link to={'/admin'} className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <FaChartLine />
                                                        <p className="text">Dashboard</p>
                                                    </a>
                                                </Link>

                                                <Link to={'/admin/books'} className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <FaBook />
                                                        <p className="text">Books</p>
                                                    </a>
                                                </Link>

                                                <Link to={'/admin/authors'} className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <FaKeyboard />
                                                        <p className="text">Authors</p>
                                                    </a>
                                                </Link>

                                                <Link to={'/admin/genres'} className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <FaDna />
                                                        <p className="text">Genres</p>
                                                    </a>
                                                </Link>

                                                <Link to={'/admin/system_config_update'} className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <FaSlidersH />
                                                        <p className="text">System Config</p>
                                                    </a>
                                                </Link>
                                                
                                            </ul>
                                        </nav>


                                    </div>
                                </div>
                            </div>
                            <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
                                <div className="os-scrollbar-track">
                                    <div className="os-scrollbar-handle" style={{ width: '100%', transform: 'translate(0px)' }}></div>
                                </div>
                            </div>
                            <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
                                <div className="os-scrollbar-track">
                                    <div className="os-scrollbar-handle" style={{ height: '61.4422%', transform: 'translate(0px)' }}></div>
                                </div>
                            </div>
                            <div className="os-scrollbar-corner"></div>
                        </div>

                    </div>


                </aside>



                <div className="content-wrapper" style={{ minHeight: '778px' }}>


                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0"></h1>
                                </div>

                                <div className="col-sm-6">

                                </div>

                            </div>

                        </div>

                    </div>




                    <section className="content">
                        <div className="container-fluid">

                            <Outlet />


                        </div>

                    </section>


                </div>


                <footer className="main-footer">
                    <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 3.2.0
                    </div>
                </footer>





                <div id="sidebar-overlay"></div>
            </div>
        </div>
    )
}