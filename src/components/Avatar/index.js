import React from "react";
import "./Avatar.scss";

const Avatar = ({ url, userDetail }) => {
  return (
    <div className="component__avatar">
      <img
        className={`${userDetail ? "user-detail" : "list"}`}
        src={url}
        alt={`profile${url}`}
      />
    </div>
  );
};

export default Avatar;
