import React, { useState, useEffect} from 'react';
import Button from "../Button";

import './style.css'
import { useSelector } from 'react-redux';
const getTime = () => {
    const date = new Date();
    let hour = date.getHours();
    let hourPostFix = 'AM';
    let min = date.getMinutes();
    if (hour >= 12) {
      hour -= 12;
      hourPostFix = 'PM';
    }
    if (hour === 0) {
      hour = 12;
    }
    if (min < 10) {
      min = '0' + min;
    }
    return `${hour}:${min} ${hourPostFix}`;
  };
function Footer() {
    const [time, setTime] = useState(getTime);
    const [showMenu, setShowMenu] = useState(false);
    // const user = useSelector(state => state.session.user);
    const openMenu = (e) => {
      e.stopPropagation();
      setShowMenu(true);

  }
  useEffect(() => {
    document.addEventListener('click', e => {
        e.stopPropagation();
        setShowMenu(false);
    });
});

    useEffect(() => {
        const timer = setInterval(() => {
          const newTime = getTime();
          newTime !== time && setTime(newTime);
        }, 1000);
        return () => clearInterval(timer);
      }, [time]);


return(

    <>
    <div className='footer'>
    <img className='start-footer'onClick={openMenu} alt='' src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/starttttttt.PNG'></img>
    {
                showMenu &&
                <div className="start-dropdown">
                    <div  className="start-dropdown-info start-hover">
                        <span className="start-dropdown-content" style={{cursor:"default", fontWeight:'1000'}}>
                        Warning!! Browsing this website may cause uncontrollable smiles. Made by Vi Vi Truong 2023<img src='https://win98icons.alexmeub.com/icons/png/msagent_file-0.png'></img></span>
                    </div>

                </div>
            }
          <button  disabled className='bar-button active' id='about-btn'>About</button>
          <Button className="github">
              <img alt='' src="https://win98icons.alexmeub.com/icons/png/msagent-1.png"></img>
              <a href="https://github.com/vivitruong" target="_blank" rel="noreferrer">github.com/vivitruong</a>
            </Button>
            <Button className="github">
              <img alt='' src="https://win98icons.alexmeub.com/icons/png/msagent-1.png"></img>
              <a href="https://www.linkedin.com/in/vi-truong-421698253/" target="_blank" rel="noreferrer">Vi Truong | LinkedIn</a>
            </Button>
            <Button className="github">
              <img alt='' src="https://win98icons.alexmeub.com/icons/png/msagent-1.png"></img>
              <a href="https://vivi-portfolio.vercel.app/" target="_blank" rel="noreferrer">Portfolio Website</a>
            </Button>

    <div style={{padding: '5px'}} className="footer__time">
        <span  style={{padding: '5px', fontSize:'20px'}}>{time}</span></div>
    </div>
    </>
)
}

export default Footer;
