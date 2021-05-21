const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  username: { type: String},
  documento: { type: Number},
  domicilio: { type: String},
  fecha: { type: Date},
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;