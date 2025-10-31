import { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"

function App() {
const [todo, setTodo]= useState([]);
const [title, setTitle]= useState("");

useEffect(() => {
  axios
    .get("http://localhost:5000/api")
    .then((res) => {
      setTodo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

const addTodo = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api", {
      title,
    });
    setTodo((prev) => [...prev, response.data]);
    setTitle("");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};
const toggleTodo = async (id, currentStatus) => {
  try {
    await axios.put(`http://localhost:5000/api/${id}`, {
      completed: !currentStatus,
    });
    setTodo((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, completed: !currentStatus } : t
      )
    );
  } catch (err) {
    console.error("Error updating todo:", err);
  }
};



async function deleteTodo(id){
  try{
    await axios.delete(`http://localhost:5000/api/${id}`);
    setTodo((prev) => prev.filter((todo) => todo._id !== id));
  }
  catch(error){
    console.error("Error deleting todo:", error);
  }
}


  return <div style={{ width: "400px", margin: "50px auto", textAlign: "center" }}>
    <h1>My Todo List</h1>
    <div>
      <input type="text" 
      value={title}
      onChange={(e)=> setTitle(e.target.value)}
      placeholder="Enter your Task.." style={{padding: "8px", width: "90%"}}/>
      <button onClick={addTodo}>Add</button>
    </div>

    <ul>
      {todo.map((todo)=>(
        <li
          key= {todo._id}
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "5px"
          }}
        
        >
<div>
         <span
        onClick={() => toggleTodo(todo._id, todo.completed)}
        style={{ cursor: "pointer" }}
      >
        {todo.title}
      </span>
        <span
          style={{
            color: todo.completed ? "green" : "red",
            fontWeight: "bold",
            marginLeft: "10px"
          }}
        >
          {todo.completed ? "✓ Done" : "⏳ Pending"}
        </span>
      </div>
          <button onClick={() => deleteTodo(todo._id)}>🗑️</button>
        </li>
      ))}
    </ul>

  </div>
}

export default App
