import React, { useEffect, useState } from "react";
import { API_URL } from "../constants.json";

const Video = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`${API_URL}/cam/image`)
        .then((response) => response.text())
        .then((base64String) => {
          setImageSrc("data:image/jpeg;base64," + base64String);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 500);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return <div>{imageSrc && <img src={imageSrc} alt="From cam" />}</div>;
};

export default Video;
