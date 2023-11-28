import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import axios from "axios";
import "./PageStyle/Apply.css";
// import { showLoading, hideLoading } from "../redux/features/alertSlice";
// import { useDispatch } from "react-redux";

const ApplyDoctor = () => {
  const finishHandler = async (values) => {
    // console.log(values);

    try {
      const res = await axios.post(`/api/v1/user/applydoctor`, values);
      if (res && res.data.success) {
        message.success("Application submitted successfully");
      } else {
        message.error(res.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      message.error("Something went wrong. Please try again later.");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={finishHandler} className="m-3">
        <h4 className="">Personals Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone no"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your phone no" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Website"
              name="website"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your clinic address" />
            </Form.Item>
          </Col>
        </Row>

        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per consultation"
              name="feesPerconsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your consultation fee" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              required
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary doctor-form-btn">
                Submit
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
