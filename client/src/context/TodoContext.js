import { useState, createContext, useEffect } from "react";

const TodoContext = createContext() //makes a new context

export const TodoProvider = ({children}) => {   //this is a wrapping component  the prop children is what we are wrapping. 
    //state
    const [todos, setTodos] = useState([])
    const [singleTodo, setSingleTodo] = useState(null)
    
    
    const getTodos = async () => {
        try {
          const res = await fetch('http://localhost:3002/todo')
          const data = await res.json()
          
          setTodos(data)
          console.log(data)
          
        } catch (err) {
           console.error(err.message)
        }
      }

    const addTodo = async (text) => {

        try {
           const res = await fetch('http://localhost:3002/todo', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: text})
          })
          console.log(res)
          getTodos()
        } catch (err) {
          console.error(err.message)
        }
      }
    const selectSingleTodo = async (id) => {
        const response = await fetch(`http://localhost:3002/todo/${id}`)
        const data = await response.json()
        setSingleTodo(data)

    }
    const editTodo = async (id, text) => {
        try {
          const res = await fetch(`http://localhost:3002/todo/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: text})
          })
          const data = await res.json()
          console.log(data)
          getTodos()
          setSingleTodo(null)
          
          
          } catch (err) {
            console.error(err.message)
          
        }
      } 
    const deleteTodo = async (id) => {
        try {
           await fetch(`http://localhost:3002/todo/${id}`,{
            method: "DELETE",
            // headers: {
            //   "Content-Type": "application/json"
            // }
    
          })
          getTodos()
          
        } catch (err) {
          console.error(err.message)
          
        }
      }   

    useEffect (() => {
        getTodos()
        
      }, [])

    //pass in the state and value as a prop, since this a object you can simplify
    //instead of todos: "todos", it is just todos
    //you will pass in {children} between the opening and closing
    return <TodoContext.Provider value={{
        todos,
        addTodo,
        getTodos,
        selectSingleTodo, 
        editTodo,
        singleTodo,
        deleteTodo
    }}>
        {children}
    </TodoContext.Provider>
    
}

export default TodoContext
