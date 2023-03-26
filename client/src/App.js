import './App.css';
import { Route, Routes, Navigate} from "react-router-dom"
import Main from './components/MainComponent';
import Signup from './components/Signup';
import Login from './components/Login';
import EmailVerify from './components/EmailVerified/index'


function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path='/' exact element={<Main/>}/>}
      <Route path='/signup' exact element={<Signup/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/' exact element={<Navigate replace to="/login"/>}/>
      <Route path='/users/:id/verify/:token' element={<EmailVerify/>}/>

    </Routes>
  );
}
export default App;
