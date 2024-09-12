import React, { useContext } from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const { user: currUser, dispatch } = useContext(AuthContext);
  const user = currUser.user;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="logo">Moments</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          <input
            placeholder="Search for people, videos, posts..."
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <span className="topbarLink">Homepage</span> */}
          <span className="topbarLink" onClick={() => handleLogout()}>
            Logout
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <i className="fa-solid fa-user"></i>
            <span className="topbarIconBadge">1</span>
          </div>
          <div
            className="topbarIconItem"
            onClick={() => navigate("/messenger")}
          >
            <i className="fa-solid fa-message"></i>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <i className="fa-solid fa-bell"></i>
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`https://moments-frontend-sepia.vercel.app/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              className="topbarImg"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
