import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import { handleGameGetall } from '../services/api';
import { useAuth } from '../helper/authenticator';

function Profile() {
    const [games, setGames] = useState([]);
    const [subscribedGames, setSubscribedGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { username } = useAuth();

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
            {userGames.length > 0 ? userGames.map((game) => (
                <Col key={game.id} xs={24} sm={12} md={8} lg={8}>
                <Card
                    title={game.title}
                    cover={<img src={game.image} alt={game.title} />}
                >
                    <p>{game.description}</p>
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