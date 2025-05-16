import React from 'react';
import { Navbar, Container, Form, Button, Dropdown } from 'react-bootstrap';

function FilterBar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4"> {/* mb-4 añade margen abajo */}
      <Container fluid> {/* Usa fluid para ancho completo */}
        <Form className="d-flex w-100"> {/* w-100 para que ocupe el ancho */}
          {/* Dropdown "Todos" */}
          <Dropdown className="me-2"> {/* me-2 añade margen a la derecha */}
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Todos
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Categoría 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Categoría 2</Dropdown.Item>
              {/* Agrega más items según tus categorías */}
            </Dropdown.Menu>
          </Dropdown>

          {/* Barra de Búsqueda */}
          <Form.Control
            type="search"
            placeholder="Buscar"
            className="me-2 flex-grow-1" // flex-grow-1 para que ocupe el espacio disponible
            aria-label="Buscar"
          />

          {/* Dropdown "Ordenar por..." */}
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="secondary" id="dropdown-sort">
              Ordenar por nombre del curso
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/sort-1">Nombre A-Z</Dropdown.Item>
              <Dropdown.Item href="#/sort-2">Nombre Z-A</Dropdown.Item>
              {/* Agrega más opciones de ordenamiento */}
            </Dropdown.Menu>
          </Dropdown>

          {/* Dropdown "Tarjeta" (o vista) */}
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-view">
              Tarjeta
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/view-grid">Cuadrícula</Dropdown.Item>
              <Dropdown.Item href="#/view-list">Lista</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Form>
      </Container>
    </Navbar>
  );
}

export default FilterBar;