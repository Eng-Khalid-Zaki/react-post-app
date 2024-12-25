import { useState, useEffect } from "react";
import Modal from "./Modal";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchPosts() {
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  let modalContent;

  if (isPosting) {
    modalContent = (
      <Modal onClose={onStopPosting}>
        <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
      </Modal>
    );
  }

  let postsList;

  if (isFetching) {
    postsList = (
      <div style={{ textAlign: "center", color: "white" }}>
        <h2>Fetching Posts...</h2>
      </div>
    );
  }

  if (!isFetching && posts.length > 0) {
    postsList = (
      <ul className={classes.posts}>
        {posts.map((post) => (
          <Post key={post.body} author={post.author} body={post.body} />
        ))}
      </ul>
    );
  } else if (!isFetching && posts.length === 0) {
    postsList = (
      <div style={{ textAlign: "center", color: "white" }}>
        <h2>There are no posts yet.</h2>
        <p>Start adding some!</p>
      </div>
    );
  }

  return (
    <>
      {modalContent}
      {postsList}
    </>
  );
}

export default PostsList;
