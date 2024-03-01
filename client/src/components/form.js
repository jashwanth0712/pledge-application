import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import './form.css';

function Form(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

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
    if (!name) {
      alert('Kindly fill in your name');
      return;
    }

    const pdfUrl = 'https://pledge-backend.vercel.app/pdf';
    try {
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
        // For iOS devices, use the share sheet to download the PDF
        const fileUrl = window.URL.createObjectURL(blob);
        window.open(fileUrl, '_blank');
      } else {
        // For other devices, trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Wildlife_pledge_certificate.pdf';
        link.click();
      }

      props.triggerCelebration();
      props.toggleModal();
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
        required  // Make the name field mandatory
      />
      <input
        className="input_field"
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your Email"
      />
      <input
        className="input_field"
        type="text"
        value={mobile}
        onChange={handleMobileChange}
        placeholder="Enter your Mobile number"
      />
      <button className="button-35" style={{ width: "100%", background: "#008000", color: "white" }} onClick={downloadPdf}>Get Certificate</button>
    </div>
  );
}

export default Form;
