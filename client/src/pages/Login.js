import React from "react";
import { Form, Input, message } from "antd";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  //Dispact
  const dispatch = useDispatch();
  //use Naviagte
  const navigate = useNavigate();

  const onfinishHandler = async (values) => {
    // Integration with backend
    try {
      dispatch(showLoading()); //loading
      const res = await axios.post(`/api/v1/user/login`, values);
      dispatch(hideLoading()); //hiding
      if (res && res.data.success) {
        message.success("Login Successfully");
        navigate("/");
        localStorage.setItem("token", res.data.token);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      //hiding the loading
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-from"
        >
          <h3 className="text-center">Login Form</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="m-2">
            Not a user? Register here.
          </Link>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
