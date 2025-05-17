import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap'; 
import { getPosts } from '../services/postsApi'; 
import { useNavigate } from 'react-router-dom'; 


const DEFAULT_POST_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWDZJah2K82d1WgtUTbPggEDWm2trxJdXEew&s'; // Placeholder con otro tamaño


function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await getPosts(); 

      if (responseData && Array.isArray(responseData.posts)) {
         const formattedPosts = responseData.posts.map(post => ({
              id: post._id,
              title: post.title,
              description: post.description,
              category: post.course || 'General',
              imageUrl: post.imageUrl || DEFAULT_POST_IMAGE
         }));
         setPosts(formattedPosts);
      } else {
         console.error('La respuesta del backend no contiene un array de posts:', responseData);
         setPosts([]);
         setError(new Error('Formato de respuesta inesperado del servidor al cargar posts.'));
      }
      setLoading(false);

    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  if (loading) {
    return <Container className="mt-4">Cargando publicaciones...</Container>;
  }

  if (error) {
    return <Container className="mt-4"><Alert variant="danger">Error al cargar publicaciones: {error.message}</Alert></Container>;
  }

  return (
    <Container className="mt-4">
      <h1>Todas las Publicaciones</h1>
      <p>Aquí puedes ver todas las publicaciones que se han creado.</p>

       <div className="mb-3">
          <Button variant="secondary" onClick={() => navigate('/')}>
             Volver a Cursos
          </Button>
       </div>


      <Row className="g-4">
        {posts.length > 0 ? (
          posts.map(post => (
            <Col key={post.id} xs={12} md={6} lg={4}>
              <Card>
                 {post.imageUrl && <Card.Img variant="top" src={post.imageUrl} alt={post.title} style={{ height: '200px', objectFit: 'cover' }} />}
                 <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                     <Card.Subtitle className="mb-2 text-muted small">Curso: {post.category}</Card.Subtitle>
                    <Card.Text>{post.description}</Card.Text>
                 </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col><p>No se encontraron publicaciones.</p></Col>
        )}
      </Row>
    </Container>
  );
}

export default AllPostsPage;