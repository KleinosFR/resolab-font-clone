import React from "react";
import SendIcon from "@material-ui/icons/Send";
import { TextField, InputAdornment } from "@material-ui/core";

const CommentInput = ({
  value,
  onChange,
  inputComment,
  isError,
  helperText
}) => {
  return (
    <TextField
      error={isError}
      helperText={helperText}
      value={value}
      onChange={onChange}
      label=""
      placeholder="Ajouter un commentaire"
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SendIcon style={{ cursor: "pointer" }} onClick={inputComment} />
          </InputAdornment>
        )
      }}
    />
  );
};

export default CommentInput;
