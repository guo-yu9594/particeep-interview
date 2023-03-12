import { useEffect, useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import List from './components/List';
import ListPagination from './components/Pagination';
import Movie from './interfaces/Movie'
import QuantitySelector from "./components/QuantitySelector";
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
  const [nbPerPage, setNbPerPage] = useState<number>(12);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      const res: Movie[] = await Data.movies$;
      setMovies(res.map(movie => {movie.filtered = false; return movie;}));
    })();
  }, []);

  return (
    <div style={appStyle}>
      <AppBar filterProps={{movies, setMovies}}/>
      <QuantitySelector nbPerPage={nbPerPage} setNbPerPage={setNbPerPage} />
      <List movies={movies} setMovies={setMovies} selectedPage={selectedPage} nbPerPage={nbPerPage} />
      <ListPagination movies={movies} nbPerPage={nbPerPage} selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
    </div>
  );
}

export default App;
