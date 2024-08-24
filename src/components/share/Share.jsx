import React, { useContext, useRef, useState } from "react";
import "./share.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BaseUrl } from "../../config";
// import EmojiPicker from "emoji-picker-react";

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currUser = useContext(AuthContext);
  const { user } = currUser.user;
  const desc = useRef();
  const [image, setImage] = useState(null);
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const handleEmojiClick = (event, emojiObject) => {
  //   desc.current.value += emojiObject.emoji;
  //   setShowEmojiPicker(false);
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      // img: image || "",
    };
    try {
      await axios.post(`${BaseUrl}post`, newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const convertToBase64 = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <Link to={`http://localhost:3000/profile/${user.username}`}>
            <img
              src={user.profilePicture || PF + "person/noAvatar.png"}
              className="shareProfileImg"
              alt=""
            />
          </Link>
          <input
            placeholder={`What's in your mind ${user.username}...`}
            type="text"
            ref={desc}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        {image && (
          <div className="shareImgContainer">
            <img src={image} className="shareImg" alt="" />
            <i
              className="fa-solid fa-xmark shareCancelImg"
              onClick={() => setImage(null)}
            ></i>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <i className="fa-solid fa-photo-film shareIcon"></i>
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={convertToBase64}
              />
            </label>
            <div className="shareOption">
              <i className="fa-solid fa-tag shareIcon"></i>
              <span className="shareOptionText">Tag Friend</span>
            </div>
            <div className="shareOption">
              <i
                className="fa-solid fa-face-smile shareIcon"
                // onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              ></i>
              <span className="shareOptionText emojiIcon">
                Feelings/Activity
              </span>
            </div>
            {/* {showEmojiPicker && (
              <div className="emojiPicker">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )} */}
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
