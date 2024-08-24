import React from "react";
import "./sidebar.css";
import CloseFriends from "../closeFriends/CloseFriends";
import { Users } from "../../dummy_data";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li
            className="sidebarListItem"
            onClick={() => navigate("/messenger")}
          >
            <i className="fa-regular fa-message sidebarIcon"></i>
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-circle-play sidebarIcon"></i>
            <span className="sidebarListItemText">Watch</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-regular fa-circle-question sidebarIcon"></i>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-bookmark sidebarIcon"></i>
            <span className="sidebarListItemText">Saved</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-calendar-day sidebarIcon"></i>
            <span className="sidebarListItemText">Event</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-clock-rotate-left sidebarIcon"></i>
            <span className="sidebarListItemText">Memories</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((curr) => {
            return <CloseFriends key={curr.id} user={curr} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
