import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Sidebar from "../components/Sidebar"

import { MdModeNight } from "react-icons/md"
import { FiSettings } from "react-icons/fi"
import { AiFillBell, AiOutlineDownload, AiOutlineMail } from "react-icons/ai"
import { BsPeopleFill, BsFillImageFill, BsInstagram } from "react-icons/bs"

import Axios from "axios"
import { useAuthContext } from '../hooks/useAuthContext'

function ManageAccounts() {
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState([])

    const [messageCount, setMessageCount] = useState(null)
    const [displayedCount, setDisplayedCount] = useState(null)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const redirect =  () => {
        navigate("/instalogin")
    }

    const getImage = () => {
        fetch("http://localhost:4000/get-image", {
            method: "GET",


        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setProfileImage(data.data)
        })
    }

    useEffect(() => {
        getImage()
    }, [])

    const fetchMessages = async () => {
        try {
            const response = await Axios.get("http://localhost:4000/messagecount");
            setMessageCount(response.data);
        } catch (error) {
            console.log("Fehler beim Abrufen der Daten", error);
        }
    };

    useEffect(() => {
        if (user && user.username) {
            setUsername(user.username)
            setPassword(user.password)
        }
    })

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (messageCount !== null) {
            setDisplayedCount(messageCount);
        }
    }, [messageCount]);

    return (
        <div className="flex">
            <div className="">
                <Sidebar />
            </div>
            <div className="flex flex-col w-screen">
                <div className="flex justify-between p-6">
                    <div className="">
                        <input type="text" placeholder="Search..." className="bg-[#f1f2f4] p-4 roundex-l focus:outline-none focus:ring-2 focus:ring-blue-500">

                        </input>
                    </div>
                    <div className="flex justify-between p-4 w-44">
                        <MdModeNight className="text-xl" />
                        <FiSettings className="text-xl" />
                        <AiFillBell className="text-xl" />
                    </div>
                </div>

                <div className="flex justify-between p-6">
                    <div className="flex flex-col">
                        <h1 className="text-4xl text-[#000000] font-semibold">
                            Manage your Accounts
                        </h1>
                        <span className="text-[#AE388B] mt-2 font-bold">
                            Here you can manage your Instagram Accounts
                        </span>
                    </div>
                    <div className="">
                        <button className="flex p-3 bg-[#AE388B] mt-1">
                            <AiOutlineDownload className="text-xl text-[#F7F7F7] mt-0.5 mr-2" />
                            <span className="text-[#F7F7F7]">DOWNLOAD REPORTS</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="flex justify-between p-2 w-5/6">
                        <div className="flex p-2 bg-[#f1f2f4] h-3/6 w-4/6 rounded-xl">
                            <div className="mt-2 ml-6">
                                {profileImage.map((imageData) => (
                                    <img
                                        className="rounded-full w-[175px] h-[175px]"
                                        key={imageData._id}
                                        src={`http://localhost:4000/images/${imageData.image}`}
                                        alt={imageData.image}
                                    />
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col p-10">
                                    <h1 className="text-3xl font-semibold">
                                        Zdravko Jovanovic
                                    </h1>
                                    <button className="bg-[#4169E1] mt-4 p-2 rounded-xl font-semibold text-[#F7F7F7] hover:font-bold">
                                        View Account Information
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-2/6 ml-12">
                            <div className="flex p-4 bg-[#4169E1] rounded-t-xl">
                                <div className="">
                                    {profileImage.map((imageData) => (
                                        <img
                                            className="rounded-full w-[100px] h-[100px]"
                                            key={imageData._id}
                                            src={`http://localhost:4000/images/${imageData.image}`}
                                            alt={imageData.image}
                                        />
                                    ))}
                                </div>  
                                <div className="flex flex-col p-4">
                                    <span className="text-2xl font-bold text-[#F7F7F7]">Zdravko</span>
                                    <span className="font-semibold text-[#F7F7F7]">Jovanovic</span>
                                </div>
                            </div>
                            <div className="flex justify-between bg-[#D43790] p-2">
                                <div className="ml-4">
                                    <span className="font-semibold text-[#F7F7F7] hover:text-[#4169E1] hover:font-bold cursor-pointer">Manage Subscription</span>
                                </div>

                                <div className="mr-4">
                                    <span className="font-semibold text-[#F7F7F7] hover:text-[#4169E1] hover:font-bold cursor-pointer">Edit Profile</span>
                                </div>
                            </div>

                            <div className="flex flex-col bg-[#f1f2f4] p-4 mt-4 rounded-b-xl border-2 border-[#4169E1]">
                                <div className="">
                                    <h1 className="text-xl font-bold">
                                        Verbinden
                                    </h1>
                                </div>

                                <div className="mt-4">
                                    <input className="flex justify-center p-2 w-full border border-[#4169E1] rounded-xl" type="text" placeholder="Find your account's">

                                    </input>
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <span>Img</span>
                                        <span>{username}</span>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-8">
                                    <button 
                                    onClick={redirect}
                                    className="bg-[#D43790] rounded-md p-2 text-[#F7F7F7] font-semibold">Click here, to add more Instagram accounts</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageAccounts