import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import samplePdfBytes from 'sample.pdf'; // Import the PDF file

function App() {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const downloadPdf = async () => {
    // Load the existing PDF from imported bytes
    const existingPdfBytes = samplePdfBytes;

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed a standard font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Add the name to the center of the page
    const { width, height } = firstPage.getSize();
    const centerX = width / 2;
    const centerY = height / 2;
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

    // Create a link element to download the PDF
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'modified_sample.pdf';
    link.click();
  };

  return (
    <div>
      <h1>PDF Editor</h1>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;
