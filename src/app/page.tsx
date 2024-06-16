"use client";

import { useEffect, useState } from "react";
import { IoIosRefresh } from "react-icons/io";

export default function Home() {
  const [randomAudioFile, setRandomAudioFile] = useState("");

  const selectRandomAudioFile = () => {
    console.log("selectRandomAudioFile");

    const audioFiles = [
      "audio1.mp3",
      "audio2.mp3",
      "audio3.mp3",
      "audio4.mp3",
      "audio5.mp3",
      "audio6.mp3",
      "audio7.mp3",
    ];

    console.log(
      "Math.floor(Math.random() * audioFiles.length)",
      Math.floor(Math.random() * audioFiles.length)
    );

    const randomFile =
      audioFiles[Math.floor(Math.random() * audioFiles.length)];
    setRandomAudioFile(randomFile);
  };

  useEffect(() => {
    console.log("useEffect");

    selectRandomAudioFile();
  }, [randomAudioFile]);

  console.log("randomAudioFile", randomAudioFile);

  return (
    <main className="flex flex-col min-h-screen justify-center items-center p-24">
      <h1 className="text-9xl cursor-pointer title" onClick={() => {}}>
        PROCREATE
      </h1>
      <br />
      {randomAudioFile && (
        <audio controls autoPlay key={randomAudioFile}>
          <source src={`/${randomAudioFile}`} type="audio/mpeg" />
        </audio>
      )}
      {/* <button onClick={selectRandomAudioFile} className="mt-4">
        <IoIosRefresh />
      </button> */}
      <button
        onClick={selectRandomAudioFile}
        className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        <IoIosRefresh />
      </button>
    </main>
  );
}
