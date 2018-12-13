import React from 'react';
import ReactDOM from 'react-dom';
import Header from './partials/header';
import Login from './login';
import SignUp from './signup';
import List from './list';
import BookReservation from './bookreservation';
import Profile from './profile';
import Reset from './reset';
import UpdateProfile from './updateProfile';
import './css/index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
     <div>
     <Header />
      <Switch>
         <Route exact path='/' component={List}/>
         <Route exact path='/login' component={Login}/>
         <Route exact path='/signup' component={SignUp}/>
         <Route exact path='/bookreservation/:username' component={BookReservation} />
         <Route exact path='/updateprofile/:id' component={UpdateProfile} />
         <Route exact path='/reset' component={Reset}/>
         <Route path='/:username' component={Profile}/>
      </Switch>
      </div>
  </BrowserRouter>
  ,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
