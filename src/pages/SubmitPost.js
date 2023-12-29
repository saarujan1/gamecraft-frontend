import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

const SubmitPost = () => {

    return (
    <div>
       <SubmitGamePost/>
    </div>
    );
};

function SubmitGamePost() {
    //send to api
  const onFinish = (values) => {
    console.log('Sign in Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Sign in Failed:', errorInfo);
  };

  return (
    <Form
      name="signInForm"
      labelCol={{
        span: 9,
      }}
      wrapperCol={{
        span: 18,
      }}
      style={{
        maxWidth: 700,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="game name"
        name="gameName"
        rules={[
          {
            required: true,
            message: 'Please input your game name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="developer name"
        name="devName"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your game description!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="roadmap"
        name="roadmap"
        rules={[
          {
            required: true,
            message: 'Please input your roadmap!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="shareprice"
        name="shareprice"
      >
        <Input />
      </Form.Item>
      

      <Form.Item
        wrapperCol={{
          offset: 9,
          span: 18,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SubmitPost;
