import React , { useContext }from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom' 
import {CartContext} from './App';

export default function Title() {

  const role = sessionStorage.getItem('role');
  const isSignIn = sessionStorage.getItem('isSignIn');
    const handleLogOut = () => {
        sessionStorage.clear();
        context.cart = ''
        navigate('/')
    }
        let navigate = useNavigate();  
  const context = useContext(CartContext)

  return (
    <div>
      <Navbar className="gradient-custom" bg="primary" variant="dark">
        <Container>
            <Navbar.Brand href="/signin">Mobile FSD</Navbar.Brand>
            <Nav className="me-auto">
            {!role && <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>}
            {!isSignIn && <Nav.Link onClick={() => navigate('/signin')}>SignUp</Nav.Link>}
            <Nav.Link onClick={() => navigate('/cart')}>Cart {context.cart.length}</Nav.Link> 
            { !role ? "" : role === 'admin' ? <Nav.Link onClick={() => navigate('/adminDashboard')}>DashBoard</Nav.Link> :
                  <Nav.Link onClick={() => navigate('/customerDashboard')}>DashBoard</Nav.Link>}
            {role && <Nav.Link onClick={handleLogOut}>Logout</Nav.Link> }
            </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
