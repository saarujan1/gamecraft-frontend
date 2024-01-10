import { Row, Col } from 'antd';
import React from 'react';
import homepage1 from "../assets/homepage1.svg"

const HomePage = () => {
 
  return (
    <div>
      <Row style={{marginBottom: '100px'}}>
      <Col span={12}>
      <h1 className="welcome-heading">Your game,</h1>
      <h1 className="welcome-heading" style={{color: "#F64C72"}}>crafted to life</h1>
      <p className="intro-text">
        GameCraft is a community-driven game development app
      </p>
      <h1 style={{color: "#F64C72", fontSize: '60px', fontWeight: 'bold'}}>Think, innovate, create</h1>
      </Col>
      <Col span={12}>
        <img src={homepage1} alt="Idea" />
      </Col>
      </Row>

      <ul className="feature-list" style={{fontSize: "30px"}}>
        <li>- View all games on our dashboard, including top-voted games and games you follow</li>
        <li>- Register as a game developer or a user</li>
        <li>- Submit your game ideas and give options for users to contribute</li>
        <li>- Provide a roadmap for your game and set a price for a share in the project</li>
        <li>- Vote on various aspects of games</li>
        <li>- See analytics after a game has been published</li>
      </ul>
      
      
      
    </div>
    
  );
};


export default HomePage;
