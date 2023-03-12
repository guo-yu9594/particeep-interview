import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import * as Responsive from "../interfaces/Responsive";
import * as Data from "../data/movie";
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

export interface ListProps {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const manageLike = (id: string, type: string, state: number, copy: Movie[]): Movie[] => {
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

const List = ({ movies, setMovies }: ListProps): JSX.Element => {
  const displayedMovies = movies.filter((m) => m.filtered === false);
  const [nbColumns, setNbColumns] = useState(5);
  const handleDelete = (id: string) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };
  const handleLike = (id: string, type: string, state: number) => {
    let copy = [...movies];
  
    manageLike(id, type, state, copy)
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
      sx={{ width: "90vw", height: "90%" }}
      cols={nbColumns}
      rowHeight={200}
    >
      {displayedMovies.map((item) => {
        if (item.filtered === false)
          return (
            <ImageListItem key={item.id} sx={{ m: "1%" }}>
              <MovieCard
                movie={item}
                deleteHandler={handleDelete}
                likeHandler={handleLike}
              />
            </ImageListItem>
          );
      })}
    </ImageList>
  );
};

export default List;
