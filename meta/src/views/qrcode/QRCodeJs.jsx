import React from 'react';
import QRCode from "qrcode.react";


const QRCodeJs = ({ethAddress}) => {
  console.log("qr");

  return (
    <QRCode value={ethAddress} size={300}/>
  )
}

export default QRCodeJs;