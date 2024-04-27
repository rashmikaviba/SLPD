import logo from './logo.svg';
import './App.css';
import Header from './componenets/Header';
import AddNotification from './componenets/AddNotification';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AllNotifications from './componenets/AllNotifications';
import UpdateNotification from './componenets/UpdateNotification';
import DeleteNotification from './componenets/DeleteNotification';
import SearchNotification from './componenets/SearchNotification'

function App() {
  return (
      <div>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path='/add' element= {<AddNotification/>}></Route>
            <Route path='notification/update/:id' element= {<UpdateNotification/>}></Route>
            <Route path='notification/delete/:id' element= {<DeleteNotification/>}></Route>
            <Route path='notification/search/:notID' element= {<SearchNotification/>}></Route>
            <Route path='/' element= {<AllNotifications/>}></Route>
          </Routes>
        </BrowserRouter>
        
      </div>
  );
}

export default App;
