import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList() {
  const posts = useLoaderData();

  let postsList;

  if (posts.length > 0) {
    postsList = (
      <ul className={classes.posts}>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            body={post.body}
          />
        ))}
      </ul>
    );
  } else if (posts.length === 0) {
    postsList = (
      <div style={{ textAlign: "center", color: "white" }}>
        <h2>There are no posts yet.</h2>
        <p>Start adding some!</p>
      </div>
    );
  }

  return <>{postsList}</>;
}

export default PostsList;
