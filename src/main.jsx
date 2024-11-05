import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';


// const CLIENT_ID = '19084731503-c9dosg1a42nhhoqoiv08gape07eb1k2n.apps.googleusercontent.com';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <GoogleOAuthProvider clientId={CLIENT_ID}>
//       <App />
//     </GoogleOAuthProvider>
//   </StrictMode>,
// );
