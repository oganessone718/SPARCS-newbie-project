import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <>
    <div className="App">
      HELLO!!!! HI ^^
      My name is JM
      I like MJ
      {/* <BrowserRouter>
      </Header>
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/feed" element={ <FeedPage/> }/>
          <Route path="/account" element={ <AccountPage/> }/>
          <Route path="/cat-image" element={ <CatImagePage/> }/>
          <Route path="/ssr" element={ <SSRPage/> }/>
          <Route path="*" element={ <PageNotFound/> }/>
        </Routes>
      </BrowserRouter>
      <Footer/> */}
    </div>
    </>

  );
}

export default App;
