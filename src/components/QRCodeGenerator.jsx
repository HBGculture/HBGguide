// frontend/src/components/QRCodeGenerator.js

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = ({ data }) => (
  <div className="p-4 border rounded inline-block">
    <QRCodeSVG 
      value={data} 
      size={256} 
      bgColor="#FFFFFF" 
      fgColor="#000000" 
      level="Q" 
      includeMargin={true} 
      aria-label="QR Code"
    />
    <p className="mt-2 text-center text-sm">Scan to view guide</p>
  </div>
);

export default QRCodeGenerator;
