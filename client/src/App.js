import React, { useState,useEffect } from 'react';
import Form from './components/form';
import './App.css';
import Confetti from 'react-confetti';
import Navbar from './components/navbar';
import useWindowSize from 'react-use/lib/useWindowSize';
import home_image from './home_image.jpg';
function App() {
  const [showModal, setShowModal] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [count, setCount] = useState(0);
  const { width, height } = useWindowSize();
  useEffect(() => {
    // Define an async function to fetch data from the API
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/get-pledged');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Assuming response data has a property named 'pledged' containing the number
        setCount(data.pledged);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Call the async function to fetch data when component mounts
    fetchData();

    // You might want to add dependencies if you need to control when the effect runs
    // For example, if you want to fetch data only when a certain prop changes, you can add it to the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run the effect only once when component mounts

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
      {/* <img src={home_image} alt="home_image" className="home_image" /> */}
    {celebrate && (
      <Confetti
        width={width}
        height={height}
        recycle={false}
        tweenDuration={3000}
      />
    )}
    <div className='banner'>
      <p>Join the mass movement to adopt MISSION LIFE [Lifestyle for Environment]</p>
    </div>
    {showModal && (
      <div className="modal">
        <div className="modal-content">
        <span className="close" onClick={toggleModal}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
</span>
{/* Pass the triggerCelebration function to the Form component */}
          <Form triggerCelebration={triggerCelebration} toggleModal={toggleModal} />
        </div>
      </div>
    )}
    <div className='middle'>
    <div className="side-text">
      <h3>
        <h2>शपथ/Pledge</h2>
मैं पर्यावरण की रक्षा के लिए अपनी दैनिक जीवनशैली में हर संभव बदलाव करने का वचन देता / देती हूँ।<br/>
मैं अपने दोस्तों, परिजनों और अन्य लोगों को पर्यावरण अनुकूल आदतों के महत्व के बारे में लगातार याद दिलाने के लिए प्रतिबद्ध हूँ।<br/>
मैं एक उदाहरण के रूप में सेवा करने का वचन देता / देती हूं कि कैसे पर्यावरण अनुकूल जीवनशैली हमारी पृथ्वी और लोगों को सकारात्मक रूप से प्रभावित कर सकती है।
<br/>
<br/>
I pledge to make all possible changes in my daily life to protect the environment. I also commit to continuously motivate my family, friends and others about the importance of environmentally friendly habits.
      </h3>
    </div>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    <button className="button-1" onClick={toggleModal}>Click & Collect</button>
      <div className='pledged_num'>
    <p>pledged by {count} people</p>
      </div>
    </div>
    </div>
    <footer className="footer">
        <a href='https://www.iiitdm.ac.in/'>Developed by IIITDM Kancheepuram</a>
      </footer>
  </div>
  
  );
}

export default App;
