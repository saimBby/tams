import { BsFillImageFill, BsInstagram } from "react-icons/bs"
import { AiFillWechat, AiOutlineAreaChart, AiOutlineMenu, AiFillHome } from "react-icons/ai"
import { AiFillBell, AiOutlineDownload, AiOutlineMail } from "react-icons/ai"

import { MdModeNight } from "react-icons/md"
import { FiSettings } from "react-icons/fi" 


import { useAuthContext } from '../hooks/useAuthContext'

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Sidebar from "../components/Sidebar"

// Chat AI echtzeit einbauen mit socket.io
// bcrypt einbauen
// design mit fehlermeldungen integrieren
// Dashboard mit fotos hochgeladen, likes, kommentare
// Mehrere Accounts posting einbauen
// Posting time einstellen
// UI überarbeiten

import Axios from "axios"

function Images () {
    const { user } = useAuthContext()

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null)
    const [caption, setCaption] = useState("")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [profileImage, setProfileImage] = useState([])
    
    useEffect(() => {
        if (user && user.username) {
            setUsername(user.username)
            setPassword(user.password)
        }
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)
        setImagePreview(URL.createObjectURL(file));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append("image", selectedImage)
        formData.append("caption", caption)
        formData.append("username", username)
        formData.append("password", password)

        await Axios.post("http://localhost:4000/upload", formData)
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

    return (
        <div className="flex">
            <div className="flex">
                <Sidebar />
            </div>

            <div className="flex flex-col p-8 w-screen h-1/4">
                <form onSubmit={handleSubmit}>
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

                    <div className="flex">
                        </div>
                            <div className="flex mt-16">
                                <div className="flex flex-col bg-[#f1f2f4] shadow-2xl w-1/2 mr-6">
                                    <div className="p-6">
                                        <h1 className="font-semibold text-2xl">
                                            Image preview
                                        </h1>      
                                    </div>

                                    <div className="p-4">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="mb-4"
                                        accept="image/*"
                                    />
                                    {imagePreview && <img src={imagePreview} alt="Selected" />}
                                </div>
                        </div>

                        <div className="flex flex-col bg-[#f1f2f4] shadow-2xl w-1/2 mr-6 p-6">
                            <div className="flex flex-col">
                                <span>Image Description</span>
                                <input type="text" placeholder="Describe your image" className="p-4 mt-4 border border-[#AE388B] rounded-md">

                                </input>
                            </div>

                            <div className="flex flex-col mt-4">
                                <span>Posting time</span>
                                <input type="text" placeholder="Add a time, your pictures will then be uploaded to Instagram at this time" className="p-4 mt-4 border border-[#AE388B] rounded-md">

                                </input>
                            </div>

                            <div className="flex flex-col mt-4">
                                <div className="flex">
                                    <span>The image will be posted on this account:</span><span className="text-[#AE388B] font-bold ml-1">{username}</span>
                                </div>
                            </div>

                            <div className="flex flex-col mt-4">
                                <button className="flex justify-center font-semibold text-[#F7F7F7] p-2 w-full rounded-xl bg-[#AE388B]">Post to instagram</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Images