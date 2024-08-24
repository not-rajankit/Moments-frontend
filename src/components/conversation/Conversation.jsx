import React, { useEffect, useState } from "react";
import "./conversation.css";
import { BaseUrl } from "../../config";
import axios from "axios";

const Conversation = ({ conversation, currUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currUser._id);
    // console.log("Current User ID:", currUser?._id);
    // console.log("Friend ID:", friendId);
    const getUser = async () => {
      try {
        const res = await axios(`${BaseUrl}users?userId=${friendId}`);
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currUser, conversation]);
  return (
    <>
      <div className="conversation">
        <img
          className="conversationImg"
          src={
            user && user.profilePicture
              ? user.profilePicture
              : PF + "/person/noAvatar.png"
          }
          alt=""
        ></img>
        <span className="conversationName">{user && user.username}</span>
      </div>
    </>
  );
};

export default Conversation;
