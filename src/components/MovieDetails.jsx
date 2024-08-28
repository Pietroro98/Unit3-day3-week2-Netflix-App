import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 

const MovieDetails = () => {
  const { movieId } = useParams(); 
  const [movieDetails, setMovieDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = "662fb97c"; 

      try {
       
        const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
        const movieData = await movieResponse.json();
        if (movieData.Response === 'True') {
          setMovieDetails(movieData);
        } else {
          setIsError(true);
        }

        
        const commentsResponse = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${movieId}`, {
          headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN', 
          },
        });
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

      } catch (error) {
        console.error("Errore nel fetch dei dati:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <div><Spinner animation="border" variant="info" /> Loading...</div>;
  }

  if (isError) {
    return <div><Alert variant="danger">Error loading movie details</Alert></div>;
  }

  return (
    <Container>
      {movieDetails && (
        <Row>
          <Col md={4}>
            <img src={movieDetails.Poster} alt={movieDetails.Title} className="w-100" />
          </Col>
          <Col md={8}>
            <h1>{movieDetails.Title}</h1>
            <p><strong>Year:</strong> {movieDetails.Year}</p>
            <p><strong>Genre:</strong> {movieDetails.Genre}</p>
            <p><strong>Director:</strong> {movieDetails.Director}</p>
            <p><strong>Plot:</strong> {movieDetails.Plot}</p>
            <p><strong>IMDB Rating:</strong> {movieDetails.imdbRating}</p>
            <Button variant="primary" onClick={() => window.history.back()}>Back</Button>
          </Col>
        </Row>
      )}
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <p><strong>Rating:</strong> {comment.rate}</p>
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default MovieDetails;
