import Header from './header';
import React from "react";
import ReactDOM from "react-dom";
import test from '../../../test/demoData';
import {BrowserRouter, Route} from 'react-router-dom';

it("renders without crashing", () => {
    const div = document.createElement("div");
    div.id="root";
      ReactDOM.render(
      <BrowserRouter>
      <Route path="/" render={(props)=>{
          return  <Header {...props}  orgInfo = {test.testOrg(1)} team = {test.testTeam(1)}/>;
     

      }}>
      </Route>
      </BrowserRouter>,div);
      ReactDOM.unmountComponentAtNode(div);
  });