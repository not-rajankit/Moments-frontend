import React, { useEffect, useState, useRef } from "react";
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { AuthContext } from "../../context/AuthContext";
import { BaseUrl } from "../../config";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const newMessage = useRef();
  const scrollRef = useRef();
  // const { user: currUser } = useContext(AuthContext);
  const currUser = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    socket.current = io("https://moments-socket.vercel.app/");

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currUser.user._id);
    socket.current.on("getUser", (users) => {
      setOnlineUsers(
        currUser.user.followings.filter((f) =>
          users.some((u) => u.userId === f)
        )
      );
    });
  }, [currUser.user._id]);

  // useEffect(() => {
  //   socket.current.on("welcome", (message) => {
  //     console.log(message);
  //   });
  // }, [socket]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          `${BaseUrl}conversations/${currUser.user._id}`
        );
        setConversation(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [currUser.user._id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(`${BaseUrl}messages/${currentChat?._id}`);
        setMessages(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat]);
  // console.log(messages);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currUser.user._id,
      conversationId: currentChat._id,
      text: newMessage.current.value,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== currUser.user._id
    );
    socket.current.emit("sendMessage", {
      senderId: currUser.user._id,
      receiverId: receiverId,
      text: newMessage.current.value,
    });
    try {
      const res = await axios.post(BaseUrl + "messages", message);
      setMessages((prev) => [...prev, res.data.data]);
      newMessage.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(messages);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversation.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation
                  key={c._id}
                  conversation={c}
                  currUser={currUser.user}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message
                        key={m._id}
                        message={m}
                        own={m.senderId === currUser.user?._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Message"
                    ref={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                {currUser.user.username}, Open a conversation to see your
                previous chats.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <h4 className="onlineFriendsTitle">Online Friends</h4>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={currUser.user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
