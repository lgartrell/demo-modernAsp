import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { createBrowserHistory } from 'history';

import RoutingTransitionWrapper from './components/RoutingTransitionWrapper';
import Navbar from './components/Navbar/Navbar';

// this history allows the browser forward-back arrows to not trigger "page blink"
const history = createBrowserHistory();

function App() {
   return (
      <BrowserRouter history={history}>
         <>
            <Navbar />
            <AnimatePresence mode="wait">
               <RoutingTransitionWrapper />
            </AnimatePresence>
            <span className='footer'>© [2023] Lucas Gartrell. All Rights Reserved.<br></br>No part of this web application may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the author.</span>
         </>
      </BrowserRouter>
   );
}

export default App;
