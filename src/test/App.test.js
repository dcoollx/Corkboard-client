import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer';
import Corkboard from '../components/main/announcements/corkboard';
import noticePage from '../components/main/announcements/NoticePage/noticePage';
import test from './demoData';
import NoticePage from "../components/main/announcements/NoticePage/noticePage";
import Landing from "../components/Landing/Landing";
//import ReactModal from "react-modal";

it("renders without crashing", () => {
  const div = document.createElement("div");
  div.id="root";
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('major components',()=>{
  
  it('renders corkboard',() => {
  const div = document.createElement('div');
  ReactDOM.render(<Corkboard data={test.testNotices()}/>, div);
  ReactDOM.unmountComponentAtNode(div);
  });
})

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<BrowserRouter><App /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});