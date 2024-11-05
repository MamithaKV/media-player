
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Home from './pages/Home'
import History from './pages/History'
import Header from './Compnent/Header'
import Footer from './Compnent/Footer'

function App() {
  

  return (
    <>
    {/* path for Landing(baseURL: http://localhost:5173/) , Home( http://localhost:5173/Home) , History ( http://localhost:5173/History*/}
    {/* header */}
    <Header/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/History' element={<History/>}/>
    </Routes>
    <Footer/>
    {/* footer */}
    </>
  )
}

export default App
