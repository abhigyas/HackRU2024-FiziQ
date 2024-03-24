import React from 'react';

function FeedElement({ username, description, img }) {
  return (
    <div>
      <h2>{username}</h2>
      <p>{description}</p>
      <img src={`data:${img.contentType};base64,${img.data.toString('base64')}`} alt={description} />
    </div>
  );
}

export default FeedElement;