import React, { useEffect, useState } from 'react';
import { Container, Card, Alert, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostsById, deletePost } from '../services/postsApi';
import { getCommentsByPostId, createComment, deleteCommentById } from '../services/commentsApi';


const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/600x400?text=Publicaci%C3%B3n';


function SinglePostPage() {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loadingPost, setLoadingPost] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const [error, setError] = useState(null);

    const [userName, setUserName] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [commentError, setCommentError] = useState(null);
    const [commentSuccess, setCommentSuccess] = useState(false);


    const fetchPost = async () => {
        setLoadingPost(true);
        setError(null);
        try {
            const postData = await getPostsById(postId);
             if (postData && postData.post) {
                setPost(postData.post);
             } else {
                 setPost(null);
                 setError(new Error('Publicación no encontrada o formato incorrecto.'));
             }
            setLoadingPost(false);
        } catch (err) {
            console.error(`Error fetching post ${postId}:`, err);
            setPost(null);
            setError(new Error(`Error al cargar la publicación: ${err.message}`));
            setLoadingPost(false);
        }
    };

     const fetchComments = async () => {
         setLoadingComments(true);
         setCommentError(null);
         try {
             const commentsData = await getCommentsByPostId(postId);

             if (commentsData && Array.isArray(commentsData.comments)) {
                 setComments(commentsData.comments);
             } else if (Array.isArray(commentsData)) {
                  setComments(commentsData);
             } else {
                  setComments([]);
                  console.warn('Respuesta inesperada al cargar comentarios:', commentsData);
             }
             setLoadingComments(false);
         } catch (err) {
             console.error(`Error fetching comments for post ${postId}:`, err);
             setComments([]);
             setCommentError(new Error(`Error al cargar comentarios: ${err.message}`));
             setLoadingComments(false);
         }
     };


    useEffect(() => {
        if (postId) {
            fetchPost();
            fetchComments();
        } else {
            setLoadingPost(false);
            setLoadingComments(false);
            setError(new Error('No se proporcionó ID de publicación en la URL.'));
        }
    }, [postId]);


    const handleDeletePost = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación y todos sus comentarios?')) {
            try {
                await deletePost(postId);

                console.log('Publicación eliminada con éxito:', postId);

                navigate('/posts');

            } catch (err) {
                console.error(`Error al eliminar publicación ${postId}:`, err);
                 setError(new Error(`Error al eliminar la publicación: ${err.response?.data?.message || err.message}`));
            }
        }
    };


    const handleDeleteComment = async (commentId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            try {
                await deleteCommentById(commentId);
                console.log('Comentario eliminado con éxito:', commentId);

                fetchComments();

            } catch (err) {
                console.error(`Error al eliminar comentario ${commentId}:`, err);
                 alert(`Error al eliminar comentario: ${err.response?.data?.message || err.message}`);
            }
        }
    };


    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        setSubmittingComment(true);
        setCommentError(null);
        setCommentSuccess(false);

        if (!userName.trim() || !commentContent.trim()) {
            setCommentError(new Error('Nombre de usuario y comentario no pueden estar vacíos.'));
            setSubmittingComment(false);
            return;
        }

        const commentData = {
            postId: postId,
            userName: userName,
            content: commentContent,
        };

        try {
            const newCommentResponse = await createComment(commentData);
            console.log('Comentario creado con éxito:', newCommentResponse);

            fetchComments();

            setUserName('');
            setCommentContent('');
            setCommentSuccess(true);

            setTimeout(() => setCommentSuccess(false), 3000);


        } catch (err) {
            console.error('Error al crear el comentario:', err);
            setCommentError(err.response?.data?.message || 'Ocurrió un error al publicar el comentario.');
        } finally {
            setSubmittingComment(false);
        }
    };


    if (loadingPost) {
        return <Container className="mt-4 text-center"><Spinner animation="border" /> Cargando publicación...</Container>;
    }

    if (error) {
        return <Container className="mt-4"><Alert variant="danger">{error.message}</Alert></Container>;
    }

    if (!post) {
         return <Container className="mt-4"><Alert variant="warning">Publicación no encontrada.</Alert></Container>;
    }


    return (
        <Container className="mt-4">
             <div className="mb-3 d-flex justify-content-between">
                 <Button variant="secondary" onClick={() => navigate('/posts')}>
                     Volver a Todas las Publicaciones
                 </Button>
                 <Button
                     variant="danger"
                     onClick={handleDeletePost}
                 >
                     Eliminar Publicación
                 </Button>
              </div>


            <Card className="mb-4">
                 {post.imageUrl && <Card.Img variant="top" src={post.imageUrl} alt={post.title} style={{ maxHeight: '400px', objectFit: 'cover' }} />}
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted small">Curso: {post.course}</Card.Subtitle>
                    <Card.Text>{post.description}</Card.Text>
                    <Card.Text><small className="text-muted">Creado el: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}</small></Card.Text>
                </Card.Body>
            </Card>

            <h3 className="mb-3">Comentarios ({comments.length})</h3>

             {loadingComments ? (
                 <div className="text-center mb-3"><Spinner animation="border" size="sm"/> Cargando comentarios...</div>
             ) : commentError ? (
                 <Alert variant="warning">{commentError.message}</Alert>
             ) : comments.length > 0 ? (
                 <ListGroup className="mb-4">
                     {comments.map(comment => (
                         <ListGroup.Item key={comment._id}>
                             <div className="d-flex w-100 justify-content-between align-items-center">
                                 <h6 className="mb-1 me-2">{comment.userName}</h6>
                                 <small className="text-muted text-end">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'N/A'}</small>
                             </div>
                             <p className="mb-1">{comment.content}</p>
                              <div className="text-end">
                                 <Button
                                     variant="danger"
                                     size="sm"
                                     onClick={() => handleDeleteComment(comment._id)}
                                 >
                                     Eliminar
                                 </Button>
                              </div>
                         </ListGroup.Item>
                     ))}
                 </ListGroup>
             ) : (
                 <p className="mb-4">Aún no hay comentarios para esta publicación.</p>
             )}


            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="mb-3">Dejar un comentario</Card.Title>
                 {commentSuccess && <Alert variant="success">¡Comentario agregado!</Alert>}
                 {commentError && <Alert variant="danger">{commentError.message}</Alert>}

                 <Form onSubmit={handleCommentSubmit}>
                     <Form.Group className="mb-3" controlId="formCommentUserName">
                         <Form.Label>Tu Nombre</Form.Label>
                         <Form.Control
                             type="text"
                             placeholder="Ingresa tu nombre"
                             value={userName}
                             onChange={(e) => setUserName(e.target.value)}
                             required
                             disabled={submittingComment}
                         />
                     </Form.Group>

                     <Form.Group className="mb-3" controlId="formCommentContent">
                         <Form.Label>Comentario</Form.Label>
                         <Form.Control
                             as="textarea"
                             rows={3}
                             placeholder="Escribe tu comentario aquí"
                             value={commentContent}
                             onChange={(e) => setCommentContent(e.target.value)}
                             required
                             disabled={submittingComment}
                         />
                     </Form.Group>

                     <Button variant="primary" type="submit" disabled={submittingComment || loadingComments}>
                         {submittingComment ? 'Publicando...' : 'Publicar Comentario'}
                     </Button>
                 </Form>
              </Card.Body>
            </Card>


        </Container>
    );
}

export default SinglePostPage;