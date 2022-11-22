import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./Dashboard.scss";
import ListItems from "../../components/ListItems";
import { usersListInit, usersSearchInit } from "../../store/users/actions";
import {
  isLoginUsersListSelector,
  usersListSelector,
  isLoginFollowersSelector,
  UsersFollowersSelector,
} from "../../store/users/selectors";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoginUsersListSelector);
  const usersList = useSelector(usersListSelector);
  const isLoginFollowers = useSelector(isLoginFollowersSelector);
  const UsersFollowers = useSelector(UsersFollowersSelector);

  useEffect(() => {
    dispatch(usersListInit(true));
  }, [dispatch]);

  const handleClickSearch = (values) => {
    if (values.search.length) dispatch(usersSearchInit(values.search));
    else dispatch(usersListInit());
  };

  return (
    <div className="component__dashboard">
      {isLoginFollowers ? null : (
        <div>
          <LineChart width={600} height={300} data={UsersFollowers}>
            <Line type="monotone" dataKey="followers" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      )}
      <div className="container-home">
        <Formik
          initialValues={{ search: "" }}
          validationSchema={Yup.object({
            search: Yup.string()
              .min(4, "Debe tener mínimo 4 caracteres*")
              .test("iseijasunow", "Palabra no permitida*", function (v) {
                // Don't use arrow functions
                return v !== "iseijasunow";
              }),
          })}
          onSubmit={handleClickSearch}
        >
          {({ handleChange, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <input id="search" name="search" onChange={handleChange} />
                    <button type="submit">Buscar</button>
                  </div>
                  <ErrorMessage
                    className="validation-error-message"
                    name="search"
                    component="div"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="container-list">
          {isLoading ? (
            <div className="loading-info">Cargando información</div>
          ) : (
            usersList?.map((item, key) => {
              return <ListItems item={item} key={key} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
