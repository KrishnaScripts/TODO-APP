import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CreateTodos from './view/CreateTodos'
import TodoList from './view/TodoList'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<TodoList/>}/>
      <Route path='/create' element={<CreateTodos/>}/>
      <Route path='/edit/:id' element={<CreateTodos/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
