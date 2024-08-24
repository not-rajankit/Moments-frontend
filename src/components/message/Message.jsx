import React from "react";
import "./message.css";
import TimeAgo from "react-timeago";

const Message = ({ message, own }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={PF + "/person/noAvatar.png"} alt="" />
        <p className="messageText">{message && message.text}</p>
      </div>
      <div className="messageBottom">
        {message && <TimeAgo date={message.createdAt} />}
      </div>
    </div>
  );
};

export default Message;
