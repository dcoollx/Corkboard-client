import React from 'react';
import Notice from './notice';
//import animations from '../../../services/animation.service';
import { TimelineLite } from 'gsap';

export default class Corkboard extends React.Component{
  constructor(props){
    super(props);
    this.notices = [];
    this.animations = new TimelineLite();
    }
  componentDidMount(){
    //animations.noticeEnter.play();
    this.animations.from('.notice',3,{x:window.innerWidth});
  }
  render(){
  this.notices = this.props.data.map((notice, index)=>{
    return <Notice  {...this.props} key={index} data={notice}/>
   });
  return(
  <div id="corkboard" className="corkboard col-center row-center container">
   {this.notices}
  </div>);
  }
}