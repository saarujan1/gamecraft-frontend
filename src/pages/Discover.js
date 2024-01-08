import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import { handleGameGetall } from '../services/api';

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
  
    return (
      <div>
        <h1>Discover Games</h1>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <Row gutter={[16, 16]}>
            {games.map((game) => (
              <Col key={game.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  title={game.name}
                  cover={<img alt={game.name} src={game.image} />}
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