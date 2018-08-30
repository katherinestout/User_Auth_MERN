import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
  render() {
    return (
      <div>
        <h1> Landing </h1>
       
       <button type="btn btn-light"> <Link to = "/register">Sign Up!</Link> </button>

     <button type="btn btn-light"> <Link to = "/login">login</Link></button>
      </div>
    );
  };
};