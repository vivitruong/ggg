import React from 'react';
import Divider from '../Divider'

function Paint() {

  return (
    <>

    <div>
    <h3>Let's have some fun while listening to music! 🎨</h3>
    <Divider/>
    <iframe title='paint website' src="https://jspaint.app" width="900" height="650" frameBorder="0"></iframe>
    </div>
    </>
  );
}

export default Paint;
// import React from 'react';
// import Divider from '../Divider';

// function Paint() {
//   // Inject a script into the iframe to override console.log
//   const iframeScript = console.log = function() {};
//   ;

//   return (
//     <>
//       <div>
//         <h3>Let's have some fun while listening to music! 🎨</h3>
//         <Divider />
//         <iframe
//           title='paint website'
//           src="https://jspaint.app"
//           width="900"
//           height="650"
//           frameBorder="0"
//           sandbox="allow-scripts"
//         >
//           <script type="text/javascript">{iframeScript}</script>
//         </iframe>
//       </div>
//     </>
//   );
// }

// export default Paint;
