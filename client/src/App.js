import React, { useState } from 'react';
import Form from './components/form';
import './App.css';
import Confetti from 'react-confetti';
import Navbar from './components/navbar';
import useWindowSize from 'react-use/lib/useWindowSize';
import home_image from './home_image.jpg';
function App() {
  const [showModal, setShowModal] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const { width, height } = useWindowSize();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to toggle celebrate state to true for 3 seconds
  const triggerCelebration = () => {
    setCelebrate(true);
    setTimeout(() => {
      setCelebrate(false);
    }, 3000);
  };

  return (
    <div className='container'>
      <Navbar />
    {celebrate && (
      <Confetti
        width={width}
        height={height}
        recycle={false}
        tweenDuration={3000}
      />
    )}
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={toggleModal}>&times;</span>
          {/* Pass the triggerCelebration function to the Form component */}
          <Form triggerCelebration={triggerCelebration} toggleModal={toggleModal} />
        </div>
      </div>
    )}
    <div className='middle'>
    <div className="side-text">
      <h3>
        JOINING THE MOVEMENT TO SAVE <br />
        STATE ANIMAL OF TAMILNADU <br /></h3>
        <h1>“NILGIRI TAHR”</h1> <br /><h3>
        ON THE WORLD WILDLIFE DAY <br />
        MARCH 3rd, 2024
      </h3>
    <button className="button-35" onClick={toggleModal}>Take Pledge</button>
    </div>
    </div>

  </div>
  
  );
}

export default App;
