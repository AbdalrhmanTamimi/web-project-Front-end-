import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from "./com/Nav.jsx";
import Home from "./com/Home.jsx";
import Login from "./com/Login.jsx";
import Register from "./com/Register.jsx";
import About from "./com/About.jsx";

function App() {
  return (
    <>
        <NavBar></NavBar>

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

        </Routes>
    </>
  )
}

export default App
