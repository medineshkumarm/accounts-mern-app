import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Flowbite } from "flowbite-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Flowbite>
      <App />
    </Flowbite>
  </StrictMode>
);
