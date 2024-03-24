import React, { useState } from 'react';
import '../css/workoutsPage.css';

function WorkoutsPage() {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className="workouts-page">
      <div>
        <div className="difficulty">
          <select value={selectedFilter} onChange={handleFilterChange}>
            <option value="" disabled selected>Difficulty</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="type">
          <select value={selectedFilter} onChange={handleFilterChange}>
            <option value="" disabled selected>Type</option>
            <option value="powerlifting">Powerlifting</option>
            <option value="bodybuilding">Bodybuilding</option>
            <option value="olympic-lifting">Olympic Lifting</option>
            <option value="calisthenics">Calisthenics</option>
          </select>
        </div>
        <div className="numberOfDays">
          <select value={selectedFilter} onChange={handleFilterChange}>
            <option value="" disabled selected>Number Of Days</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
      <div className="workouts">
        workouts
      </div>
    </div>
  );
}

export default WorkoutsPage;