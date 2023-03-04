import EditButton from "./EditButton"
import DeleteButton from "./DeleteButton"

const TodoItem = ({todo}) => {
    return (
        <>
        <div id={todo.id}>{todo.name}</div>
        <EditButton id={todo.id} todo={todo}/>
        <DeleteButton id={todo.id} todo={todo}/> 
        </>
    )
}

export default TodoItem