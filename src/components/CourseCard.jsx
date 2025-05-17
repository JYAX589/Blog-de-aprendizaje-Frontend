import React from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const defaultImage = 'https://via.placeholder.com/150?text=Curso'; // Placeholder por defecto


function CourseCard({ course }) { 
  const navigate = useNavigate();
  
  const imageUrl = course.imageUrl || defaultImage;

  const handleEnterCourseClick = () => {
    
    navigate(`/create-post/${course.id}`); 
  };

  return (
    <Card style={{ width: '18rem' }} className="h-100"> 
      <div style={{ position: 'relative' }}>
        <Card.Img variant="top" src={imageUrl} alt={course.title} style={{ height: '180px', objectFit: 'cover' }} />
        
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{course.title}</Card.Title>
        <Card.Text className="text-muted small mb-2">
          📁 {course.category}
        </Card.Text>
        <Button variant="danger" className="mt-auto" onClick={handleEnterCourseClick}> 
          Enter this course
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;