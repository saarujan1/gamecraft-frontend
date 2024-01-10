import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton, Button } from 'antd';
import { handleGameGetall } from '../services/api';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../helper/authenticator';

const Discover = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useAuth();
  const [subscribedGames, setSubscribedGames] = useState([]);

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

  const handleSubscribeClick = async (gameId) => {
   /* // Find the game with the given ID
    const game = games.find(game => game.id === gameId);

    try {
      const data = await handleGameSubscribe({
          username: username,
          game_id: gameId,
      });

        if (data.result) {
          setSubscribedGames(prevGames => [...prevGames, game]);
      } else {
          console.error('Error subscribing to game:', data.msg);
      }
  } catch (error) {
      console.error('Error subscribing to game:', error.message);
  }
  */
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
