import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

function Form(props) {
    
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('');
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };
  const sendRequest = async () => {
    try {
      const response = await fetch('http://localhost:5000/submit', {
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
    const pdfUrl = 'http://localhost:5000/pdf';
    // await sendRequest();
    try {
      // Fetch the PDF file
      const response = await fetch(pdfUrl);
      const existingPdfBytes = await response.arrayBuffer();

      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Embed a standard font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Get the first page of the document
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Add the name to the center of the page
      const { width, height } = firstPage.getSize();
      const centerX = width / 3;
      const centerY = 3.5*height / 5;
      firstPage.drawText(name, {
        x: centerX,
        y: centerY,
        size: 30,
        font,
        color: rgb(0, 0, 0),
        textAlign: 'center',
      });

      // Serialize the PDFDocument to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a blob from the bytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      props.triggerCelebration();
      props.toggleModal();
      // Create a link element to download the PDF
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Wildlife_pledge_certificate.pdf';
      setTimeout(() => {
        link.click();
      },2000);

    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };

  return (
    <div>
      <h1>Enter your Details </h1>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
       <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your Email"
      />
       <input
        type="text"
        value={mobile}
        onChange={handleMobileChange}
        placeholder="Enter your Mobile number"
      />
      <button className="button-35" onClick={downloadPdf}>Get Certificate</button>
      
    </div>
  );
}

export default Form;
