import React, { Fragment } from "react";

const Navbar = () => {
  return(
      <Fragment>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
              <a className="navbar-brand text-success mr-sm-5 "><b>test-Wispro</b> &trade;</a>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">	
                  <a className="nav-item text-primary mr-sm-5 px-3 " href="./listado"><b>Listado</b></a>
                  <a className="nav-item text-primary mr-sm-5 px-3 " href="./formulario"><b>Formulario</b></a>
                </ul>
                <button className="btn btn-danger" type="button" onClick={() => {alert("URGENCIA !!! ")}}> ⚡ </button>
              </div>
          </nav>
      </Fragment>
  )
}

export default Navbar;