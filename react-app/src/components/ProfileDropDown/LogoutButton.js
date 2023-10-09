import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const[sound, setSound] = useState(false);

  const toggleSound = () => {
    const click = new Audio('https://goldeneragrooves.s3.us-east-2.amazonaws.com/turnoffsound.mp3');
    if (sound) {
      click.pause();
    } else {
      click.play()
    }
    setSound(!sound)
  }
  const onLogout = (e) => {
    e.stopPropagation();
    toggleSound();
    dispatch(logout());
  };

  return <button onClick={onLogout} className='btn-signout'>Sign Out</button>;
};

export default LogoutButton;
