import React, { Component } from "react";
import { Carousel, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

class Gallery extends Component {
  state = {
    movies: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    const apiKey = "662fb97c";
    const url = `http://www.omdbapi.com/?s=Harry+Potter&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        this.setState({ movies: data.Search, isLoading: false });
      } else {
        this.setState({ isError: true, isLoading: false });
      }
    } catch (error) {
      console.error("Errore nel fetch dei dati:", error);
      this.setState({ isError: true, isLoading: false });
    }
  };

  render() {
    const { movies, isLoading, isError } = this.state;

    // Divide i film in gruppi di 6
    const groupedMovies = [];
    for (let i = 0; i < movies.length; i += 6) {
      groupedMovies.push(movies.slice(i, i + 6));
    }

    return (
      <Container fluid className="w-75 gallerys">
        <h4>{this.props.title}</h4>
        {isLoading && <Spinner animation="border" variant="info" />}
        {isError && (
          <Alert variant="danger">
            Ops! Qualcosa è andato storto
            <i className="bi bi-exclamation-triangle"></i>
          </Alert>
        )}
        <Carousel indicators={false} controls={true} className="mb-5">
          {groupedMovies.map((group, index) => (
            <Carousel.Item key={index} className="mt-2">
              <Container fluid className="p-0">
                <Row>
                  {group.map((movie, idx) => (
                    <Col xs={12} md={2} className="mb-3 p-1" key={idx}>
                      <Link to={`/movie-details/${movie.imdbID}`}>
                        <img
                          src={movie.Poster}
                          className="d-block w-100"
                          alt={movie.Title}
                        />
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Container>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    );
  }
}

export default Gallery;
