import { useContext } from "react"
import TodoContext from "../context/TodoContext"


const EditButton = ({id}) => {
    
    const {selectSingleTodo} = useContext(TodoContext)

    const handleClick = (id) => {
        return (
            selectSingleTodo(id)
        )
    }
    return (
        <button onClick={handleClick}>Edit</button>
    )

}

export default EditButton