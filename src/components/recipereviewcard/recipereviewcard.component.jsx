import React from "react";
import "./recipereviewcard.component.scss";
import Card from "react-bootstrap/Card";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from "@mui/material";
export default function RecipeReviewCard(props) {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <div>{props.author}</div>
        <div>{props.date}</div>
      </Card.Header>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.briefDesciption}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <div>
        {props.likeCount} Likes
          </div>
      <IconButton
            color="error"
            aria-label="like"
            component="label"
            onClick={()=>props.handleAdd(props.id)}
          >
            {props.isLiked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
          </IconButton></Card.Footer>
    </Card>
  );
}
