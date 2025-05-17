import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { createPost } from '../services/postsApi';

function CreatePostPage() {
  const { courseIdentifier } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const postData = {
      title: title,
      description: description,
      course: courseIdentifier
    };

    try {
      const newPost = await createPost(postData);

      console.log('Publicación creada con éxito:', newPost);
      setSuccess(true);

      setTitle('');
      setDescription('');

    } catch (err) {
      console.error('Error al crear la publicación:', err);
      setError(err.response?.data?.message || 'Ocurrió un error al crear la publicación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="mb-3">Crear Publicación para: {courseIdentifier}</Card.Title>

          {success && <Alert variant="success">¡Publicación creada con éxito!</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formCreatePostTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el título de la publicación"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formCreatePostDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={8} // Ajusta el número de filas según se necesite
                placeholder="Ingresa el contenido completo de la publicación"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Publicación'}
            </Button>
            {' '}
            <Button variant="secondary" onClick={() => navigate('/')}>
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreatePostPage;