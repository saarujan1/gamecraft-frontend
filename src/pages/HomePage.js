import { Row, Col } from 'antd';
import React from 'react';
import homepage1 from "../assets/homepage1.svg"

const HomePage = () => {
 
  return (
    <div style={{textAlign: 'center', padding: '50px'}}>
      <Row style={{marginBottom: '100px'}}>
      <Col span={12}>
      <h1 className="welcome-heading" style={{color: "#F64C72"}}>Your game, crafted to life</h1>
      <p className="intro-text">
        Welcome to GameCraft, a community-driven game development app. Here, you can think, innovate, and create.
      </p>
      </Col>
      <Col span={12}>
        <img src={homepage1} alt="Idea" style={{maxWidth: '100%'}}/>
      </Col>
      </Row>

      <h2 style={{fontSize: '40px', color: '#F64C72'}}>Features</h2>
      <ul style={{fontSize: "30px", listStyleType: 'none', lineHeight: '2'}}>
    <li>View all games on our dashboard, including top-voted games and games you follow</li>
    <li>Register as a game developer or a user</li>
    <li>Submit your game ideas and give options for users to contribute</li>
    <li>Provide a roadmap for your game and set a price for a share in the project</li>
    <li>Vote on various aspects of games</li>
    <li>See analytics after a game has been published</li>
    </ul>




    </div>
);
};


export default HomePage;
