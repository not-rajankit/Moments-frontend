import React, { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";
import { BaseUrl } from "../../config";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${BaseUrl}users/friends/${currentId}`);
      setFriends(res.data.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);
  useEffect(() => {
    console.log(onlineUsers);
  }, [onlineUsers]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `${BaseUrl}conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          className="chatOnlineFriend"
          key={o._id}
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={
                o.profilePicture
                  ? o.profilePicture
                  : PF + "/person/noAvatar.png"
              }
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
