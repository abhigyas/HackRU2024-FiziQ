import React, { forwardRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "../css/createPost.css";
import axios from "axios";

const CreatePost = forwardRef((props, ref) => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  
  const {id} = useParams()

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  
  const handleCreatePost = async (e) => {
    e.preventDefault(); 
  
    const formData = new FormData();
    formData.append('image', image); 
    formData.append('desc', description); 
  
    try {
      const response = await axios.post('http://localhost:443/api/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Post created successfully:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  return (
    <>
      <div className="background-dimmer"></div>
      <div className="holder">
        <div ref={ref} className="modal-container">
          <form className="playlist-form">
            <h1>Create New Post</h1>
            <input
              type="text"
              id="name"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="file"
              id="image"
              name="image" 
              onChange={handleImageUpload}
            />

            <button onClick={handleCreatePost}>Create</button>
          </form>
        </div>
      </div>
    </>
  );
});

export default CreatePost;