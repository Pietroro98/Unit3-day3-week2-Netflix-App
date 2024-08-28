import React, { useEffect, useState } from 'react';
import Gallery from './Gallery'; 

const Homepage = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [fantasyMovies, setFantasyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "662fb97c"; 

      try {
        
        const actionResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=Action`);
        const actionData = await actionResponse.json();
        if (actionData.Response === 'True') {
          setActionMovies(actionData.Search);
        } else {
          setIsError(true);
        }

       
        const horrorResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=Horror`);
        const horrorData = await horrorResponse.json();
        if (horrorData.Response === 'True') {
          setHorrorMovies(horrorData.Search);
        } else {
          setIsError(true);
        }

        
        const fantasyResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=Fantasy`);
        const fantasyData = await fantasyResponse.json();
        if (fantasyData.Response === 'True') {
          setFantasyMovies(fantasyData.Search);
        } else {
          setIsError(true);
        }

      } catch (error) {
        console.error("Errore nel fetch dei dati:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (isError) {
    return <div>Error loading movies</div>; 
  }

  return (
    <div>
      <h2>Action Movies</h2>
      <Gallery title="Action" movies={actionMovies} />

      <h2>Horror Movies</h2>
      <Gallery title="Horror" movies={horrorMovies} />

      <h2>Fantasy Movies</h2>
      <Gallery title="Fantasy" movies={fantasyMovies} />
    </div>
  );
};

export default Homepage;