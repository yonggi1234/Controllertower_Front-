import React from 'react';

import './style/main.css';
import Body from './components/Body/body';
import Header from './components/Header/header';
import Nav from './components/Nav/nav';


const App = () => {
  return (
    <div>
      <Header/>
      <Nav/>
      <Body/>
    </div>
  );
};

export default App;