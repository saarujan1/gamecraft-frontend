import React, { useState } from 'react';
import { Button, Form, Input, Spin, message, Card } from 'antd';
import { handleGameSubmit } from '../services/api';
import { useAuth } from '../helper/authenticator'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const SubmitPost = () => {
  const { isAuthenticated, username, signIn, signOut } = useAuth();

  console.log('USERNAME:' , username)

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
  console.log('DEVNAME:' , devName)


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