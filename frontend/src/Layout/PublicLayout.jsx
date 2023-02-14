import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Outlet, Link } from "react-router-dom";
import dayjs from 'dayjs';

export default function PublicLayout() {
    return (
        <div className="h-full">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/index">{import.meta.env.VITE_APP_NAME}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to={'/index'} className="nav-link">
                                Home
                            </Link>
                            <Link to={'/books'} className="nav-link">
                                Books
                            </Link>
                            
                            <Link to={'/about-us'} className="nav-link">About</Link>

                        </Nav>
                        <Form className="d-flex navbar-nav">
                            <Link to={'/admin/login'} className="nav-link">
                                Admin Login
                            </Link>

                        </Form>
                    </Navbar.Collapse>

                </Container>
            </Navbar>

            <Outlet />


            <div className="container">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><Link to={'/index'} className="nav-link px-2 text-muted">Home</Link></li>
                        <li className="nav-item"><Link to={'/books'} className="nav-link px-2 text-muted">Books</Link></li>
                        <li className="nav-item"><Link to={'/books'} className="nav-link px-2 text-muted">About</Link></li>
                    </ul>
                    <p className="text-center text-muted">© {dayjs().get('year')} {import.meta.env.VITE_APP_NAME}</p>
                </footer>
            </div>
        </div>
    )
}