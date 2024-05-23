import React from 'react';
import './style/main.css';
import './style/common.css';

import Body from './components/Board/body';
import Header from './components/Header/header';
import HD from './components/header-bottom/headerBottom';
import Footer from './components/Footer/footer';
// import Nav from './components/Nav/nav';
import Nav from './components/Nav/navFetch';
import { BrowserRouter,Route, Routes } from 'react-router-dom';


import Video from './components/List/Video';

const App = () => {
  
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <div className="content">

          <HD/>
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