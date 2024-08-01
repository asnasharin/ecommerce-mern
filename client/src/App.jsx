import './App.css'
import { BrowserRouter as  Router, Route, Routes } from "react-router-dom"
import SignUp from './components/User/SignUp'
import Login from './components/User/Login'
import Header from './components/layouts/Header/Header'
import Home from './components/Home/Home'

function App() {

  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={
        <>
        <Header />
       <Home />
        </>
      }/> 
      </Routes>
      <Routes>
      <Route path='/signup' element={
        <>
        <Header />
        <SignUp />
        </>
      }/> 
      </Routes>
      <Routes>
      <Route path='/login' element={
        <>
        <Header />
        <Login />
        </>
      }/> 
      </Routes>
    </Router>
    </>
  )
}

export default App
