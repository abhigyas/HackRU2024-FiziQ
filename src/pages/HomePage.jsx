import {React, useState, useRef, useEffect} from 'react'
import '../css/homePage.css'
import logo from '../icons/logo.png';
import dumbbell from '../icons/dumbbell.png';
import profile from '../icons/profile.png';
import Post from '../components/createPost.jsx';
import CreatePost from '../components/createPost.jsx';
import FeedElement from '../components/feedElement.jsx';
import { Link } from 'react-router-dom';



function Home() {
    
    const [toggle, setToggle] = useState(false);
    const modalRef = useRef(null);
    const [posts, setPosts] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:443/api/get-post')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(response);
            return response.json();
          })
          .then(data => setPosts(data.reverse()))
          .catch(error => console.error('Error:', error));
      }, []);

    const togglePost = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setToggle(!toggle)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setToggle(false);
            }
        };
        if (toggle) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [toggle]);
  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="navbar-elements-holder">
          <ul className="navbar-nav">
                    <li className="logo-holder">
                        <a className="nav-link">
                            <img  className='homepage-logo' src={logo} draggable="false" />
                            <span className="linktext">Fizi<a className='blue-text'>Q</a> | Fit For All</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a  className="nav-link">

                            <svg className='nav-bar-icons' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                                <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"></path>
                            </svg>
                            <span className="linktext">Home</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link">

                            <svg className='nav-bar-icons' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                            </svg>
                            <span className="linktext">Explore</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a  className="nav-link">
                            <img className='nav-bar-icons' src={dumbbell} alt="" />
                            <Link to= '/workouts' className="linktext">Workouts</Link>
                        </a>
                    </li>
                    
                    <li className="nav-item">
                        <a  className="nav-link">
                            <svg className='nav-bar-icons' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                                <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"></path>
                            </svg>
                            <span className="linktext">Create Workout</span>
                        </a>
                    </li>
                    <li className="nav-item" id='nav-link-post-button'>
                        <a onClick={togglePost} className="nav-link-button">
                            <button  className="create-post-button">Post</button>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link">

                            <img className='nav-bar-icons' src={profile} alt="" />
                            <span className="linktext">Profile</span>
                        </a>
                    </li>
                </ul>
          </div>
        </div>
        <div className="feed-container">
          <div className="your-feed-header-home">
            <h1>Feed</h1>
          </div>
          <div className="feed-posts">
          {posts.map((post, index) => (
            <FeedElement key={index} {...post} />
            ))}
          </div>
        </div>
        <div className="workouts-preview">
            <div className="beginner-workouts-header">
                <h1>Beginner Workouts</h1>
            </div>
            <a className="view-all-workouts">
                <button className="view-all-workouts-button">View all workouts</button>
            </a>
        </div>
      </div>
      {toggle && <CreatePost ref={modalRef}/> }
    </>
  )
}

export default Home