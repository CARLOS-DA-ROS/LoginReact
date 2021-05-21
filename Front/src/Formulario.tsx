
import React, { Fragment, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
import { Arreglo } from "./TodoList";
import TodoForm from "./TodoForm";

const Formulario = () => {
    const [todoList, setTodoList] = React.useState<Arreglo[]>([]);

    React.useEffect(() => {
        axios.get('/todos', { 
            headers: { 
                token: localStorage.getItem('token')
            }})
        .then(res => {
            if (res.status === 200) 
            { setTodoList(res.data.todos); }
        })
    }, [])
    
    
    return(
        <Fragment>
            <Navbar/>

        <div style={{textAlign: 'center'}}>
            <div className="px-4 py-2">
                <TodoForm todos={todoList} setTodos={setTodoList}/>
            </div>
        </div>
        </Fragment>
    );
}


export default Formulario;
 
