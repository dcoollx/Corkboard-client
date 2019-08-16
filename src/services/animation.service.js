import { TweenMax } from 'gsap';

const animations = {};
animations.noticeEnter = TweenMax.staggerFrom(document.getElementsByClassName('notice'),3,{x:window.innerWidth});

export default animations;