import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'; // Importa Alert para mensajes de error
import { createPost } from '../services/postsApi'; // Importa la función para crear posts

// Este componente recibe props para controlar si se muestra y qué hacer al cerrarse o al crear un post
function CreatePostModal({ show, handleClose, onPostCreated }) {
  // Estados para los campos del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(false); // Estado para deshabilitar el botón mientras se envía
  const [error, setError] = useState(null); // Estado para mostrar errores del API

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    setLoading(true); // Inicia el estado de carga
    setError(null); // Limpia errores anteriores

    // Crea el objeto con los datos del post
    const postData = { title, description, course };

    try {
      // Llama a la función API para crear el post
      const newPost = await createPost(postData); // createPost espera los datos como argumento

      console.log('Post creado con éxito:', newPost);

      // Llama a la función padre para notificar que el post fue creado (ej: para recargar la lista)
      if (onPostCreated) {
        onPostCreated(newPost); // Pasa el nuevo post si es necesario
      }

      // Limpia el formulario y cierra el modal
      setTitle('');
      setDescription('');
      setCourse('');
      handleClose(); // Cierra el modal

    } catch (err) {
      console.error('Error al crear el post:', err);
      // Muestra un mensaje de error amigable al usuario
      setError(err.response?.data?.message || 'Error al crear la publicación.');
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <Modal show={show} onHide={handleClose}> {/* show y onHide controlan la visibilidad */}
      <Modal.Header closeButton>
        <Modal.Title>Crear Nueva Publicación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Muestra errores si existen */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Campo Título */}
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

          {/* Campo Descripción */}
          <Form.Group className="mb-3" controlId="formPostDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea" // Usa textarea para descripciones largas
              rows={3}
              placeholder="Ingresa la descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          {/* Campo Curso */}
          {/* Puedes cambiar esto por un Select si tienes una lista fija de cursos */}
          <Form.Group className="mb-3" controlId="formPostCourse">
            <Form.Label>Curso</Form.Label>
            <Form.Control
              type="text" // O type="text" si el backend espera el nombre del curso como string
              placeholder="Ingresa el ID o nombre del curso" // Adapta el placeholder
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </Form.Group>

          {/* Botón de Enviar dentro del formulario */}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Publicación'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePostModal;