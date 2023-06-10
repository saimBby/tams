import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { BsFillImageFill, BsArrowDownUp, BsFillPersonFill } from "react-icons/bs"
import { AiFillWechat, AiFillEdit, AiOutlineAreaChart } from "react-icons/ai"

import { useAuthContext } from '../hooks/useAuthContext'

import classNames from 'classnames'
import Axios from "axios"

import Sidebar from "../components/Sidebar"

function GPTChat () {
    const { user } = useAuthContext()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && user.username) {
            setUsername(user.username)
        }
        if (user && user.password) {
            setPassword(user.password)
        }
    })

    const fetchMessages = async (username) => {
        console.log(username, password)
        try {
            const response = await Axios.get("http://localhost:4000/messages", {
                headers: {
                    user: username,
                }
            });
            setMessages(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Fehler beim Abrufen der Nachrichten:", error);
        }
    }

    useEffect(() => {
        fetchMessages(username)
    }, [username])

    const handleSubmit = async (e) => {
        console.log("sendign message")
        e.preventDefault();

        setLoading(true); // Setze den Zustand "loading" auf "true" während der Anfrage

        try {
        const response = await fetch("http://localhost:4000/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, inputMessage, password }),
        });

        const json = await response.json();
        console.log(json.data);
        } catch (error) {
        console.error("Fehler beim Senden der Nachricht:", error);
        }

        setLoading(false); 
    }

    return (
        <div className="flex">
            <div className="">
                <Sidebar />
            </div>
            
            <form className="w-screen" onSubmit={handleSubmit}>
                <div className="flex flex-col flex-grow h-screen overflow-hidden p-8">
                    <div className="flex flex-col p-8 h-screen overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index}>
                                {message.outgoingmessage && (
                                    <div className="flex justify-end">
                                        <div className="flex bg-blue-500 p-4 rounded-md">
                                            <div className="">
                                                <span className="text-[#F7F7F7] font-semibold">{message.outgoingmessage}</span>
                                            </div>
                                            <div>
                                                <span className="text-[#f1f2f4] ml-2">{message.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {message.incomemessage && (
                                    <div className="flex justify-start mt-6 p-4 rounded-md bg-[#f1f2f4] w-1/4">
                                        <div className="flex flex-col">
                                            <div className="flex justify-between mb-4">
                                                <div className="">
                                                    <span className="text-[#AE388B] font-bold">{message.sendedto}</span>
                                                </div>
                                                <div className="">
                                                    <span className="text-[#AE388B]  ml-2">{message.date}</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                <span>{message.incomemessage}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <input onChange={(e) => {setInputMessage(e.target.value)}} className="bg-[#f1f2f4] border p-4 rounded-l flex-1 text-bold border border-[#000000]" type="text" placeholder="Nachricht eingeben" />
                        <button className="bg-blue-500 text-white px-6 py-4 rounded-r ml-4">Bestätigen</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default GPTChat