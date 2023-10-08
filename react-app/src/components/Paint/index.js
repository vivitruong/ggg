import React from 'react';
import Divider from '../Divider'
// add child div to capture mouse event when not focused

function Paint() {

  return (
    <>

    <div>
    <h3>Let's have some fun while listening to music! 🎨</h3>
    <Divider/>
    <iframe title='paint website' src="https://jspaint.app" width="900" height="650" frameborder="0"></iframe>
    </div>
    </>
  );
}

export default Paint;
