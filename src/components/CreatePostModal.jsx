import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { createPost } from '../services/postsApi';

function CreatePostModal({ show, handleClose, onPostCreated }) {
  // Estados para los campos del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const postData = { title, description, course };

    try {
      const newPost = await createPost(postData);

      console.log('Post creado con éxito:', newPost);

      if (onPostCreated) {
        onPostCreated(newPost);
      }

      setTitle('');
      setDescription('');
      setCourse('');
      handleClose();

    } catch (err) {
      console.error('Error al crear el post:', err);
      setError(err.response?.data?.message || 'Error al crear la publicación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nueva Publicación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPostTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPostDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingresa la descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formPostCourse">
            <Form.Label>Curso</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el ID o nombre del curso"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Publicación'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePostModal;