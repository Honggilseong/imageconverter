import React, { useEffect, useRef, useState } from "react";

function PNGToJPG({ setFile, file, text, setText, setProgress, progress }) {
  const [pngImage, setPngImage] = useState("");
  const imageRef = useRef(null);
  const handleDrop = (event) => {
    event.preventDefault();
    const idxDot = event.dataTransfer.files[0].name.lastIndexOf(".") + 1;
    const extFile = event.dataTransfer.files[0].name
      .substr(idxDot, event.dataTransfer.files[0].name.length)
      .toLowerCase();
    if (extFile !== "png") return;
    setFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setText("Drop Here!");
  };

  const handleConversion = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        setPngImage(canvas.toDataURL("image/jpeg"));
      };
    };
    reader.onprogress = (event) => {
      setProgress((event.loaded / event.total) * 100);
    };
    reader.readAsDataURL(file);
  };

  const download = () => {
    const link = document.createElement("a");
    link.download = "converted.jpg";
    link.href = pngImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setFile(null);
    setProgress(0);
    setPngImage("");
    setText("Drop your PNG file here");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setText("Drop your PNG file here");
  };
  const handleSetFile = (event) => {
    setFile(event.target.files[0]);
  };
  useEffect(() => {
    setText("Drop your PNG file here");
    setFile(null);
    setProgress(0);
    setPngImage("");
  }, []);
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        height: "200px",
        border: "1px solid black",
        width: "70%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      {file ? (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <progress value={progress} max={100} />
          <br />
          {pngImage ? (
            <button onClick={download}>Download!</button>
          ) : (
            <button onClick={handleConversion}>Convert to JPG</button>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>{text}</p>
          <p>OR</p>
          <input
            ref={imageRef}
            type="file"
            accept=".png"
            name="image"
            style={{ display: "none" }}
            onChange={handleSetFile}
          />
          <button onClick={() => imageRef.current.click()}>Click here</button>
        </div>
      )}
    </div>
  );
}

export default PNGToJPG;
