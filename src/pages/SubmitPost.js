import React, { useState } from 'react';
import { Button, Form, Input, Spin, message, Card } from 'antd';
import { handleGameSubmit } from '../services/api';
import { useAuth } from '../helper/authenticator'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const SubmitPost = () => {
    // Destructure properties from useAuth hook
  const { isAuthenticated, username, signIn, signOut } = useAuth();

  console.log('USERNAME:' , username)

  // Display a card with the SubmitGamePost component
    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}>
        <h1>Create a Game</h1> 
          <Card style={{ width: '60vh'}}>
          <SubmitGamePost devName={username} />
        </Card>
      </div>
    );
};

function SubmitGamePost({ devName }) {
  
  // State hook to manage loading state
  console.log('DEVNAME:' , devName)

  // Handler for form submission
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    const gameData = {
      name : values.name,
      devName : devName,
      description : values.description,
      image : values.image,
      options: values.options || [],
      roadmap : values.roadmap,
      sharePrice : parseFloat(values.sharePrice),
      minThreshold : values.minThreshold,
      revenueSharing : parseInt(values.revenueSharing, 10)
    }

    try {
      // Set loading state to true during submission
      setIsLoading(true);

      // Call API to submit game data
      await handleGameSubmit(gameData);

      // Display success message
      message.success('Game successfully submitted!');
    } catch (error) {
      console.log(error);
      // Display error message if submission fails
      message.error('An error occurred. Please try again.');
    } finally {
      // Set loading state to false after submission (whether successful or not)
      setIsLoading(false);
    }
  };

  // Handler for form submission failure
  const onFinishFailed = (errorInfo) => {
    console.log('Sign in Failed:', errorInfo);
  };

  // Display a spinner while loading
  if (isLoading) {
    return <Spin />;
  }

  return (
    <Form
      name="signInForm"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 700
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
        <Input.TextArea/>
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
      <Form.List name="options">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                required={index === 0}
                key={field.key}
                label={index === 0 ? 'Options' : ''}
                style={{ marginBottom: 0 }}
              >
                <Form.Item {...field} rules={[{ required: true, message: 'Please input an option or delete this field.' }]} noStyle>
                  <Input placeholder="game option" style={{ width: '90%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                ) : null}
              </Form.Item>
            ))}
            {fields.length < 3 && (
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{ width: '50%' }}>
                  Add Option
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
      
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