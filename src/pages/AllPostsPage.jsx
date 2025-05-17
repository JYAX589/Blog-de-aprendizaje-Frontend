import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap'; // Importa Button también
import { getPosts } from '../services/postsApi'; // Importa la función para obtener todos los posts
import { useNavigate } from 'react-router-dom'; // Para navegar de vuelta


// Define una imagen por defecto si no viene con el post
const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/300x200?text=Publicación'; // Placeholder con otro tamaño


function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para el botón de volver


  // Función para obtener todos los posts desde el backend
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await getPosts(); // Llama a la función API getPosts

      // Accedemos al array de posts dentro del objeto de respuesta y lo adaptamos
      if (responseData && Array.isArray(responseData.posts)) {
         const formattedPosts = responseData.posts.map(post => ({
              id: post._id,
              title: post.title,
              // Usamos 'description' para el contenido principal ahora
              description: post.description,
              category: post.course || 'General', // Usa el campo 'course' del post
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


  // useEffect para cargar posts al montar la página
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

      {/* Botón para volver a la página principal */}
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
                 {/* Si tienes URL de imagen en el post */}
                 {post.imageUrl && <Card.Img variant="top" src={post.imageUrl} alt={post.title} style={{ height: '200px', objectFit: 'cover' }} />}
                 <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                     <Card.Subtitle className="mb-2 text-muted small">Curso: {post.category}</Card.Subtitle>
                    {/* Muestra el contenido principal */}
                    <Card.Text>{post.description}</Card.Text>
                    {/* Aquí podrías añadir botones para ver detalle, editar, eliminar */}
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