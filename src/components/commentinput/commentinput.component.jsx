import { AddCircle } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Rating,
  IconButton,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
const CommentInput = (props) => {
  return (
    <Stack spacing={2}>
      <FormControl>
      <InputLabel color="success" htmlFor="comment-input">Votre Commentaire</InputLabel>
        <OutlinedInput
          multiline
          color="success"
          name="comment-input"
          placeholder="Comment vous trouvez la recette ?"
          onChange={props.onHandleChange}
          value={props.commentValue}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                variant="outlined"
                color="success"
                onClick={props.onHandleAdd}
                edge="end"
              >
                <AddCircle />
              </IconButton>
            </InputAdornment>
          }
          label="Votre Commentaire"
        ></OutlinedInput>
      </FormControl>
    </Stack>
  );
};

export default CommentInput;
