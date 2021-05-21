import React, { Fragment } from "react";
import Navbar from './Navbar';


const Wispro = () => {
  return(
      <Fragment>
        <Navbar/> 
        <br></br><br></br><br></br>
        <h1 style={{fontFamily: 'monospace', 
        color:'chocolate', 
        textAlign:'center' }}>
          Bienvenido !</h1>
      </Fragment>
  )
}

export default Wispro;