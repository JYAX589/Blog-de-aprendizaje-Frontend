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


   useEffect(() => {
     const fetchPosts = async () => {
       try {
         const postsData = await getPostsByCourse(courseId);
         setPosts(postsData); 
         setLoading(false);
       } catch (err) {
         setError(err);
         setLoading(false);
       }
     };

     if (courseId) { 
         fetchPosts();
     }


   }, [courseId]); 


   if (loading) {
     return <Container>Cargando posts del curso...</Container>;
   }

   if (error) {
     return <Container>Error al cargar posts: {error.message}</Container>;
   }

  return (
    <Container className="mt-4"> 
      <h1>Posts del Curso: {courseId}</h1> 
      <p>Aquí verás los posts relacionados con el curso con ID: {courseId}</p>

      <Row>
        {posts.length > 0 ? (
          posts.map(post => (
            <Col md={6} lg={4} key={post._id} className="mb-4"> 
              <Card>
                 <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                 </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col><p>No se encontraron posts para este curso.</p></Col>
        )}
      </Row>

    </Container>
  );
}

export default CourseDetailPage;