import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListItems.scss";
import Avatar from "../Avatar";

const ListItems = ({ item: { avatar_url, login, id } }) => {
  const navigate = useNavigate();
  const handleClickDetail = (id) => {
    navigate(`/user-detail/${id}`);
  };
  return (
    <div
      className="component__list-items"
      onClick={() => handleClickDetail(login)}
    >
      <div className="split">
        <div className="container-info-user">
          <div>
            <Avatar url={avatar_url} />
          </div>
          <div className="center-text">
            <div>
              <h3 className="text-info">{`${login}`}</h3>
              <p className="text-info">{`id: ${id}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
