import React from 'react';
import './style/main.css';
import './style/common.css';
import Body from './components/Body/body';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Nav from './components/Nav/nav';
import { BrowserRouter,Route, Routes } from 'react-router-dom';

import Video from './components/Body/Video';
import Event from './components/Video/Event';
import SSE from './components/SSE/SSEListiner';

const App = () => {
  
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <div className="content">
          <Nav/>
        <Routes>
          <Route path="/" element={ <Body /> } />
          <Route path="/video" element={ <Video /> } />
        </Routes>
        </div>
        <Footer/>
        {/* <Video/> */}
        {/* <Event/> */}
        {/* <SSE/> */}
      </div>
    </BrowserRouter>
  );
};

export default App;