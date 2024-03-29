// SplashScreen.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './style.css';
import '98.css'

function SplashScreen() {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const [isLoading, setIsLoading] = useState(true);
    const[sound, setSound] = useState(false);

    const toggleSound = () => {
      const click = new Audio('https://goldeneragrooves.s3.us-east-2.amazonaws.com/clicksouind.wav');
      if (sound) {
        click.pause();
      } else {
        click.play()
      }
      setSound(!sound)
    }

    useEffect(() => {
        // Simulate a delay (e.g., 3 seconds) for the splash screen
        const delay = setTimeout(() => {
          setIsLoading(false);
        }, 10000); // Adjust the delay to match the animation duration

        // Clean up the timeout when the component unmounts
        return () => clearTimeout(delay);
      }, []);

    const redirectToLoginPage = () => {
      history.push("/login");
    };
    if(sessionUser) return <Redirect to ='/'></Redirect>

    return (
      <>

        <div
          className={`splash-page ${isLoading ? "show" : "hide"}`}
          style={{
            backgroundImage: `url("https://goldeneragrooves.s3.us-east-2.amazonaws.com/background2.jpg")`, // Replace with the actual path to your background image
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",

          }}
        >
          {/* <h3 style={{color:'Navy'}}>Welcome to</h3> */}

          <img
            className="splash-screen-image"
            src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/splash_logo-removebg.png"
            alt="splashscreen"
          />
          <img
             onClick={() => {
              toggleSound();
              redirectToLoginPage();
            }}
            className="clickenter"
            src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/Click+here+to+enter.png"
            alt="Click to enter"
            style={{
              width:'140px',
              marginRight:'-30px',
              marginTop: '-10px'
                        }}
          />
        </div>
        </>
      );
    }

    export default SplashScreen;
