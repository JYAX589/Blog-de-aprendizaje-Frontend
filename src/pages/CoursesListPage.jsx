import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FilterBar from '../components/FilterBar'; // Importa la barra de filtros
import CourseCard from '../components/CourseCard'; // Importa la tarjeta de curso
import imagenTaller from '../assets/images/Taller.png';
import imagenPractica from '../assets/images/Practica.jpg';
import imagenTecnologia from '../assets/images/Tecnologia.avif';

// Datos de ejemplo (simulando lo que vendría de tu backend)
const mockCourses = [
  { id: 1, title: 'TALLER III', category: 'Informática', imageUrl: imagenTaller }, // Reemplaza URL_DE_IMAGEN_1 con una URL real
  { id: 2, title: 'Tecnología III', category: 'Informática', imageUrl: imagenPractica }, // Reemplaza URL_DE_IMAGEN_2
  { id: 3, title: 'Práctica supervisada', category: 'Informática', imageUrl: imagenTecnologia }, // Reemplaza URL_DE_IMAGEN_3
  // Agrega más cursos aquí
];

function CoursesListPage() {
  return (
    <Container fluid> {/* O Container si quieres que el contenido tenga un ancho fijo */}
      {/* Barra superior de filtros y búsqueda */}
      <FilterBar />

      {/* Cuadrícula de tarjetas de cursos */}
      <Row xs={1} md={2} lg={3} className="g-4"> {/* xs, md, lg definen cuántas columnas por fila según el tamaño de pantalla. g-4 añade espacio entre tarjetas */}
        {/* Mapea sobre los datos de los cursos y renderiza un CourseCard por cada uno */}
        {mockCourses.map(course => (
          <Col key={course.id}> {/* La clave es importante para React */}
            <CourseCard course={course} /> {/* Pasa el objeto course como prop */}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CoursesListPage;