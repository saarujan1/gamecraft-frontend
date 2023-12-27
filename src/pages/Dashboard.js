import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const Dashboard = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch the games from your backend
    fetch('/api/games')
      .then(response => response.json())
      .then(data => setGames(data));
  }, []);

  const columns = [
    { title: 'Game Name', dataIndex: 'name', key: 'name' },
    { title: 'Developer', dataIndex: 'developer', key: 'developer' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <Table dataSource={games} columns={columns} />
    </div>
  );
};

export default Dashboard;