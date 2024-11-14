import React from 'react';
import './App.css';
import UploadImage from './UploadImage';

const App: React.FC = () => {
  return (
      <div className="App">
        <h1>Upload Image to S3</h1>
        <UploadImage />
      </div>
  );
};

export default App;
