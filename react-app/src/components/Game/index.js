import React from 'react';
import Divider from '../Divider'
function Solitaire() {
  return (
    <>

    <div>
    <h3>Let's have some fun while listening to music!🃏</h3>
    <Divider/>
      <iframe
        title="Solitaire"
        src="https://98.js.org/programs/js-solitaire/"
        width="700"
        height="500"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>


    </>
  );
}

export default Solitaire;

// import React, { useEffect } from 'react';
// import Divider from '../Divider';

// function Solitaire() {
//   useEffect(() => {
//     // Inject a script into the iframe to override console.log
//     const iframeScript = `
//       // Override console.log to do nothing
//       console.log = function() {};
//     `;

//     // Get the iframe element
//     const iframe = document.getElementById('solitaireIframe');

//     // Execute the script within the iframe
//     if (iframe) {
//       const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
//       const scriptElement = iframeDoc.createElement('script');
//       scriptElement.type = 'text/javascript';
//       scriptElement.text = iframeScript;
//       iframeDoc.head.appendChild(scriptElement);
//     }
//   }, []);

//   return (
//     <>
//       <div>
//         <h3>Let's have some fun while listening to music!🃏</h3>
//         <Divider />
//         <iframe
//           id="solitaireIframe"
//           title="Solitaire"
//           src="https://98.js.org/programs/js-solitaire/"
//           width="700"
//           height="500"
//           frameBorder="0"
//           allowFullScreen
//         ></iframe>
//       </div>
//     </>
//   );
// }

// export default Solitaire;
