import React, { useState } from 'react';

const SubmitPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Create a new post object
        const post = { title, description };
        // Send a POST request to your backend API
        fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Reset form fields
            setTitle('');
            setDescription('');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    

    return (
    <div style={{ padding: '20px' }}>
        <h2>Submit a Game Idea</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />

        <label htmlFor="description">Description:</label>
        <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        ></textarea>

        <button type="submit">Submit Post</button>
        </form>
    </div>
    );
};

export default SubmitPost;
