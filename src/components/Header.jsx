import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // Para usar Link de React Router con componentes de Bootstrap

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg"> {/* bg="dark" y variant="dark" para fondo oscuro y texto claro */}
      <Container>
        {/* Título o Logo de tu sitio */}
        <Navbar.Brand href="/">BLOG DE CURSOS</Navbar.Brand> {/* O el nombre de tu blog */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> {/* me-auto empuja los elementos a la derecha */}
            {/* Enlace a la página principal (Cursos Fijos) */}
             <LinkContainer to="/"> {/* Usamos LinkContainer para enlazar */}
                 <Nav.Link>Cursos Principales</Nav.Link>
             </LinkContainer>
            {/* Puedes añadir más enlaces de navegación aquí */}
          </Nav>
          {/* Enlace para ver todas las publicaciones (alineado a la derecha) */}
          <Nav>
            <LinkContainer to="/posts"> {/* Enlaza al /posts */}
                <Nav.Link>
                     <Button variant="info" size="sm"> {/* Button dentro de Nav.Link con estilo info y tamaño pequeño */}
                         Ver Todas las Publicaciones
                     </Button>
                </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;