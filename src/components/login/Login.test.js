import React from "react";
import ReactDOM from "react-dom";
import Login from './login';
import Register from './Register';
import {BrowserRouter} from 'react-router-dom'
//import ReactModal from "react-modal";

describe("renders front page",()=>{

it("renders Register screen without crashing", () => {
  const div = document.createElement("div");
  div.id="root";
    ReactDOM.render(<BrowserRouter><Register/></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
    const div = document.createElement("div");
    div.id="root";
      ReactDOM.render(<BrowserRouter><Login/></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
  });
});