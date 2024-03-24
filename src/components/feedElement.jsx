import React from 'react';
import '../css/feedCard.css';


function FeedElement({ username, description, img }) {
  const imgBuffer = Buffer.from(img.data.data);

  return (
    <div className='feed-card'>
      <h2 className='feed-username'>{username}</h2>
      <p className='feed-description'>{description}</p>
      <div className='feed-image-holder'>
        <img className='feed-img' src={`data:${img.contentType};base64,${imgBuffer.toString('base64')}`} alt="image not loading" />
      </div>
    </div>
  );
}

export default FeedElement;