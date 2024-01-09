import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton, Button } from 'antd';
import { handleGameGetall } from '../services/api';
import { PlusOutlined } from '@ant-design/icons';

const Discover = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSubscribeClick = (gameId) => {
    // Implement your logic for subscribing to a game
    console.log(`Subscribe clicked for game ID: ${gameId}`);
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
                cover={<img src={game.image} alt={game.name} />}
              >
                <p>{game.description}</p>
                <p>Developer: {game.devName}</p>
                <p>Share Price: ${game.sharePrice}</p>
                <p>Minimum Threshold: {game.minThreshold}</p>
                <p>Revenue Sharing: {game.revenueSharing}%</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Discover;
