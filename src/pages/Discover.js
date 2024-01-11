import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton, Button, Modal, List } from 'antd';
import { handleGameGetall } from '../services/api';
import { PlusOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { useAuth } from '../helper/authenticator';

const Discover = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useAuth();
  const [subscribedGames, setSubscribedGames] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await handleGameGetall();
        setGames(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleOptionsModalCancel = () => {
    setIsOptionsModalVisible(false);
  };

  const getAllDetails = (game) => {
    setSelectedGame(game);
    setIsModalVisible(true);
  }

  const showOptions = (game) => {
    setSelectedGame(game);
    setIsOptionsModalVisible(true);
  }

  const handleUpvote = (optionId) => {
    // Upvote functionality here
  };

  const handleDownvote = (optionId) => {
    // Downvote functionality here
  };
  
  const OptionsModal = () => (
    <Modal
      title="Game Options"
      visible={isOptionsModalVisible}
      onCancel={handleOptionsModalCancel}
      footer={null}
    >
      {selectedGame && (
        <List
          dataSource={selectedGame.options}
          renderItem={(option, index) => (
            <List.Item key={index}>
              {option}
              <div style={{ marginLeft: 'auto' }}>
                <Button icon={<UpOutlined />} onClick={() => handleUpvote(index)}>Upvote</Button>
                <Button icon={<DownOutlined />} onClick={() => handleDownvote(index)} style={{ marginLeft: '10px' }}>Downvote</Button>
              </div>
            </List.Item>
          )}
        />
      )}
    </Modal>
  );

  const GameModal = () => (
    <Modal
      title={selectedGame ? selectedGame.name : 'Game Details'}
      visible={isModalVisible}
      onCancel={handleModalCancel}
      footer={null}
    >
      {selectedGame && (
        <>
          <p>Developer: {selectedGame.devName}</p>
          <p>Description: {selectedGame.description}</p>
          <p>Roadmap: {selectedGame.roadmap}</p>
          <p>Share Price: ${selectedGame.sharePrice}</p>
          <p>Minimum Threshold: {selectedGame.minThreshold}</p>
          <p>Revenue Sharing: {selectedGame.revenueSharing}%</p>
        </>
      )}
    </Modal>
  );

  const handleSubscribeClick = async (gameId) => {

  };

   return (
    <div>
      <h1>Discover Games</h1>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Row gutter={[16, 16]}>
          {games.map((game) => (
            <Col key={game.id} xs={24} sm={12} md={8} lg={8}>
              <Card
                title={
                  <>
                    {game.name}
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{ marginLeft: 8 }}
                      onClick={() => handleSubscribeClick(game.id)}
                    />
                  </>
                }
                cover={<img src={game.image} />}
              >
                <p>{game.description}</p>
                <p>Developer: {game.devName}</p>
                <p>Share Price: ${game.sharePrice}</p>
                <p>Revenue Sharing: {game.revenueSharing}%</p>
                <Button onClick={() => getAllDetails(game)}>Read more</Button>
                <Button style={{ marginTop: '8px' }} onClick={() => showOptions(game)}>Options</Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <GameModal />
      <OptionsModal />
    </div>
  );
};

export default Discover;
