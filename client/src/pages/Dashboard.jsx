import React, { useState, useEffect } from "react"

import Sidebar from "../components/Sidebar"

import { MdModeNight } from "react-icons/md"
import { FiSettings } from "react-icons/fi" 
import { AiFillBell, AiOutlineDownload, AiOutlineMail } from "react-icons/ai"
import { BsPeopleFill, BsFillImageFill, BsInstagram } from "react-icons/bs"

import { useAuthContext } from '../hooks/useAuthContext'


import Axios from "axios"

function Dashboard () {
    const [messageCount, setMessageCount] = useState(null)
    const [displayedCount, setDisplayedCount] = useState(null)

    const fetchMessages = async () => {
        try {
          const response = await Axios.get("http://localhost:4000/messagecount");
          setMessageCount(response.data);
        } catch (error) {
          console.log("Fehler beim Abrufen der Daten", error);
        }
    };

      
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
                            DASHBOARD
                        </h1>
                        <span className="text-[#AE388B] mt-2 font-bold">
                            Welcome to your Dashboard
                        </span>
                    </div>
                    <div className="">
                        <button className="flex p-3 bg-[#AE388B] mt-1">
                            <AiOutlineDownload className="text-xl text-[#F7F7F7] mt-0.5 mr-2" />
                            <span className="text-[#F7F7F7]">DOWNLOAD REPORTS</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between p-6">
                    <div className="flex flex-col bg-[#f1f2f4] p-6 w-1/4">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <div className="mt-2">
                                    <AiOutlineMail className="text-4xl text-[#AE388B]" />
                                </div>
                                <div className="mt-2">  
                                    <h1 className="text-2xl">{displayedCount && displayedCount.messageCount}</h1>
                                </div>  
                                <div className="mt-2">
                                    <span className="font-bold text-[#AE388B]">Messages</span>
                                </div>
                            </div>
                            <div className="flex flex-col mt-14">
                                Diagram
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#f1f2f4] p-6 w-1/4 ml-4">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <div className="mt-2">
                                    <BsPeopleFill className="text-4xl text-[#AE388B]" />
                                </div>
                                <div className="mt-2">  
                                    <span className="text-2xl">264+</span>
                                </div>  
                                <div className="mt-2">
                                    <span className="font-bold text-[#AE388B]">New Follower's</span>
                                </div>
                            </div>
                            <div className="flex flex-col mt-14">
                                Diagram
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#f1f2f4] p-6 w-1/4 ml-4">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <div className="mt-2">
                                    <BsFillImageFill className="text-4xl text-[#AE388B]" />
                                </div>
                                <div className="mt-2">  
                                    <span className="text-2xl">26+</span>
                                </div>  
                                <div className="mt-2">
                                    <span className="font-bold text-[#AE388B]">Post's posted</span>
                                </div>
                            </div>
                            <div className="flex flex-col mt-14">
                                Diagram
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col bg-[#f1f2f4] p-6 w-1/4 ml-4">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <div className="mt-2">
                                    <BsInstagram className="text-4xl text-[#AE388B]" />
                                </div>
                                <div className="mt-2">  
                                    <span className="text-2xl">56+</span>
                                </div>  
                                <div className="mt-2">
                                    <span className="font-bold text-[#AE388B]">Instagram Storys posted</span>
                                </div>
                            </div>
                            <div className="flex flex-col mt-14">
                                Diagram
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard