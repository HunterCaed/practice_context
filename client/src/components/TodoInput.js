import {useState, useContext} from 'react'
import TodoContext from '../context/TodoContext' //bring in context from context folder


const TodoInput = () => {

    const {addTodo} = useContext(TodoContext) //destructure the function

    const [text, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo(text)
        setText('')

    }

    return (
     <form onSubmit={handleSubmit}>
        <input type='text' value={text} onChange={handleChange}/>
        <input type='submit'/>
     </form>
    )
}

export default TodoInput