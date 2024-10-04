import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { index } from "./store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider store={index}>
        <App />
    </Provider>
);
