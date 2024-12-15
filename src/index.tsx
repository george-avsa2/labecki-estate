import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "App/style.scss";

const RootComponent = () => {
  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(<RootComponent />);
