import React from "react";
import { Form, Input, message } from "antd";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  //Dispact
  const dispatch = useDispatch();

  //use Naviagte
  const navigate = useNavigate();

  //Form Handler
  const onfinishHandler = async (values) => {
    //Integration with backend
    try {
      dispatch(showLoading());
      const res = await axios.post(`/api/v1/user/register`, values);
      dispatch(hideLoading());
      if (res && res.data.success) {
        message.success("Successfully registered");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
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
          <h3 className="text-center">Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already user login here..
          </Link>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
