import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import imagenTaller from '../assets/images/Taller.png';
import imagenTics from '../assets/images/Tecnologia.avif';
import imagenPractica from '../assets/images/Practica.jpg';

const fixedCourses = [
  {
    id: 'Taller',
    title: 'TALLER III',
    category: 'Informática',
    imageUrl: imagenTaller
  },
  {
    id: 'TICs',
    title: 'TICs',
    category: 'Informática',
    imageUrl: imagenTics
  },
  {
    id: 'Practica',
    title: 'Práctica Supervisada',
    category: 'Informática',
    imageUrl: imagenPractica
  },
];


function CoursesListPage() {
  const navigate = useNavigate();


  return (
    <Container fluid className="mt-4">
      <div className="mb-3 text-end">
        <Link to="/posts">
          <Button variant="info">Ver Todas las Publicaciones</Button>
        </Link>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
        {fixedCourses.map(course => (
          <Col key={course.id} xs="auto" md="auto" lg="auto">
            <Card style={{ width: '18rem' }} className="h-100">
              <div style={{ position: 'relative' }}>
                <Card.Img variant="top" src={course.imageUrl} alt={course.title} style={{ height: '180px', objectFit: 'cover' }} />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{course.title}</Card.Title>
                <Card.Text className="text-muted small mb-2">
                  📁 {course.category}
                </Card.Text>
                <Button
                  variant="danger"
                  className="mt-auto"
                  onClick={() => navigate(`/create-post/${course.id}`)}
                >
                  Enter this course
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CoursesListPage;