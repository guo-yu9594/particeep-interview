import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Movie from "../interfaces/Movie";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Grow from "@mui/material/Grow";
import StackedBar from "./StackedBar";
import * as Data from "../interfaces/Data"
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";

const cardStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: "40px",
  backgroundColor: "#f7f4ff",
  boxShadow: "0",
};

const cardTitleStyle: React.CSSProperties = {
  fontFamily: "Inter",
  fontWeight: "600",
  color: "#3c00ff",
};

const cardCategoryStyle: React.CSSProperties = {
  marginBottom: 1.5,
  fontFamily: "Inter",
  fontWeight: "500",
  color: "#9386ba",
};

const stackedBarStyle: React.CSSProperties = {
  width: "84%",
  height: "4%",
  marginLeft: "8%",
  marginRight: "8%",
};

const cardActionStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  marginTop: "8%",
  marginBottom: "8%",
  marginLeft: "5%",
  marginRight: "5%",
  padding: 0,
  width: "90%",
};

const cardContentStyle: React.CSSProperties = {
  paddingLeft: "8%",
  paddingRight: "8%",
  paddingTop: "8%",
  paddingBottom: "4%",
  position: "relative",
};

const convertForStackedBarData = (data: Movie): Data.mapStringNumber => {
  return {
    likes: data.likes,
    dislikes: data.dislikes,
  };
};

export interface MovieCardProps {
  movie: Movie;
  deleteHandler: Function;
  likeHandler: Function;
  displayed: boolean;
}

const MovieCard = ({
  movie,
  deleteHandler,
  likeHandler,
  displayed
}: MovieCardProps): JSX.Element => {
  const [isLiked, setIsLiked] = useState<number>(0);
  const stackedBarData: Data.mapStringNumber = convertForStackedBarData(movie);
  const likeAction = (type: string) => {
    const state = (type === "like") ? 1 : -1;

    likeHandler(movie.id, type, isLiked);
    setIsLiked(isLiked === 0 || isLiked === -state ? state : 0);
  };
  const dislikeBtn: JSX.Element =
    isLiked === -1 ? (
      <ThumbDownAltRoundedIcon sx={{ color: "red" }} />
    ) : (
      <ThumbDownOffAltRoundedIcon sx={{ color: "#9386ba" }} />
    );
  const likeBtn: JSX.Element =
    isLiked === 1 ? (
      <FavoriteRoundedIcon sx={{ color: "#3c00ff" }} />
    ) : (
      <FavoriteBorderRoundedIcon sx={{ color: "#9386ba" }} />
    );

  return (
    <Grow
      key={movie.id}
      in={displayed}
      style={{ transformOrigin: "0 0 0" }}
      {...(displayed ? { timeout: 1000 } : {})}
    >
      <Card sx={cardStyle}>
        <CardContent sx={cardContentStyle}>
          <Typography variant="h5" component="div" sx={cardTitleStyle}>
            {movie.title}
          </Typography>
          <Typography sx={cardCategoryStyle} color="text.secondary">
            {movie.category}
          </Typography>
        </CardContent>
        <StackedBar data={stackedBarData} style={stackedBarStyle} />
        <CardActions sx={cardActionStyle}>
          <IconButton sx={{ p: "3%" }} onClick={() => likeAction("like")}>
            {likeBtn}
          </IconButton>
          <IconButton sx={{ p: "3%" }} onClick={() => likeAction("dislike")}>
            {dislikeBtn}
          </IconButton>
          <IconButton
            sx={{ position: "absolute", right: 0, p: "3%" }}
            onClick={() => deleteHandler(movie.id)}
          >
            <DeleteRoundedIcon sx={{ color: "#9386ba" }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grow>
  );
};

export default MovieCard;
