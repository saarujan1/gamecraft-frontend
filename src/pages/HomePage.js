import React, { useState } from 'react';

const HomePage = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    // Handle the registration logic here
    /* 
    event.preventDefault();

  // Create a new user object
  const user = { username: registerUsername, password: registerPassword };

  // Send a POST request to your backend API
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    console.log('Registration successful');
  } else {
    console.log('Registration failed');
  }

    */
    console.log('Registering:', { registerUsername, registerPassword });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle the login logic here
    /*
    const handleLogin = async (event) => {
  event.preventDefault();

  // Create a new user object
  const user = { username: loginUsername, password: loginPassword };

  // Send a POST request to your backend API
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    console.log('Login successful');
  } else {
    console.log('Login failed');
  }
    */
    console.log('Logging in:', { loginUsername, loginPassword });
  };

  return (
    <div>
      <h1>Welcome to GameCraft</h1>
      <p>GameCraft is a community-driven game development app. Here, you can:</p>
      <ul>
        <li>View all games on our dashboard, including top-voted games and games you follow</li>
        <li>Register as a game developer or a user</li>
        <li>Submit your game ideas and give options for users to contribute</li>
        <li>Provide a roadmap for your game and set a price for a share in the project</li>
        <li>Vote on various aspects of games</li>
        <li>See analytics after a game has been published</li>
      </ul>

      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default HomePage;
