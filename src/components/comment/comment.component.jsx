import { Delete, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { deepOrange } from "@mui/material/colors";
import AppContext from "../../context/AppContext";

import axios from "axios";

const Comment = (props) => {
  const { user } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [infoPublisher, setInfoPublisher] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/users/avatar/${props.data.created_by}`)
      .then((res) => {
        setInfoPublisher(res.data);
        setLoading(false);
      });
  });
  const date_mongodb = new Date(props.data.createdAt);
  const date_aujourdhui = new Date();
  if (date_mongodb.getDate() === date_aujourdhui.getDate()) {
    const heure = date_mongodb.getHours().toString().padStart(2, "0");
    const minute = date_mongodb.getMinutes().toString().padStart(2, "0");
    // Construire la chaîne formatée
    var date_mongodb_fr = `Aujourd'hui ${heure}:${minute}`;
  } else {
    var date_mongodb_fr = date_mongodb.toLocaleDateString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (loading) return <div>Loading ...</div>;
  return (
    <Box sx={{ p: 2, border: "1px solid grey" }} borderRadius={2}>
      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            className="avatar"
            spacing={2}
            alignItems="center"
          >
            <Avatar
              alt={`${infoPublisher.firstName} ${infoPublisher.lastName}`}
              sx={{ bgcolor: deepOrange[500] }}
            >
              {infoPublisher.firstName[0]}
            </Avatar>
            <h6>{`${infoPublisher.firstName} ${infoPublisher.lastName}`}</h6>
          </Stack>
          {props.data.created_by == user._id ? (
            <Stack className="options">
              <IconButton onClick={handleClick}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    props.onDelete(props.data._id);
                  }}
                >
                  <Delete fontSize="small" sx={{ marginRight: 1 }} />
                  Delete
                </MenuItem>
              </Menu>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
        <Stack>
          <Typography variant="p">{props.data.body}</Typography>
          <Stack direction="row" justifyContent="end">
            <Typography>{date_mongodb_fr}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Comment;
