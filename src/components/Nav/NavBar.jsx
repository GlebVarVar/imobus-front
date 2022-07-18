// Шапка сайта
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import FromniLogo from '../../assets/FromniLogo.png';

const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand>
                    <img src = {FromniLogo} className="img-fluid" alt="Fromni Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Created by <a href="https://github.com/GlebVarVar"> Gleb Kostrov </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );

};

export default NavBar;