import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [ movies, setMovies ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  // PROMISE VERSION
  // const fetchMoviesHandler = () => {
  //   fetch("https://swapi.dev/api/films").then(response => {
  //     return response.json()
  //   }).then(data => {
  //     const transformedMovies = data.results.map((movieData) => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })
  //     setMovies(transformedMovies)
  //   })
  // }

  // ASYNC/AWAIT VERSION
  // useCallback to 
  const fetchMoviesHandler = useCallback(async () => {

    setIsLoading(true)
    setError(null)

    try {

      const response = await fetch("https://swapi.dev/api/films")
      
      if (!response.ok) {
        throw new Error("Something went wrong!")
      }
      
      const data = await response.json()

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })

      setMovies(transformedMovies)

    } catch (error) {

      setError(error.message)

    }

    setIsLoading(false)
  }, [])

  // useEffect to call our fetch function immediately upon loading
  useEffect(() => {
    fetchMoviesHandler()
  }, [ fetchMoviesHandler ])


  return (
    <React.Fragment>
      <section>
        <button onClick = { fetchMoviesHandler }>Fetch Movies</button>
      </section>
      <section>
        
        {/* case if loading is done and there are movies to display */}
        { !isLoading && movies.length > 0 && <MoviesList movies={ movies } /> }

        {/* case if loading is done and there are NO movies to display */}
        { !isLoading && movies.length === 0 && !error && <p>Found no movies.</p> }

        {/* case if we are still fetching data */}
        { isLoading && <p>Loading...</p>}

        { !isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
