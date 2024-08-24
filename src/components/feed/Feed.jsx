import React, { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import "./feed.css";
import Post from "../post/Post";
import axios from "axios";
import { BaseUrl } from "../../config";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username, home }) => {
  const [posts, setPosts] = useState([]);
  const currUser = useContext(AuthContext);
  const user = currUser.user.user;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // console.log(userId);
        const res = home
          ? await axios.get(`${BaseUrl}post/timeline/${user._id}`)
          : await axios.get(`${BaseUrl}post/profile/${username._id}`);

        setPosts(
          res.data.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [username, user._id, home]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {username._id === user._id && <Share />}
        {posts.length == 0 ? (
          <span className="noPostText"> No posts.</span>
        ) : (
          posts.map((curr) => {
            return <Post key={curr._id} post={curr} />;
          })
        )}
      </div>
    </div>
  );
};

export default Feed;
