import React from 'react';
import './style/main.css';
import './style/common.css';

import Body from './components/Board/body';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Nav from './components/Nav/nav';
import { BrowserRouter,Route, Routes } from 'react-router-dom';

import Video from './components/List/Video';
import SSE from './components/SSE/SSEVideo';

const App = () => {
  
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <div className="content">
        <input type="checkbox" />
        <div class="cross">
            <span></span>
            <span></span>
            <span></span>
        </div>
          <Nav/>
        <Routes>
          <Route path="/" element={ <Body /> } />
          <Route path="/video" element={ <Video /> } />
        </Routes>
        </div>
        <Footer/>
        {/* <Video/> */}
        {/* <Event/> */}
      </div>
    </BrowserRouter>
  );
};

export default App;