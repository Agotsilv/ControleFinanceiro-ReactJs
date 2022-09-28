//CSS
import '../common/template/dependencies'

import React from "react";

import Header from '../common/template/Header/header';
import Sidebar from '../common/template/Menu/side-bar';
import Footer from '../common/template/Footer/footer';

import Routes from './routes'


export default props => (
  <div className="wrapper">
    <Header/>
    <Sidebar/>
    <div className="content-wrapper">
        <Routes/>
    </div>
    <Footer/>
  </div>
);
