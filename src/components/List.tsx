import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import * as Responsive from "../interfaces/Responsive";
import Movie from "../interfaces/Movie";

const colRPSV: Responsive.Points = [
  {
    maxWidth: 600,
    cols: 1,
  },
  {
    maxWidth: 1000,
    cols: 2,
  },
  {
    maxWidth: 1400,
    cols: 3,
  },
  {
    maxWidth: 1800,
    cols: 4,
  },
];

const manageLike = (
  id: string,
  type: string,
  state: number,
  copy: Movie[]
): Movie[] => {
  let idx = copy.findIndex((movie) => movie.id === id);

  if (type === "like") {
    if (state === 1) --copy[idx].likes;
    if (state === 0 || state === -1) ++copy[idx].likes;
    if (state === -1) --copy[idx].dislikes;
  }
  if (type === "dislike") {
    if (state === -1) --copy[idx].dislikes;
    if (state === 0 || state === 1) ++copy[idx].dislikes;
    if (state === 1) --copy[idx].likes;
  }
  return copy;
};

const getPages = (movies: Movie[], nbPerPage: number): Movie[][] => {
  var matrix: Movie[][] = [];

  for (let i = 0, k = -1; i < movies.length; i++) {
      if (i % nbPerPage === 0) {
          k++;
          matrix[k] = [];
      }
      matrix[k].push(movies[i]);
  }

  return matrix;
}

const getCards = (movies: Movie[], handleDelete: Function, handleLike: Function): JSX.Element[] => {
  if (movies === undefined)
    return [<></>];
  else {
    const elements: JSX.Element[] = [];
    movies.forEach(movie => {
      if (movie.filtered !== undefined)
        elements.push(
          <ImageListItem key={movie.id} sx={{ m: "1%" }}>
            <MovieCard
              key={movie.title}
              movie={movie}
              deleteHandler={handleDelete}
              likeHandler={handleLike}
              displayed={!movie.filtered}
            />
          </ImageListItem>
        );
    })
    return elements;
  }
}

export interface ListProps {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  selectedPage: number;
  nbPerPage: number;
}

const List = ({ movies, setMovies, selectedPage, nbPerPage }: ListProps): JSX.Element => {
  const [nbColumns, setNbColumns] = useState(5);
  const moviesPerPages = getPages(movies, nbPerPage)
  const handleDelete = (id: string) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };
  const handleLike = (id: string, type: string, state: number) => {
    let copy = [...movies];

    manageLike(id, type, state, copy);
    setMovies(copy);
  };

  useEffect(() => {
    const handleResize = () => {
      for (let i = 0; i < colRPSV.length; i++) {
        if (window.innerWidth < colRPSV[i].maxWidth) {
          setNbColumns(colRPSV[i].cols);
          return;
        }
      }
      setNbColumns(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ImageList
      sx={{ width: "90vw", height: "90%", mb: 0 }}
      cols={nbColumns}
      rowHeight={200}
    >
      {getCards(moviesPerPages[selectedPage - 1], handleDelete, handleLike)}
    </ImageList>
  );
};

export default List;
