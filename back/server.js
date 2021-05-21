const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./User');
const bcrypt = require('bcrypt');
const Todo = require('./Todo');
const port = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://carl:<pass>@cluster0.44oh2.mongodb.net/wispro-test1');

app.use(cors());
app.use((express.json()));
app.use(express.urlencoded({ extended: false }));

app.post('/login', (req,res) => {
  User.findOne({ username: req.body.username}, (err, user) => {
    // ERROR 1
    if (err) {
      console.log(" \n \n \n  ERROR DEL SERVER \n \n \n ")
      return res.status(500).json({
        title: 'ERROR DEL SERVER',
        error: err
      });
    } else if (!user) {
      console.log(" \n USUARIO INEXISTENTE \n ")
      return res.status(400).json({
        title: 'USUARIO INEXISTENTE',
        error: 'USUARIO INEXISTENTE'
      })
    // PARA COMPARAR CON CLAVE ENCRIPTADA
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      console.log(' \n \n    CLAVE INCORRECTA \n \n')
      return res.status(401).json({
        title: 'CLAVE INCORRECTA',
        error: 'CLAVE INCORRECTA'
      })
    // DEVUELVE EL TOKEN DE LOGEO
    } else {
      console.log('\n \n \n LOGEADO EN mongoDB !!! \n \n \n ')
      let token = jwt.sign({ userId: user._id}, 'secretkey');
      return res.status(200).json({
        title: ' LOGEADO EN MONGO DB ',
        token: token
      });
    }
  })
});

app.get('/todos', (req, res) => {
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({
      title: 'not authorized'
    });
    Todo.find({ author: decoded.userId }, (err, todos) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: 'success',
        todos: todos
      });
    })
  })
})

app.post('/todo',(req, res) => {
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({
      title: 'not authorized'
    });
    let newTodo = new Todo({
      username: req.body.username,
      documento: req.body.documento,
      domicilio: req.body.domicilio,
      fecha: req.body.fecha,
      // ID DEL USUARIO QUE REGISTRO LA REUNION
      author: decoded.userId
    });
    newTodo.save(error => {
      if (error) return console.log(error);
      console.log('NUEVA REUNION AGREGADA !')
      return res.status(200).json({
        title: 'success',
        todo: newTodo
      })
    })
  })
});

app.put('/todo/:todoId', (req, res) => {
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({
      title: 'not authorized'
    });

    Todo.findOne({ author: decoded.userId, 
      _id: req.params.todoId }, 
      (err, todo) => {
      if (err) return console.log(err);
      // SE DEBEN ENVIAR TODOS LOS DATOS
      todo.isCompleted = true;
      todo.save(error => {
        if (error) return console.log(error);
        return res.status(200).json({
          title: 'success',
          todo: todo
        });
      });
    })
  })
})

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(' \n \n \n  Servidor en puerto:', port );
  console.log(' \n \n \n ');
});
