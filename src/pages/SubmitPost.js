import React, { useState } from 'react';
import { Button, Form, Input, Spin, message } from 'antd';
import { handleGameSubmit } from '../services/api';

const SubmitPost = () => {

    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}>
        <h1>Create a Game</h1> 
        <SubmitGamePost/>
      </div>
    );
};

function SubmitGamePost() {

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    const gameData = {
      name : values.name,
      devName : values.devName,
      description : values.description,
      image : values.image,
      options : values.options,
      roadmap : values.roadmap,
      sharePrice : parseFloat(values.sharePrice),
      minThreshold : values.minThreshold,
      revenueSharing : parseInt(values.revenueSharing, 10)
    }
    try {
      setIsLoading(true)
      await handleGameSubmit(gameData);
      message.success('Game successfuly submitted!');
    } catch (error) {
      console.log(error)
      message.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Sign in Failed:', errorInfo);
  };

  if (isLoading) {
    return <Spin />;
  }

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
        name="name"
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
          },
          {
            min: 15,
            message: 'Description should be at least 15 letters long.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="image"
        name="image"
        rules={[
          {
            required: true,
            message: 'Please input your image!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="options"
        name="options"
        rules={[
          {
            required: true,
            message: 'Please input options!',
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
            message: 'Please input roadmap!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="share price"
        name="sharePrice"
        rules={[
          {
            required: true,
          },
          {
            validator: (_, value) => {
              const numericValue = parseFloat(value);
              if (isNaN(numericValue)) {
                return Promise.reject(new Error('Share price must be a valid number!'));
              } else if (numericValue <= 0.1) {
                return Promise.reject(new Error('Share price must be greater than 0.1!'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="minThreshold"
        name="minThreshold"
        rules={[
          {
            required: true,
            message: 'Please input minimum threshold!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="revenueSharing"
        name="revenueSharing"
        rules={[
          {
            required: true,
          },
          {
            validator: (_, value) => {
              const numericValue = parseFloat(value);
              if (isNaN(numericValue)) {
                return Promise.reject(new Error('Revenue sharing must be a valid number!'));
              } else if (numericValue <= 10) {
                return Promise.reject(new Error('Revenue sharing must be greater than 10!'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
        style={{
          textAlign: 'center',
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
