import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import axios from "axios";
import { BaseUrl } from "../../config";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Rightbar = ({ user, profile }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(
    currUser.user.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `${BaseUrl}users/friends/${user?._id}`
        );
        setFriends(friendList.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user._id]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(`${BaseUrl}users/${user._id}/unfollow`, {
          userId: currUser.user._id,
        });
        dispatch({ type: "UNFOLLOW", payload: currUser.user._id });
      } else {
        await axios.put(`${BaseUrl}users/${user._id}/follow`, {
          userId: currUser.user._id,
        });
        dispatch({ type: "FOLLOW", payload: currUser.user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const ForHomePage = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Dost</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.jpeg" alt="" />
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((u) => (
            <Link
              key={u._id}
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/profile/" + u.username}
            >
              <Online key={u._id} user={u} />
            </Link>
          ))}
        </ul>
      </>
    );
  };

  const ForProfilePage = () => {
    return (
      <>
        {user.username !== currUser.user.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            <span>{followed ? "Unfollow" : "Follow"}</span>
            {followed ? (
              <i className="fa-solid fa-minus"></i>
            ) : (
              <i className="fa-solid fa-plus"></i>
            )}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <div className="rightbarInfoKey">City:</div>
            <div className="rightbarInfoValue">{user.city}</div>
          </div>
          <div className="rightbarInfoItem">
            <div className="rightbarInfoKey">From:</div>
            <div className="rightbarInfoValue">{user.from}</div>
          </div>
          <div className="rightbarInfoItem">
            <div className="rightbarInfoKey">Relationship:</div>
            <div className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "--"}
            </div>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.length > 0 &&
            friends.map((friend) => (
              <Link
                key={friend._id}
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/profile/" + friend.username}
              >
                <div key={friend._id} className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ForProfilePage /> : <ForHomePage />}
      </div>
    </div>
  );
};

export default Rightbar;
