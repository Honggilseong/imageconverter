import React, { useEffect, useState } from "react";
import Head from "next/head";
import JPGToPNG from "./components/JPGToPNG";
import PNGToJPG from "./components/PNGToJPG";

const ConvertPNGtoJPG = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState("jpgtopng");
  const [text, setText] = useState("");

  const handleCategory = (category) => {
    setCategory(category);
  };
  useEffect(() => {
    setText("Drop your JPG file here");
  }, []);
  return (
    <>
      <Head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_ADSENSE}`}
          crossOrigin="anonymous"
        ></script>
        <title>Free Image Converter</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div
        style={{
          width: "100vw",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "blue" }}>✋Free Image Converter🤚</h1>
        <div style={{ display: "flex" }}>
          <div
            style={{
              borderLeft: "1px solid black",
              borderTop: "1px solid black",
              paddingLeft: 10,
              paddingRight: 10,
              cursor: "pointer",
            }}
            onClick={() => handleCategory("jpgtopng")}
          >
            <p>JPG to PNG</p>
          </div>
          <div
            style={{
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
              borderTop: "1px solid black",
              paddingLeft: 10,
              paddingRight: 10,
              cursor: "pointer",
            }}
            onClick={() => handleCategory("pngtojpg")}
          >
            <p>PNG to JPG</p>
          </div>
        </div>
        {category === "jpgtopng" && (
          <JPGToPNG
            file={file}
            setFile={setFile}
            text={text}
            setText={setText}
            setProgress={setProgress}
            progress={progress}
          />
        )}
        {category === "pngtojpg" && (
          <PNGToJPG
            file={file}
            setFile={setFile}
            text={text}
            setText={setText}
            setProgress={setProgress}
            progress={progress}
          />
        )}
      </div>
    </>
  );
};

export default ConvertPNGtoJPG;
