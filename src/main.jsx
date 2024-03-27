import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Video from "./Video.jsx";
import UploadBtn from "./UploadBtn.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />

    <Video />
  </React.StrictMode>
);
