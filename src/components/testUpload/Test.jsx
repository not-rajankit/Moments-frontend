// fb2ba7c81918303
import React, { useState } from "react";
import axios from "axios";

const ImgurUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        formData,
        {
          headers: {
            Authorization: "fb2ba7c81918303", // Replace with your Imgur Client ID
          },
        }
      );

      if (response.data.success) {
        console.log(response.data.data.link);
        setImageUrl(response.data.data.link);
        alert("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <h1>Upload Image to Imgur</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={imageUrl}
            alt="Uploaded to Imgur"
            style={{ width: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImgurUpload;
