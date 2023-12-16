import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const BlogsList = ({ blogs, onDelete, onEdit }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <Typography variant="h5" component="h2" align="center">
        No blogs available.
      </Typography>
    );
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {blogs.map((blog) => (
        <Card key={blog.id} style={{ width: 300 }}>
          <CardMedia
            component="img"
            height="140"
            image={blog.imagePath}
            alt={blog.title}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {blog.content}
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              Posted on: {new Date(blog.datePosted).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              By: {blog.authorName}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => onEdit(blog)}>Edit</Button>
            <Button size="small" onClick={() => onDelete(blog.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default BlogsList;
