import {Fragment} from 'react';
import axios from "axios";

export interface Arreglo {
  _id: string;
  username: string;
  documento: number;
  domicilio: string;
  fecha: Date;
  isCompleted: boolean;
}

interface TodoListProps {
  todos: Arreglo[];
  setTodos: (todos: Arreglo[]) => void;
}
const TodoList = ({todos, setTodos}: TodoListProps) => {

  const markCompleted = (todo: Arreglo) => {
    axios.put(`/todo/${todo._id}`, {}, {headers: { token: localStorage.getItem('token')}})
      .then(res => {
        if (res.status === 200) {
          let _todos = todos;
          setTodos(_todos.filter(todo => res.data.todo._id !== todo._id));
        }
      });
  }

  // TRAE TODOS LOS DATOS DE UN SOLO USUARIO, FILTRADO POR _ID
  return(
    <Fragment>
       <h3 className="px-3 py-2" 
       style={{fontFamily: 'monospace', 
        color:'green', 
        textAlign:'center' }}>
          Reuniones programadas: </h3>
        <table className="table">
          <thead className="thead-light">
            <tr className="px-3 py-2 text-center">
              <th><strong>Usuario</strong></th>
              <th><strong>DNI nº</strong></th>
              <th><strong>Domicilio</strong></th>
              <th><strong>Fecha</strong></th>
              <th><strong>Estado</strong></th>
            </tr>
          </thead>
          </table>
          {todos.filter(todo => !todo.isCompleted).map((todo) => (
            <div key={todo._id} > 
               <table className="table" style={{ textAlign:'center'}}>
                  <tr >
                    <td >{todo.username}</td>
                    <td>{todo.documento}</td>
                    <td>{todo.domicilio}</td>
                    <td>{todo.fecha}</td>
                    <td style={{textAlign:'right'}}><input type="button" 
                    className="btn-primary" value="Pendiente" 
                    onClick={() => markCompleted(todo)} /></td>
                  </tr>
              </table> 
            </div>))}      
    </Fragment>
  )
}

export default TodoList;