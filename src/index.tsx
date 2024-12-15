import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "./App";

ReactDOM.render(
  <ChakraProvider value={defaultSystem}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
