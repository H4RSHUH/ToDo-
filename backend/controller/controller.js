const Todo= require("../models/todo");

const getTodos= async (req, res) => {
    try{
        const todos=await Todo.find();
        res.json(todos)
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
}

async function createTodo(req, res){
    try{
        const todo= await Todo.create({
            title: req.body.title,
        })
        res.json(todo)
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
}

async function updateTodo(req,res){
    try{
        const todo= await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(todo)
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
}

async function deleteTodo(req,res){
    try{
      await Todo.findByIdAndDelete(req.params.id);
      res.json({message: "Todo deleted"})
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
}

module.exports={
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}

