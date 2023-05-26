import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import MyPage from './pages/mypage';
import DetailPage from './pages/detailMJ';
import EditPage from './pages/edit';
import MakeMJPage from './pages/makeMJ';
import PageNotFound from './pages/404';

const App = () => {
  const [loggedID, setLoggedID] = React.useState<string|null>(null);
  const [count, setCount] = React.useState<number>(0);

  console.log(loggedID);

  React.useEffect( () => {
    setLoggedID(null);
    setCount(0);
  }, []);

  return (
    <>
    <div className="App">
      <BrowserRouter>
      <Header loggedID={loggedID} setLoggedID={setLoggedID}/>
        <Routes>
          <Route path="/" element={ <HomePage loggedID={loggedID} setLoggedID={setLoggedID} count={count} setCount={setCount}/> }/>
          <Route path="/log-in" element={ <LoginPage loggedID={loggedID} setLoggedID={setLoggedID}/> }/>
          <Route path="/sign-up" element={ <SignUpPage/> }/>
          <Route path="/my-page" element={ <MyPage loggedID={loggedID} setLoggedID={setLoggedID}/> }/>
          <Route path="/detail" element={ <DetailPage loggedID={loggedID} setLoggedID={setLoggedID}/> }/>
          <Route path="/editMJ" element={ <EditPage/> }/>
          <Route path="/makeMJ" element={ <MakeMJPage count={count} setCount={setCount}/> }/>
          <Route path="*" element={ <PageNotFound/> }/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
    </>

  );
}

export default App;
