import React, { Component } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

class MovieGallery extends Component {
  state = {
    movies: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    this.fetchMovies("Harry Potter"); // Sostituisci con il termine di ricerca desiderato
  }

  fetchMovies = async (searchTerm) => {
    const apiKey = "662fb97c";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.Response === "True") {
        this.setState({
          movies: data.Search,
          isLoading: false,
          isError: false,
        });
      } else {
        this.setState({
          isLoading: false,
          isError: true,
        });
      }
    } catch (error) {
      console.error("Errore nel fetch dei dati:", error);
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  };

  render() {
    const { movies, isLoading, isError } = this.state;

    if (isLoading) return <Spinner animation="border" variant="info" />;
    if (isError)
      return <Alert variant="danger">Ops! Qualcosa è andato storto.</Alert>;

    return (
      <Container fluid>
        <Row>
          {movies.map((movie) => (
            <Col xs={12} md={3} key={movie.imdbID}>
              <Link to={`/movie-details/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} className="w-100" />
                <h5>{movie.Title}</h5>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default MovieGallery;
