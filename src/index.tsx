import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";

import App from "./App.tsx";
import awsconfig from "./aws-exports";

import "./index.css";

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
