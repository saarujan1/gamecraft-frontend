import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import { handleGameGetall } from '../services/api';
import { useAuth } from '../helper/authenticator';

function Profile() {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { username } = useAuth();

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

    // Filter games to include only the user's activity
    const userGames = games.filter((game) => game.devName === username);

    return (
        <div>
        <h1>Profile Page</h1>
        <h2>My Games</h2>
        {isLoading ? (
            <Skeleton active />
        ) : (
            <Row gutter={[16, 16]}>
            {userGames.map((game) => (
                <Col key={game.id} xs={24} sm={12} md={8} lg={8}>
                <Card
                    title={game.title}
                    cover={<img src={game.image} alt={game.title} />}
                >
                    <p>{game.description}</p>
                </Card>
                </Col>
            ))}
            </Row>
        )}
        </div>
    );
}

export default Profile;