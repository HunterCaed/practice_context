import { useContext } from "react"
import TodoContext from "../context/TodoContext"

const DeleteButton = ({id, todo}) => {

    const {deleteTodo} =useContext(TodoContext)
    
    
    const handleClick = () => {
        deleteTodo(id)
    }
    return (
        <button onClick={handleClick}>Delete</button>
    )

}

export default DeleteButton