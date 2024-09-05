import React from 'react';
import './App.css';
import Weather from './Weather'

export default function App(){
  return(
    <>
      <div className="container mt-3">
        <h1>Weather App</h1>
        <Weather/>
      </div>
    </>
  );
}
