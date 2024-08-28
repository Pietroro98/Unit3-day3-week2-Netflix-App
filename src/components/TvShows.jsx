import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchShows = async () => {
      const apiKey = "662fb97c"; 
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=tv`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
          setShows(data.Search);
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Errore nel fetch dei dati:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchShows();
  }, []);

  return (
    <Container fluid className='w-75 mt-4'>
      <h1>TV Shows</h1>
      {isLoading && <Spinner animation="border" variant="info" />}
      {isError && (
        <Alert variant="danger">
          Ops! Qualcosa è andato storto
          <i className="bi bi-exclamation-triangle"></i>
        </Alert>
      )}
      {!isLoading && !isError && (
        <Row>
          {shows.map((show, index) => (
            <Col xs={12} md={3} className="mb-3" key={index}>
              <Link to={`/tv-show-details/${show.imdbID}`}>
                <img src={show.Poster} alt={show.Title} className="d-block w-100" />
                <h5 className="mt-2">{show.Title}</h5>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TVShows;
