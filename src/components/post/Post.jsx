import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { BaseUrl } from "../../config";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currUser_ } = useContext(AuthContext);
  const currUser = currUser_.user;
  useEffect(() => {
    setIsLiked(post.likes.includes(currUser._id));
  }, [currUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${BaseUrl}users?userId=${post.userId}`);
      // console.log(res.data.data);
      setUser(res.data.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      // console.log(currUser._id);
      axios.put(`${BaseUrl}post/${post._id}/like`, { userId: currUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture || PF + "person/noAvatar.png"}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <TimeAgo date={post.createdAt} className="postDate" />
          </div>
          <div className="postTopRight">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postShareButton">Share</span>
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
