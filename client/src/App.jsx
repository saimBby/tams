import { Routes, Route } from "react-router-dom"

import Images from "./pages/Images"
import Login from "./pages/Login"

import Chats from "./pages/Chats"
import GPTChat from "./pages/GPTChat"

import Dashboard from "./pages/Dashboard"
import ManageAccounts from "./pages/ManageAccounts"

import NewSignup from "./pages/NewSignup"
import Chatboard from "./pages/Chatboard"

import PaymentCheckout from "./pages/PaymentCheckout"

function App() {

  
  return (
    <div className="">
      <Routes>
        <Route path="/Login" element={<Login />} />

        <Route path="/Chats" element={<Chats />} />
        <Route path="/Images" element={<Images />} />

        <Route path="/AIChat" element={<GPTChat />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/" element={<NewSignup ></NewSignup>} />
        <Route path="/signin" element={<Chatboard />} />
       
        
        <Route path="/ManageAccout" element={<ManageAccounts />}></Route>
        <Route path="/PaymentCheckout" element={<PaymentCheckout />} />
      </Routes>
    </div>
  )
}

export default App
