import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { BsFillImageFill, BsArrowDownUp, BsFillPersonFill } from "react-icons/bs"
import { AiFillWechat, AiFillEdit, AiOutlineAreaChart } from "react-icons/ai"

import { useAuthContext } from '../hooks/useAuthContext'

import Sidebar from "../components/Sidebar"


function Chats () {
    const { user } = useAuthContext()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (user && user.username) {
            setUsername(user.username)
            setPassword(user.password)
        }
    })
    return (
        <div className="flex">
            <div className="">
                <Sidebar />
            </div>

            <div className="">
                asd
            </div>
        </div>
    )
}

export default Chats