import React, { Fragment } from "react";
import axios from "axios"; // PAQUETE PARA PETICIONES HTTP


const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = () => {
    // BUSCA LA RUTA 'login' EN EL BACKEND
    axios.post('/login', {
      username: username,
      password: password
    }).then(res => {
      if (res.status === 200) {
      // PARA VERIFICAR SI HAY CLAVE VALIDA
        const token = res.data.token;
        localStorage.setItem('token', token);
      // CAMBIA AUTOMATICAMENTE AL LISTADO  
        window.location.href = '/wispro';
      } else { }
    });
  }
  // PARA EL ESTILO SE USO BOOSTRAP 4.6 (CDN) EN EL INDEX.HTML
  // AUNQUE PUEDE AGREGARSE DESDE EL EL PACKAGE.JSON 
  return(
    <Fragment>
      <div style={{textAlign: 'center'}}>
        <br></br><br></br>
        <div>
          <label className="px-4 py-2">Usuario: </label>
          <input onChange={(e) => setUsername(e.target.value)} className=" px-3 py-2 text-center border border-gray-400 rounded-md" type="email" required placeholder="Email" />
        </div>
        <br></br>
        <div>
          <label className="px-2 py-2">Contraseña:</label>
          <input onChange={(e) => setPassword(e.target.value)} className="px-3 py-2 text-center border border-gray-400 rounded-md" type="password" required placeholder="Password " />
        </div>
        <br></br>
        <div>
          <button  className="px-3 py-2 btn-warning" onClick={() => onSubmit()}><u>Iniciar sesion</u></button>
        </div>
        <br></br><br></br>
      </div>
    </Fragment>
  )
}

export default Login;