import React from 'react'
import '../css/homePage.css'


function Home() {
  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="navbar-elements-holder">
          <ul className="navbar-nav">
                    <li className="logo">
                        <a className="nav-link">
                            <img id="mainicon" src="../src/icons/Airpfp.png" draggable="false" />
                            <span className="linktext">Air Music</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a onClick={homeButtonClick} className="nav-link">

                            <i id="navicons" className="fa-solid fa-house fa-2x"></i>
                            <span className="linktext">Home</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a onClick={searchBarHighlightClick} className="nav-link">

                            <i id="navicons" className="fa-solid fa-magnifying-glass fa-2x"></i>
                            <span className="linktext">Search</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a onClick={playlist} className="nav-link">

                            <i id="navicons" className="fa-solid fa-music fa-2x"></i>
                            <span className="linktext">Playlists</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">

                            <i id="navicons" className="fa-solid fa-heart fa-2x"></i>
                            <span className="linktext">Liked Songs</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a onClick={togglePlaylist} className="nav-link">
                            <i id="navicons" className="fa-solid fa-plus fa-2x"></i>
                            <span className="linktext">Create Playlist</span>
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