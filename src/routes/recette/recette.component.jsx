import {
  Avatar,
  Box,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { deepOrange } from "@mui/material/colors";
import Gateau from "../../assets/recettes/gateau-au-chocolat_pg.jpg";
import "./recette.component.scss";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import Comment from "../../components/comment/comment.component";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import CommentInput from "../../components/commentinput/commentinput.component";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Recette = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [infoRecipe, setInfoRecipe] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [userLikes, setUserlikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentValue, setCommentField] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/recipes/details/${
          window.location.pathname.split("/")[2]
        }`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        const { comments, ...rest } = res.data;
        axios
          .get(`http://localhost:5000/api/v1/users/avatar/${rest.created_by}`)
          .then((res) => {
            rest.user = res.data;
            axios
              .get(`http://localhost:5000/api/v1/users/likes`, {
                headers: { Authorization: `Bearer ${user.token}` },
              })
              .then((res) => {
                setComments(comments);
                setInfoRecipe(rest);
                setUserlikes(res.data.likes.likes);
                setIsLiked(userLikes.includes(rest._id));
                setLoading(false);
              });
          });
      });
  }, [loading]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddFavorite = () => {
    if (!isLiked) {
      axios
        .post(
          `http://localhost:5000/api/v1/users/like`,
          {
            recipe_id: infoRecipe._id,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        .then((res) => {
          setIsLiked(true);
          setUserlikes(res.data.likes);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .delete(`http://localhost:5000/api/v1/users/dislike`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            recipe_id: infoRecipe._id,
          },
        })
        .then((res) => {
          setIsLiked(false);
          setUserlikes(res.data.likes);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleAddComment = () => {
    let comment = {
      body: commentValue,
    };
    axios
      .post(
        `http://localhost:5000/api/v1/recipes/details/${infoRecipe._id}/create`,
        comment,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        comment = res.data.data;
        const newComments = [...comments, comment];
        setCommentField("");
        setComments(newComments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeComment = (e) => {
    setCommentField(e.target.value);
  };
  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:5000/api/v1/recipes/delete/${infoRecipe._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        navigate("/recipes/me");
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteComment = (id) => {
    axios
      .delete(
        `http://localhost:5000/api/v1/recipes/details/${infoRecipe._id}/delete`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          data: {
            comment_id: id,
          },
        }
      )
      .then((res) => {
        const newComments = comments.filter((comment) => comment._id !== id);
        setComments(newComments);
      })
      .catch((err) => console.log(err));
  };

  if (loading) return <div>Loading ...</div>;
  return (
    <Container className="pt-3">
      <div className="header d-flex align-items-baseline">
        <Avatar
          alt={`${infoRecipe.user.firstName} ${infoRecipe.user.lastName}`}
          sx={{ bgcolor: deepOrange[500] }}
        >
          {infoRecipe.user.firstName[0]}
        </Avatar>
        <h4 className="ms-2">{`${infoRecipe.user.firstName} ${infoRecipe.user.lastName}`}</h4>
      </div>
      <div className="body pt-2">
        <div className="title d-flex justify-content-between align-items-start">
          <h1>{infoRecipe.title}</h1>
          {user._id == infoRecipe.created_by ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Link
                  className="dropdown-item"
                  to={`/recipes/edit/${infoRecipe._id}`}
                >
                  Edit
                </Link>
                <button className="dropdown-item" onClick={handleDelete}>
                  Suppimer
                </button>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
        </div>
        <div className="row intro">
          <div className="col">
            <div className="image">
              <img
                src={`http://localhost:5000/${infoRecipe.image.replaceAll(
                  "\\",
                  "/"
                )}`}
                alt="recipe-image"
              />
            </div>
          </div>
          <div className="col body-recipe p-2 d-flex flex-column justify-content-between">
            <div className="flex-grow-1 ps-1 my-3" direction="column">
              <h5>Présentation</h5>
              <p>{infoRecipe.body}</p>
            </div>
            <Divider color="success" variant="middle" />
            <div className="flex-grow-1 ps-1 my-3">
              <h5>Ingredients</h5>
              {infoRecipe.ingredients.split("/").map((ingredient) => (
                <p>{ingredient.split("-").join(" ")}</p>
              ))}
            </div>
            <Divider color="success" variant="middle" />
            <div className="d-flex justify-content-end align-items-center">
              <Tooltip
                title={
                  isLiked ? "Retirer de mes favoris" : "Ajouter à mes favoris"
                }
              >
                <IconButton color="error" onClick={handleAddFavorite}>
                  {isLiked ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="row my-2 steps">
          <h4>Etapes</h4>
          {infoRecipe.steps.split("/").map((step) => (
            <p>{step.split("-").join(". ")}</p>
          ))}
        </div>
        <div className="comment-section row my-2">
          <h4>Comments</h4>
          <Stack spacing={1} className="comments">
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                data={comment}
                commentValue={commentValue}
                onDelete={handleDeleteComment}
              />
            ))}
            {comments.length == 0 ? (
              <h6 className="info-comments">
                Aucun commentaire, soyez la première personne à partager votre
                opinion
              </h6>
            ) : (
              ""
            )}
          </Stack>
          <CommentInput
            commentValue={commentValue}
            onHandleAdd={handleAddComment}
            onHandleChange={handleChangeComment}
          />
        </div>
      </div>
    </Container>
  );
};
export default Recette;
