import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton, Button, Modal } from 'antd';
import { handleGameGetall } from '../services/api';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../helper/authenticator';

const Discover = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useAuth();
  const [subscribedGames, setSubscribedGames] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

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

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const getAllDetails = (game) => {
    setSelectedGame(game);
    setIsModalVisible(true);
  }

  const GameModal = () => (
    <Modal
      title={selectedGame ? selectedGame.name : 'Game Details'}
      visible={isModalVisible}
      onCancel={handleModalCancel}
      footer={null}
    >
      {selectedGame && (
        <div>
          <p>Developer: {selectedGame.devName}</p>
          <p>Description: {selectedGame.description}</p>
          <p>Options: {selectedGame.options}</p>
          <p>Roadmap: {selectedGame.roadmap}</p>
          <p>Share Price: ${selectedGame.sharePrice}</p>
          <p>Minimum Threshold: {selectedGame.minThreshold}</p>
          <p>Revenue Sharing: {selectedGame.revenueSharing}%</p>
          {/* Add more details as needed */}
        </div>
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
                    >
                    </Button>
                  </>
                }
                cover={<img src={game.image} />}
              >
                <p>{game.description}</p>
                <p>Developer: {game.devName}</p>
                <p>Share Price: ${game.sharePrice}</p>
                <p>Revenue Sharing: {game.revenueSharing}%</p>
                <Button onClick={() => getAllDetails(game)}>
                    Read more
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

      )}
      <GameModal />
    </div>
  );
};

export default Discover;
