const db = require("../models");

module.exports = function(app) {

  //route to get a single or all todos (*** currently unused ***)
  app.get("/api/todos/:id?", (req, res) => {
    //evaluating whether id exists
    let query = req.params.id ?
      { where: { id: req.params.id } } : {}
    //db query and response
    db.Todo.findAll(query)
      .then((dbTodos) => { res.json(dbTodos)})
      .catch((dbTodos) => { res.json(dbTodos) })
  })

  //Inserting New Todos into list
  app.post("/api/create", (req, res) => {
    db.Todo.create(req.body)
      .then((dbTodo) => { res.json(dbTodo) })
      .catch((err) => { res.json(err) })
  })

  //Marking a Todo as complete
  app.post("/api/complete/:id", (req, res) => {
    db.Todo.update(
      { complete: true },
      {where: { id: req.params.id} })
        .then((dbTodoID) => { res.json(dbTodo) })
        .catch((err) => { res.json(err) })
  })

  //deleting Todos
  app.post("/api/delete/:id", (req, res) => {
    db.Todo.destroy({ where: { id: req.params.id } })
      .then((dbTodoID) => { res.json(dbTodoID) })
      .catch((err) => {  res.json(err) })
  })

}
