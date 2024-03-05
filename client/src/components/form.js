import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import './form.css';
const statesAndUTs = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
  'Delhi',
  'Puducherry',
];
function Form(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  };

  const validateMobile = (mobile) => {
    return /^\d{10}$/.test(mobile);
  };

  const sendRequest = async () => {
    try {
      const response = await fetch('https://pledge-backend.vercel.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, mobile }),
      });
      if (response.ok) {
        console.log('Request sent successfully');
      } else {
        console.error('Failed to send request');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const downloadPdf = async () => {
    sendRequest();
    if (!name || !email || !mobile) {
      alert('Please fill in all the fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid Gmail address');
      return;
    }

    // if (!validateMobile(mobile)) {
    //   alert('Please enter a valid 10-digit mobile number');
    //   return;
    // }

    const pdfUrl = 'https://pledge-backend.vercel.app/pdf';
    try {
      setIsLoading(true);
      const response = await fetch(pdfUrl);
      const existingPdfBytes = await response.arrayBuffer();

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      const centerX = width / 3;
      const centerY = 3.5 * height / 5;
      firstPage.drawText(name, {
        x: centerX,
        y: centerY,
        size: 30,
        font,
        color: rgb(0, 0, 0),
        textAlign: 'center',
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
        const fileUrl = window.URL.createObjectURL(blob);
        window.open(fileUrl, '_blank');
      } else {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Wildlife_pledge_certificate.pdf';
        link.click();
      }

      props.triggerCelebration();
      props.toggleModal();
      alert('If you are unable to get download the PDF , You will receive the certificate in the mail within an hour!');
      setIsLoading(false);

    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };

  return (
    <div className='input'>
      <h1>Enter your Details </h1>
      <input
        className="input_field"
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        required 
      />
      <input
        className="input_field"
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your Email"
        required 
      />
      <select 
  value={mobile} 
  onChange={handleMobileChange}
  style={{
    width: '100%', // Make the dropdown full width
    padding: '8px', // Add padding for better touch interaction
    borderRadius: '4px', // Add some border radius for a modern look
    fontSize: '16px', // Increase font size for better readability
    marginTop: '8px', // Add some margin at the top for spacing
    border: '1px solid #ccc', // Add a border for visual separation
    backgroundColor: '#fff', // Set background color to white
    appearance: 'none', // Remove default dropdown styling
    backgroundImage: 'url("data:image/svg+xml,%3csvg viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath d=\'M17 10l-5 5-5-5h10z\' fill=\'%23000\'/%3e%3c/svg%3e")', // Add custom arrow icon
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
  }}
>
  <option value="">Select State/UT</option>
      {statesAndUTs.sort().map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>

      {/* // <input
      //   className="input_field"
      //   type="tel"
      //   value={mobile}
      //   onChange={handleMobileChange}
      //   placeholder="Enter your Mobile number"
      //   pattern="[0-9]{10}"
      //   required 
      // /> */}
      {isLoading ? (
        <button className="button-35" style={{ width: "100%", background: "#008000", color: "white" }} disabled>
          Submiting...
        </button>
      ) : (
      <button className="button-35" style={{ width: "100%", background: "#008000", color: "white" }} onClick={downloadPdf}>Get Certificate</button>
      )}
      </div>
  );
}

export default Form;
