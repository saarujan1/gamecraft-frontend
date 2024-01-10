import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { handleGameGetall, handleGameUpdate, handleGameSubscribe } from '../services/api';
import { useAuth } from '../helper/authenticator';

function Profile() {
    const [games, setGames] = useState([]);
    const [subscribedGames, setSubscribedGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);
    const { username } = useAuth();
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
  
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await handleGameGetall();
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchSubscribedGames = async () => {
            try {
                const data = await handleGameSubscribe({ username });
                if (data.result) {
                    setSubscribedGames(data.games);
                } else {
                    console.error('Error fetching subscribed games:', data.msg);
                }
            } catch (error) {
                console.error('Error fetching subscribed games:', error.message);
            }
        };

        fetchGames();
        fetchSubscribedGames();
    }, []);

    const gameUpdateForm = (game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
        form.setFieldsValue({
        name : game.name,
        devName : game.devName,
        description : game.description,
        image : game.image,
        options : game.options,
        roadmap : game.roadmap,
        sharePrice : parseFloat(game.sharePrice),
        minThreshold : game.minThreshold,
        revenueSharing : parseInt(game.revenueSharing, 10)
        });
    };

    const onFinish = async (values) => {
        const gameData = {
            id: selectedGame.id,
            name : values.name,
            devName : selectedGame.devName,
            description : values.description,
            image : values.image,
            options : values.options,
            roadmap : values.roadmap,
            sharePrice : parseFloat(values.sharePrice),
            minThreshold : values.minThreshold,
            revenueSharing : parseInt(values.revenueSharing, 10)
        }
        console.log(gameData)
        try {
            setIsLoading(true)
            await handleGameUpdate(gameData);
            message.success('Game details updated successfully!');
        } catch (error) {
            setGames((prevGames) =>
            prevGames.map((game) =>
                game.id === selectedGame.id ? { ...game, ...gameData } : game
            )
            );
            setIsModalOpen(false);
            console.error('Error updating game details:', error);
            message.success('Game details updated successfully!');
        } finally {
            setIsLoading(false)
        }
    }

    // Filter games to include only the user's activity
    const userGames = games.filter((game) => game.devName === username);

    return (
        <div>
        <h1>Welcome back, {username}!</h1>
        <h2>My Games</h2>
        {isLoading ? (
            <Skeleton active />
        ) : (
            <Row gutter={[16, 16]}>
            {userGames.length > 0 ? userGames.map((game) => (
                <Col key={game.id} xs={24} sm={12} md={8} lg={8}>
                <Card
                    title={game.title}
                    cover={<img src={game.image} alt={game.title} />}
                >

                <p>{game.description}</p>
                <p>Share Price: ${game.sharePrice}</p>
                <p>Minimum Threshold: {game.minThreshold}</p>
                <p>Revenue Sharing: {game.revenueSharing}%</p>
                <Button onClick={() => gameUpdateForm(game)}>
                    Change Details
                </Button>
                <Modal title="Update your game details" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
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
            </Modal>
            </Card>
            </Col>
            )) : <p>No games submitted</p>}
            </Row>
        )}
        <h2>Subscribed Games</h2>
        {isLoading ? (
            <Skeleton active />
        ) : (
            <Row gutter={[16, 16]}>
            {subscribedGames.length > 0 ? subscribedGames.map((game) => (
                <Col key={game.id} xs={24} sm={12} md={8} lg={8}>
                <Card
                    title={game.title}
                    cover={<img src={game.image} alt={game.title} />}
                >
                    <p>{game.description}</p>
                </Card>
                </Col>
            )) : <p>No subscribed games</p>}
            </Row>
        )}
        </div>
    );
}

export default Profile;