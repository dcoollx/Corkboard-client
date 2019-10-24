import React from "react";
import ReactDOM from "react-dom";
import Setting from './settings';
import {BrowserRouter} from 'react-router-dom';
//import ReactModal from "react-modal";

it("renders without crashing", () => {
    localStorage.setItem('orgInfo',JSON.stringify({orgCode:'test'}));
  const div = document.createElement("div");
  div.id="root";
    ReactDOM.render(<Setting/> , div);
    ReactDOM.unmountComponentAtNode(div);
});