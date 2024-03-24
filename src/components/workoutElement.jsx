import React from 'react';
import '../css/workoutElement.css';

function WorkoutElement({ workoutName, description, exercises }) {
  return (
    <div className="workoutElement">
      <h2>{workoutName}</h2>
      <p>{description}</p>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            <p>{exercise.exerciseName}</p>
            <p>Sets: {exercise.sets}</p>
            <p>Reps: {exercise.reps}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutElement;