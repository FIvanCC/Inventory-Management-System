import React, { useRef, useState } from "react";
import { API_URL } from "../constants.json";

function UploadBtn() {
  const fileInput = useRef(null);
  const [image, setImage] = useState(null);

  const uploadImage = () => {
    const file = fileInput.current.files[0];
    const formData = new FormData();
    formData.append("image", file);

    fetch(`${API_URL}/cam/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Image uploaded");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleImageChange = () => {
    const file = fileInput.current.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <button onClick={() => fileInput.current.click()}>Select Image</button>
      <button onClick={uploadImage}>Upload Image</button>
      {image && <img src={image} alt="Selected" />}
    </div>
  );
}

export default UploadBtn;
