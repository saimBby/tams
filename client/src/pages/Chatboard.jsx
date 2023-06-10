import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import { useAuthContext } from '../hooks/useAuthContext'

function Chatboard() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { dispatch } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch("http://localhost:4000/loginUser", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()  
        
        if (response.ok) {
          // useAuth
          localStorage.setItem('user', JSON.stringify(json))
          dispatch({type: 'LOGIN', payload: json})
        }
        if (!response.ok) {
          console.log(json.error)
        }
    }

    return (
        <div>
            <form className="h-screen flex items-center justify-center" onSubmit={handleSubmit}>
            <div className="flex justify-center bg-[#f1f2f4] p-4 w-3/6 rounded-xl">
                <div className="flex flex-col">
                <div className="flex">
                    <h1 className="text-2xl mr-2 font-bold text-[#D43790]">
                    Login
                    </h1>
                    <h1 className="text-2xl mr-2 font-semibold">
                    & and use TAMS for free, with one Account
                    </h1>
                </div>
                <div className="flex flex-col">
                    <div className="mt-4">
                    <input  onChange={(e) => {setEmail(e.target.value)}} className="w-full p-5 rounded-2xl" type="email" placeholder="email">
                        
                    </input>
                    </div>

                    <div className="mt-4">
                    <input  onChange={(e) => {setPassword(e.target.value)}} className="w-full p-5 rounded-2xl" type="password" placeholder="Password">
                        
                    </input>
                    </div>

                    <div className="flex mt-4">
                    <input className="text-[#D43790]" type="checkbox">

                    </input>
                    <div className="flex">
                        <span className="ml-2">I have read the </span><Link to="/TOS" className="ml-1 font-bold text-[#00BFFF]">Terms of use</Link><span className="ml-1">and agree with them</span>
                    </div>
                    </div>

                    <div className="mt-6">
                    <button className="w-full p-2 font-bold bg-[#D43790] rounded-2xl text-[#F7F7F7]">
                        Sign in
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </form>
        </div>
    )
}

export default Chatboard