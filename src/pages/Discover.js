import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton, Button, Modal, List, message } from 'antd';
import { handleGameGetall, handleGameSubscribe} from '../services/api';
import { LikeOutlined, DislikeOutlined, PlusOutlined} from '@ant-design/icons';

const Discover = () => {
  // State hooks for managing component state
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [usernameLocal, setUsernameLocal] = useState(localStorage.getItem('username'));
  const [votes, setVotes] = useState(JSON.parse(localStorage.getItem('gameVotes')) || {});
  const [optionVotes, setOptionVotes] = useState(JSON.parse(localStorage.getItem('optionVotes')) || {});


  // Effect hook to fetch games data on component mount
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

  const handleVote = (gameId, voteType) => {
    const newVotes = { ...votes, [gameId]: votes[gameId] === voteType ? null : voteType };
    setVotes(newVotes);
    localStorage.setItem('gameVotes', JSON.stringify(newVotes));
  };

  const handleOptionVote = (gameId, optionIndex, voteType) => {
    const gameOptionVotes = optionVotes[gameId] || {};
    const newVoteType = gameOptionVotes[optionIndex] === voteType ? null : voteType;
    const newGameOptionVotes = { ...gameOptionVotes, [optionIndex]: newVoteType };

    const newOptionVotes = { ...optionVotes, [gameId]: newGameOptionVotes };
    setOptionVotes(newOptionVotes);
    localStorage.setItem('optionVotes', JSON.stringify(newOptionVotes));
  };

  // State hooks for managing modal visibility
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);

  // Event handler to close the main game details modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // Event handler to close the options modal
  const handleOptionsModalCancel = () => {
    setIsOptionsModalVisible(false);
  };

  // Function to display all details of a selected game
  const getAllDetails = (game) => {
    setSelectedGame(game);
    setIsModalVisible(true);
  }

  // Function to show options (upvote/downvote) for a selected game
  const showOptions = (game) => {
    setSelectedGame(game);
    setIsOptionsModalVisible(true);
  }

  // Modal component for displaying options (upvote/downvote)
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
          renderItem={(option, index) => {
            const currentVote = optionVotes[selectedGame.id]?.[index];
            return (
              <List.Item key={index}>
                {option}
                <div style={{ marginLeft: 'auto' }}>
                  <Button 
                    icon={<LikeOutlined style={{ color: currentVote === 'upvote' ? 'green' : 'grey' }} />}
                    onClick={() => handleOptionVote(selectedGame.id, index, 'upvote')}
                  />
                  <Button 
                    icon={<DislikeOutlined style={{ color: currentVote === 'downvote' ? 'red' : 'grey' }} />}
                    onClick={() => handleOptionVote(selectedGame.id, index, 'downvote')}
                  />
                </div>
              </List.Item>
            );
          }}
        />
      )}
    </Modal>
  );

  // Modal component for displaying detailed information about a game
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

  useEffect(() => {
    setUsernameLocal(localStorage.getItem('authToken'));
  }, []);

  //Function for handling subscription click
  const handleSubscribeClick = async (gameId) => {
    try {
      const response = await handleGameSubscribe({username: usernameLocal, game_id: gameId});
      console.log(response)
      if(response.result) {
        message.success("Subscribed to game")
      } else {
        message.error("Subscribtion failed")
      }
    } catch (error) {
      message.error("Subscribtion failed");
    } finally {
      setIsLoading(false);
    }

  };

  // Main component rendering games, details modals, and options modal
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
                <Button 
                  icon={<LikeOutlined style={{ color: votes[game.id] === 'upvote' ? 'green' : 'grey' }} />}
                  onClick={() => handleVote(game.id, 'upvote')}
                />
                <Button 
                  icon={<DislikeOutlined style={{ color: votes[game.id] === 'downvote' ? 'red' : 'grey' }} />}
                  onClick={() => handleVote(game.id, 'downvote')}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {/* Render the modals */}
      <GameModal />
      <OptionsModal />
    </div>
  );
};

export default Discover;
