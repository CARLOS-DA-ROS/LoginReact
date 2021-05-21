import React, { Fragment } from "react";
import axios from "axios";
import Navbar from './Navbar';
import TodoList, { Arreglo } from "./TodoList";

const Listado = () => {

    const [todoList, setTodoList] = React.useState<Arreglo[]>([]);
  
    React.useEffect(() => {
    // PETICION 'GET' TREA DATOS
      axios.get('/todos', { headers: { token: localStorage.getItem('token')}})
        .then(res => {
          // PARA TRAER LOS DATOS DESDE LA TABLA-COLLECCION
          if (res.status === 200) { 
              setTodoList(res.data.todos); }
        })
    }, [])

    return(
        <Fragment>
            <Navbar/>
            <div style={{textAlign: 'center'}}>
                <div className="px-4 py-2">
                    <TodoList todos={todoList} setTodos={setTodoList} />
                </div>
            </div>
           
        </Fragment>
    )

}
export default Listado;