import { useContext } from 'react';
import Header from './components/Header'
import SingleTodo from './components/SingleTodo';
import TodoInput from './components/TodoInput'
import Todos from './components/Todos';
import { TodoProvider } from './context/TodoContext';
import TodoContext from "./context/TodoContext"


function App() {



  return (
   <TodoProvider>
    <Header />
    <TodoInput />
    <Todos  />

   </TodoProvider>
  );
}

export default App;
