import React,{ useEffect, useState} from 'react';
import { Navbar, Nav, NavDropdown, Container,Offcanvas, Button,Col,Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavbarSection = () => {
    const linkStyle={color:'white',textDecoration:'none'}
    const dropStyle={color:'black',textDecoration:'none'}
    const [show, setShow] = useState(false);
    const getEmailRef = localStorage.getItem("emailData")
    const getPasswordRef = localStorage.getItem("passwordData")
    const getAdminEmailRef = localStorage.getItem("adminEmailData")
    const getAdminPasswordRef = localStorage.getItem("adminPasswordData")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()
    const logOut = () =>{
      localStorage.removeItem('emailData');
      localStorage.removeItem('passwordData')
      window.location.reload();
    }
    const adminLogout = () =>{
      localStorage.removeItem('adminEmailData')
      localStorage.removeItem('adminPasswordData')
      navigate('/adminLogin');
    }

    return (
        <div>
            <Navbar expand="lg" className="Navbar bg-secondary ">
                <Container>
                    <Navbar.Brand ><Link style={linkStyle} to={'/'}>Web Application</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link ><Link style={linkStyle} to={'/'}>Home</Link></Nav.Link>
                        </Nav> 
                        {getEmailRef&&getPasswordRef ? (
                        <div style={{marginRight:'2em'}}>
                        <a className="text-white" style={{textDecoration:'none', cursor:'pointer'}} onClick={handleShow}>{getEmailRef}</a>
                        </div>              
                        ) : null}
                        <br/>
                        <NavDropdown className='text-white' title='Options'  id="basic-nav-dropdown" >
                           {getEmailRef&&getPasswordRef ? (<NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>):<NavDropdown.Item ><Link style={dropStyle} to={'/login'}>Login</Link></NavDropdown.Item>} 
                            <NavDropdown.Divider />
                            {getAdminEmailRef&&getAdminPasswordRef ?(<NavDropdown.Item onClick={adminLogout}>Admin Logout</NavDropdown.Item>):
                            <NavDropdown.Item ><Link style={dropStyle}  to={'adminLogin'}>Admin Panel</Link></NavDropdown.Item>
                            }
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

  <Offcanvas className='bg-secondary' show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title className='text-white'>Profile</Offcanvas.Title>
    </Offcanvas.Header>
    <Col xs={6} md={4}>
      <Image style={{ marginLeft: '6em' }} width={'200px'} height={'200px'} src="data:image/png;base64,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" roundedCircle />
    </Col>
    <Offcanvas.Body className='text-center text-white'>
      <p>You:</p>
      {getEmailRef}
    </Offcanvas.Body>
  </Offcanvas>
        </div>
    );
}

export default NavbarSection;
