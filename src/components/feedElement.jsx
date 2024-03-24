import React from 'react';

function FeedElement({ username, description, img }) {
  const imgBuffer = Buffer.from(img.data.data);

  return (
    <div>
      <h2>{username}</h2>
      <p>{description}</p>
      <img src={`data:${img.contentType};base64,${imgBuffer.toString('base64')}`} alt="image not loading" />
    </div>
  );
}

export default FeedElement;