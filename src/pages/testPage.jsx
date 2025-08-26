import React, { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function TestPage() {
  const [image, setImage] = useState(null);

  function fileUpload() {
    mediaUpload(image)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.error("Error uploading file:", res);
      });

    // const url=await mediaUpload(image);
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button
        onClick={fileUpload}
        className="bg-green-500 btn btn-primary hover:bg-blue-700 justify-center items-center"
      >
        Upload
      </button>
    </div>
  );
}
