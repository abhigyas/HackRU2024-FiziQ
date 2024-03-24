import React from 'react'
import '../css/homePage.css'
import logo from '../icons/logo.png';



function Home() {
  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="navbar-elements-holder">
          <ul className="navbar-nav">
                    <li className="logo-holder">
                        <a className="nav-link">
                            <img className='homepage-logo' src={logo} draggable="false" />
                        </a>
                    </li>

                    <li className="nav-item">
                        <a  className="nav-link">

                            <i id="navicons" className="fa-solid fa-house fa-2x"></i>
                            <span className="linktext">Home</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link">

                            <i id="navicons" className="fa-solid fa-magnifying-glass fa-2x"></i>
                            <span className="linktext">Explore</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a  className="nav-link">

                            <i id="navicons" className="fa-solid fa-music fa-2x"></i>
                            <span className="linktext">Workouts</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">

                            <i id="navicons" className="fa-solid fa-heart fa-2x"></i>
                            <span className="linktext">Profile</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a  className="nav-link">
                            <i id="navicons" className="fa-solid fa-plus fa-2x"></i>
                            <span className="linktext">Create Workout</span>
                        </a>
                    </li>
                </ul>
          </div>
        </div>
        <div className="feed-container">
          
        </div>
        <div className="workouts-preview">

        </div>
      </div>
    </>
  )
}

export default Home