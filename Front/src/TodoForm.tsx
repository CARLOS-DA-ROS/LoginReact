import React, {Fragment} from "react";
import axios from "axios";
import { Arreglo } from "./TodoList";

interface Lista {
  todos: Arreglo[];
  setTodos: (todos: Arreglo[]) => void;
}

const Formulario = ({todos, setTodos}: Lista) => {
  const [username, setUsername] = React.useState("");
  const [documento, setDocumento] = React.useState("");
  const [domicilio, setDomicilio] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const onSubmit = () => {
    if (username.length > 0) {
      // PETICION 'POST' ENVIA DATOS
      axios.post('/todo', {username: username,
      documento: documento, domicilio: domicilio, fecha: fecha
    }, 
      {headers: { 
        token: localStorage.getItem('token')}})
        .then(res => {
          if (res.status === 200) {
            let todo = res.data.todo;
            setTodos([...todos, todo]);
            setUsername("");
            setDocumento("");
            setDomicilio("");
            setFecha("");
          }
        });
    }
  }

  return(
    <Fragment>
          <br></br><br></br><br></br>
            <h1 style={{fontFamily:'monospace', color:'chocolate', textAlign:'center' }}><b>Crear Usuario</b></h1>
          <br></br><br></br><br></br>
          <div className="col"  style={{textAlign:'center', paddingLeft:'300px'}}>
          <div className="row">
            <h4 className="px-3 py-2" 
            style={{fontFamily: 'monospace', 
            color:'green'}}>Usuario:</h4>
            <input type="email"  className="px-3 py-2 mr-sm-5" 
            onChange={e => setUsername(e.target.value)} value={username} />
          </div>
          <br></br><br></br><br></br>
          <div  className="row">
            <h4 className="px-3 py-2"   
            style={{fontFamily: 'monospace', 
            color:'green'}}>DNI Nº:</h4>
            <input type="number" className="px-3 py-2 mr-sm-5" 
            onChange={e => setDocumento(e.target.value)} value={documento} />
          </div>
          <br></br><br></br><br></br>
          <div  className="row">
            <h4 className="px-3 py-2" 
            style={{fontFamily: 'monospace', 
            color:'green'}}>Domicilio:</h4>
            <input type="string"  className="px-3 py-2 mr-sm-5" 
            onChange={e => setDomicilio(e.target.value)} value={domicilio} />
          </div>
          <br></br><br></br><br></br>
          <div  className="row">
            <h4 className="px-3 py-2" 
            style={{fontFamily: 'monospace', 
            color:'green'}}>Fecha:</h4>
            <input type="date"  className="px-3 py-2 mr-sm-5" 
            onChange={e => setFecha(e.target.value)} value={fecha} />
            <br></br><br></br><br></br>
            <div  className="row">
            <input type="button" className="btn-success px-3 py-2 mr-sm-5" 
            value="Agendar reunion" onClick={() => onSubmit()}/> 
            </div>
          </div>
       
      </div>
      
    </Fragment>
  )
}

export default Formulario;