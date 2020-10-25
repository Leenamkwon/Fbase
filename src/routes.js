import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cars from './components/cars';

// components
import Home from './components/index';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/users';
import Upload from './components/upload';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <main role='main' className='container'>
      <Switch>
        <Route path='/upload' component={Upload} />
        <Route path='/login' component={Login} />
        <Route path='/cars' component={Cars} />
        <Route exact path='/' component={Home} />
      </Switch>
    </main>
    <Footer />
  </BrowserRouter>
);

export default Routes;
