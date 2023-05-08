import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Outlet} from 'react-router-dom';
import AppContext from "../../context/AppContext";
import {GiCookingPot}  from "react-icons/gi"
import {BiUser} from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { FaWpexplorer } from "react-icons/fa";
import "./navigation.component.scss"
import { useNavigate } from 'react-router-dom';
import {useContext} from 'react'
import { Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
const Navigation = () => {
  const navigate = useNavigate()
  const {logoutUser} = useContext(AppContext)
    const expand="md"
    return(
        <>
        <Navbar key={expand} bg="primary" variant="dark" expand={expand}>
          <Container fluid>
            <Link to="/" className='Logo navbar-brand'>
            Kochen.
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Kochen.
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end gap-1 flex-grow-1 pe-3">
                  <Link className='btn btn-primary' to="/me" ><BiUser size="1.5em"/></Link>
                  <Link className='btn btn-primary' to="/recipes/me"><GiCookingPot size="1.5em"/></Link>
                  <Link className='btn btn-primary' to="/explorer"><FaWpexplorer size="1.5em"/></Link>
                  <Link className='btn btn-primary' to="/recipes/fav"><MdFavorite size="1.5em"/></Link>
                  <button className='btn btn-success' onClick={logoutUser}>Deconnexion</button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      <Outlet/>
      <Footer/>
        </>
    );
}
export default Navigation;