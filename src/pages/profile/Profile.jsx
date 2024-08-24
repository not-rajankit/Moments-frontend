import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { BaseUrl } from "../../config";

const Profile = () => {
  const [user, setUser] = useState(null);

  const { username } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      // console.log(user.username);
      const res = await axios.get(`${BaseUrl}users?username=${username}`);
      setUser(res.data.data);
      // console.log(res.data.data);
    };
    fetchUser();
  }, [username]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={(user && user.coverPicture) || PF + "person/noCover.jpg"}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  (user && user.profilePicture) || PF + "person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              {user && <h4 className="profileInfoName">{user.username}</h4>}
              {user && <span className="profileInfoDesc">{user.desc}</span>}
            </div>
          </div>
          <div className="profileRightBottom">
            {user && <Feed username={user} />}
            {user && <Rightbar user={user} profile="1" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
