import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Card, Space } from 'antd';

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleView = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Space direction="vertical" size={16}>
      <Card title={isSignIn ? 'Sign in' : 'Sign up'} style={{ width: 400 }}>
        {isSignIn ? (
          <>
            <SignInForm />
            <p>
              New to GameCraft?{' '}
              <a href="#" onClick={toggleView}>
                Sign up
              </a>
            </p>
          </>
        ) : (
          <>
            <SignUpForm />
            <p>
              Already have an account?{' '}
              <a href="#" onClick={toggleView}>
                Sign in
              </a>
            </p>
          </>
        )}
      </Card>
    </Space>
  );
};

function SignInForm() {
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
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

function SignUpForm() {
    //send to api
  const onFinishRegister = (values) => {
    console.log('Sign up Success:', values);
  };

  const onFinishFailedRegister = (errorInfo) => {
    console.log('Sign up Failed:', errorInfo);
  };

  return (
    <Form
      name="signUpForm"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishRegister}
      onFinishFailed={onFinishFailedRegister}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignIn;
