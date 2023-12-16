import { useState, useEffect } from "react";
import { ImageUpload } from "src/components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const BlogDialog = ({ open, onClose, onSubmit, initialData = null }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [files, setPhotos] = useState([]);
  const [content, setContent] = useState(
    initialData ? initialData.content : ""
  );
  const [authorName, setAuthorName] = useState(
    initialData ? initialData.authorName : ""
  );
  const [showOnHomepage, setShowOnHomepage] = useState(
    initialData ? !initialData.isHidden : false
  );

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setAuthorName(initialData.authorName);
      setShowOnHomepage(!initialData.isHidden);
      setShowOnHomepage(!initialData.isHidden);
      //setPhotos(!initialData.files)
    } else {
      setTitle("");
      setContent("");
      setAuthorName("");
      setShowOnHomepage(false);
      //setPhotos([])
    }
  }, [initialData]);

  const resetState = () => {
    setTitle("");
    setPhotos([]);
    setContent("");
    setAuthorName("");
    setShowOnHomepage(false);
  };

  const handleSubmit = () => {
    if (title && files.length && content && authorName) {
      onSubmit({
        title,
        files,
        content,
        datePosted: new Date(),
        authorName,
        isHidden: !showOnHomepage,
      });
      handleClose();
    } else {
      alert("Please fill all required fields.");
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Blog</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="dense"
          label="Content"
          multiline
          rows={10}
          rowsMax={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="dense"
          label="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showOnHomepage}
              onChange={() => setShowOnHomepage((prev) => !prev)}
            />
          }
          label="Show on Home Page"
        />
        <ImageUpload files={files} setPhotos={setPhotos} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlogDialog;
