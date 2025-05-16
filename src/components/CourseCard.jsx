import React from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';

// Componente para una sola tarjeta de curso
function CourseCard({ course }) { // Recibe un objeto 'course' como prop
  // Define una imagen por defecto si el curso no tiene una
  const imageUrl = course.imageUrl || defaultImage; // Usa la imagen del curso o la por defecto

  return (
    <Card className="h-100"> {/* h-100 para que las tarjetas tengan la misma altura */}
      <div style={{ position: 'relative' }}> {/* Contenedor para posicionar el icono */}
        <Card.Img variant="top" src={imageUrl} alt={course.title} style={{ height: '180px', objectFit: 'cover' }} /> {/* Ajusta la altura de la imagen */}
        {/* Icono de tres puntos */}
        <Dropdown style={{ position: 'absolute', top: '10px', right: '10px' }}>
          
        </Dropdown>
      </div>
      <Card.Body className="d-flex flex-column"> {/* flex-column para alinear contenido y botón abajo */}
        <Card.Title>{course.title}</Card.Title>
        <Card.Text className="text-muted small mb-2"> {/* Clases de Bootstrap para texto secundario y margen */}
          {/* Puedes usar un icono de carpeta si quieres, similar a la imagen */}
          📁 {course.category}
        </Card.Text>
        {/* El botón se expande para ocupar el espacio disponible en la parte inferior */}
        <Button variant="danger" className="mt-auto"> {/* mt-auto empuja el botón hacia abajo */}
          Enter this course
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;