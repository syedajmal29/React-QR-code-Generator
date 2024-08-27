import { useState } from "react";

export const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("ajmal");
  const [qrSize, setQrSize] = useState("150");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("error generating qr code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR(img) {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link); // This should be document.body instead of document
        link.click();
        document.body.removeChild(link); // Remove the link after the download is triggered
      })
      .catch((error) => console.error("Error downloading the QR code:", error));
  }

  //   function downloadQR(img) {
  // fetch(img)
  //   .then((response) => response.blob())
  //   .then((blob) => {
  // const link = document.createElement("a");
  // link.href = URL.createObjectURL(blob);
  // link.download = "qrcode.png";
  // document.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
  //   });
  //   }

  return (
    <>
      <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>please wait...</p>}
        {img && <img src={img} className="dummy" />}
        <div>
          <label htmlFor="dataInput" className="input-label">
            Data for QR code:
          </label>
          <input
            type="text"
            value={qrData}
            id="dataInput"
            placeholder="enter data for qrcode"
            onChange={(e) => setQrData(e.target.value)}
          />
          <label htmlFor="sizeInput" className="input-label">
            Image size (e.g., 150):
          </label>
          <input
            type="text"
            value={qrSize}
            onChange={(e) => setQrSize(e.target.value)}
            id="sizeInput"
            placeholder="enter image size"
          />
          <button
            className="generate-button"
            disabled={loading}
            onClick={generateQR}
          >
            Generate QR-code
          </button>
          <button className="download-button" onClick={downloadQR}>
            Download QR-code
          </button>
        </div>
        <p className="footer">Designed by Ajmal</p>
      </div>
    </>
  );
};
