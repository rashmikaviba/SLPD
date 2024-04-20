import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Header from './components/Header'
import Footer from './components/Footer'
import CreateExpense from './assets/CreateExpense'
import UpdateExpense from './assets/UpdateExpense'

 

export default function App() {
  return (
    <BrowserRouter>
    
    <Header/>
    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path ="/Sign-in" element={<Signin />} />
      <Route path ="/Sign-up" element={<SignUp/>} />
      <Route path ="/dashboard" element={<Dashboard/>} />
      <Route path ="/expenses" element={<Expenses/>} />
      <Route path ='/create' element={<CreateExpense/>}/>
      <Route path ='/update/:id' element={<UpdateExpense/>}/>

    </Routes>
    <Footer/>
    </BrowserRouter>
    


  )
}
