import React from "react";
import ReactDOM from "react-dom";
import NewNotice from './newNotice';
import {BrowserRouter} from 'react-router-dom'
//import ReactModal from "react-modal";

it("renders without crashing", () => {
  const div = document.createElement("div");
  div.id="root";
    ReactDOM.render(<NewNotice/>, div);
    ReactDOM.unmountComponentAtNode(div);
});