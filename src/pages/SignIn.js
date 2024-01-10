import React, { useState } from 'react';
import { Button, Form, Input, Card, Space, message, Spin } from 'antd';
import { useAuth } from '../helper/authenticator'; 
import { useNavigate } from 'react-router-dom';
import { handleUserRegister } from '../services/api';

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { isAuthenticated, signIn, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleView = () => {
    setIsSignIn(!isSignIn);
  };

  const onFinishSignIn = async (values) => {
    try {
      setIsLoading(true);
      message.success('Sign in successful!');
      navigate('/discover');
    } catch (error) {
      message.error('An error occurred during sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailedSignIn = (errorInfo) => {
    message.error('Sign in Failed: ' + errorInfo);
  };

  const onFinishSignUp = async (values) => {
    try {
      setIsLoading(true)
      const userData = {
        username: values.username,
        password: values.password,
      };
      await handleUserRegister(userData);
      message.success('Registration successful!');
      setIsSignIn(true); // Switch to the sign-in form after successful registration
    } catch (error) {
      message.error('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false)
    }
  };


  const onFinishFailedSignUp = (errorInfo) => {
    message.error('Registration Failed: ' + errorInfo);
  };

  if (isAuthenticated) {
    return (
      <div>
        <p>You are logged in!</p>
        <Button onClick={signOut}>Sign Out</Button>
      </div>
    );
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Space direction="vertical" size={16}>
      <Card title={isSignIn ? 'Sign in' : 'Sign up'} style={{ width: 400 }}>
        {isSignIn ? (
          <>
            <Form
              name="signInForm"
              initialValues={{ remember: true }}
              onFinish={onFinishSignIn}
              onFinishFailed={onFinishFailedSignIn}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <p>
              New to GameCraft?{' '}
              <a href="#" onClick={toggleView}>
                Sign up
              </a>
            </p>
          </>
        ) : (
          <>
            <Form
              name="signUpForm"
              initialValues={{ remember: true }}
              onFinish={onFinishSignUp}
              onFinishFailed={onFinishFailedSignUp}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
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

export default SignIn;