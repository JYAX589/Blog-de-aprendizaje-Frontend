import React from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
// Si usas el icono de tres puntos
// import { BsThreeDotsVertical } from 'react-icons/bs';
// Importa el hook useNavigate
import { useNavigate } from 'react-router-dom';


// Define una imagen por defecto si el curso no tiene una URL específica
const defaultImage = 'https://via.placeholder.com/150?text=Curso'; // Placeholder por defecto


function CourseCard({ course }) { // Recibe un objeto 'course' con id, title, category, imageUrl
  // Obtiene la función de navegación
  const navigate = useNavigate();
  

  // Usa la imagen del curso o la por defecto
  const imageUrl = course.imageUrl || defaultImage;

  // Función que se ejecuta al hacer clic en el botón
  const handleEnterCourseClick = () => {
    // **Navega a la nueva ruta de creación de post, pasando el ID del curso en la URL**
    // La ruta será '/create-post/IDENTIFICADOR_DEL_CURSO'
    navigate(`/create-post/${course.id}`); // <--- Navega a la página de creación con el ID del curso
  };

  return (
    // Establece un ancho fijo para las tarjetas si xs="auto" no funciona como esperas
    <Card style={{ width: '18rem' }} className="h-100"> {/* Ejemplo: ancho fijo */}
      <div style={{ position: 'relative' }}>
         {/* Si la imagen del curso (Taller.png, TICs.png, etc.) está en src/assets, la prop imageUrl debe ser la *importación* de la imagen, no el string de la ruta.
         Ej: En CoursesListPage, si tienes import imagenTaller from '../assets/images/Taller.png';
         Entonces en fixedCourses, pones imageUrl: imagenTaller.
         Si las URL_IMAGEN_... que definiste en fixedCourses son URLs *públicas* (ej: de internet, o de tu carpeta public/), entonces déjalo como string.
         Asumo que imageUrl aquí es una URL que el navegador puede cargar directamente. */}
        <Card.Img variant="top" src={imageUrl} alt={course.title} style={{ height: '180px', objectFit: 'cover' }} />
        {/* Icono de tres puntos (si lo usas) */}
        {/* <Dropdown style={{ position: 'absolute', top: '10px', right: '10px' }}>
           <Dropdown.Toggle as="span" id={`dropdown-options-${course.id}`} style={{ cursor: 'pointer' }}>
             <BsThreeDotsVertical size={20} color="white" />
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item>Opción 1</Dropdown.Item>
           </Dropdown.Menu>
         </Dropdown> */}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{course.title}</Card.Title>
        <Card.Text className="text-muted small mb-2">
          📁 {course.category}
        </Card.Text>
        {/* Agrega el evento onClick al botón */}
        <Button variant="danger" className="mt-auto" onClick={handleEnterCourseClick}> {/* <--- Agrega onClick */}
          Enter this course
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;