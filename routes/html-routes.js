const db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Todo.findAll({}).then(function(data) {
      let puredata =  data.map((ele) => {
        return ele.dataValues
      })

      let splitList = {
        incomplete: puredata.filter(function(ele) {
          return ele.complete === false
        }),
        completed: puredata.filter(function(ele) {
          return ele.complete === true
        })
      }
      console.log(splitList);
      res.render("index", {data: splitList});
    })
  })
}
