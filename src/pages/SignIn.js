import React, { useState } from 'react';
import { Button, Form, Input, Card, Space, message, Spin } from 'antd';
import { useAuth } from '../helper/authenticator'; 
import { useNavigate } from 'react-router-dom';
import { handleUserRegister } from '../services/api';

const SignIn = () => {
  // State for toggling between Sign In and Sign Up views
  const [isSignIn, setIsSignIn] = useState(true);

  // Destructure properties from useAuth hook
  const { isAuthenticated, signIn, signOut } = useAuth();

  // State for managing loading state during form submission
  const [isLoading, setIsLoading] = useState(false);

  // React Router's navigate function for redirection
  const navigate = useNavigate();

  // Function to toggle between Sign In and Sign Up views
  const toggleView = () => {
    setIsSignIn(!isSignIn);
  };

  // Handler for Sign In form submission
  const onFinishSignIn = async (values) => {
    try {
      setIsLoading(true);
      // Call authentication function from useAuth hook
      await signIn(values.username, values.password);
      // Display success message and redirect to the Discover page
      message.success('Sign in successful!');
      navigate('/discover');
    } catch (error) {
      // Display error message if Sign In fails
      message.error('Sign in failed. Please check your credentials and try again.');
    } finally {
      // Set loading state to false after form submission
      setIsLoading(false);
    }
  };

  const onFinishFailedSignIn = (errorInfo) => {
    message.error('Sign in Failed: ' + errorInfo);
  };

  // Handler for Sign Up form submission
  const onFinishSignUp = async (values) => {
    try {
      setIsLoading(true);
      // Prepare user data for registration
      const userData = {
        username: values.username,
        password: values.password,
      };
      // Call API to register user
      await handleUserRegister(userData);
      // Display success message and switch to Sign In view
      message.success('Registration successful!');
      setIsSignIn(true);
    } catch (error) {
      // Display error message if registration fails
      message.error('An error occurred during registration. Please try again.');
    } finally {
      // Set loading state to false after form submission
      setIsLoading(false);
    }
  };

  const onFinishFailedSignUp = (errorInfo) => {
    message.error('Registration Failed: ' + errorInfo);
  };

  // Render the component differently based on user authentication and loading state
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

  // Render the Sign In or Sign Up form based on the current view
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
