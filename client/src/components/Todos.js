import { useContext } from "react"
import TodoItem from "./TodoItem"
import TodoContext from "../context/TodoContext"


const Todos = () => {
    const {todos} = useContext(TodoContext)
    return (
        
        todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
            
        ))
        

    )
}

export default Todos