import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./DetailUser.scss";
import { usersDetailInit } from "../../store/users/actions";
import {
  isLoginUsersDetailSelector,
  UsersDetailSelector,
} from "../../store/users/selectors";
import Avatar from "../../components/Avatar";

const UserDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoginUsersDetailSelector);
  const userDetail = useSelector(UsersDetailSelector);

  useEffect(() => {
    if (location?.pathname) {
      const userId = location.pathname.replace("/user-detail/", "");
      dispatch(usersDetailInit(userId));
    }
  }, [location, dispatch]);

  return (
    <div className="component__user-detail">
      {isLoading ? (
        <div>Cargando información</div>
      ) : (
        <div className="container-info-user">
          <div className="center-image">
            <Avatar url={userDetail.avatar_url} userDetail />
          </div>
          <div className="container-user-description">
            <h3>{`${userDetail.name}`}</h3>
            <h3>{`${userDetail.location}`}</h3>
            <h3>{`followers: ${userDetail.name}`}</h3>
            <h3>{`following: ${userDetail.name}`}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
