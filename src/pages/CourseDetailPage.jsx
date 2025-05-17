import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; 
import { useParams } from 'react-router-dom';
import { getPostsByCourse } from '../services/postsApi'; 

function CourseDetailPage() {
  // Obtiene el parámetro courseId de la URL
  const { courseId } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Ejemplo: Usa useEffect para cargar los posts de este curso al cargar la página
   useEffect(() => {
     const fetchPosts = async () => {
       try {
         // Llama a tu función API para obtener los posts del curso usando el courseId de la URL
         const postsData = await getPostsByCourse(courseId);
         // Ajusta esto según la estructura de datos que devuelve tu backend
         // Si getPostsByCourse devuelve { posts: [...] }, usa postsData.posts
         setPosts(postsData); // Asumo que postsData es directamente el array de posts
         setLoading(false);
       } catch (err) {
         setError(err);
         setLoading(false);
       }
     };

     if (courseId) { // Asegúrate de tener el ID antes de intentar cargar datos
         fetchPosts();
     }


   }, [courseId]); // El efecto se vuelve a ejecutar si courseId cambia en la URL


   if (loading) {
     return <Container>Cargando posts del curso...</Container>;
   }

   if (error) {
     return <Container>Error al cargar posts: {error.message}</Container>;
   }

   // Diseño básico de la página de detalle
  return (
    <Container className="mt-4"> {/* mt-4 añade margen superior */}
      <h1>Posts del Curso: {courseId}</h1> {/* Muestra la ID del curso obtenida de la URL */}
      <p>Aquí verás los posts relacionados con el curso con ID: {courseId}</p>

      {/* Renderiza la lista de posts obtenidos del backend */}
      <Row>
        {posts.length > 0 ? (
          posts.map(post => (
            <Col md={6} lg={4} key={post._id} className="mb-4"> {/* mb-4 añade margen inferior */}
              <Card>
                 <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    {/* Puedes añadir más detalles del post aquí */}
                 </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col><p>No se encontraron posts para este curso.</p></Col>
        )}
      </Row>


      {/* Aquí iría el contenido específico del curso o los posts asociados */}
    </Container>
  );
}

export default CourseDetailPage;