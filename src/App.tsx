import { useEffect, useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import List from './components/List';
import ListPagination from './components/Pagination';
import Movie from './interfaces/Movie'
import * as Data from './data/movie'

const appStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    (async () => {
      const res: Movie[] = await Data.movies$;
      setMovies(res.map(movie => {movie.filtered = false; return movie;}));
    })();
  }, []);

  return (
    <div style={appStyle}>
      <AppBar filterProps={{movies, setMovies}}/>
      <List movies={movies} setMovies={setMovies} />
      <ListPagination />
    </div>
  );
}

export default App;
