import { useState } from 'react'
import './App.css'

import SignUpForm from './components/SignUpForm';
import Authencticate from './components/Authenticate';

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <Authencticate token={token}/>
      <SignUpForm setToken={setToken} />
    </>
  )
}

export default App
