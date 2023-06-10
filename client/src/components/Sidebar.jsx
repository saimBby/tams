import { BsFillPeopleFill, BsFillFolderFill, BsInstagram, BsBarChartLineFill } from "react-icons/bs"
import { AiOutlineMenu, AiFillHome, AiOutlineWechat, AiFillPlusCircle } from "react-icons/ai"

import { GiPlatform , GiChart } from "react-icons/gi"
import { BiPieChartAlt2 } from "react-icons/bi"

import { MdModeNight } from "react-icons/md"


import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


function Sidebar () {
    const [profilePicture, setProfilePicture] = useState("")
    const [previewProfilePicture, setPreviewProfilePciture] = useState(null)

    const [profileImage, setProfileImage] = useState([])

    const [setting, setSetting] = useState(false)
    const [darkmode, setDarkMode] = useState(false)

    const handleSettings = () => {
        setSetting(!setting);
    };

    
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0]
        
        setProfilePicture(file)
        setPreviewProfilePciture(URL.createObjectURL(file))
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
    
    const uploadProfilePicture = async (e) => {
    
        e.preventDefault();
    
        const fileSizeInBytes = Math.ceil(previewProfilePicture.length * 3 / 4); // Approximation der Größe in Bytes
        const fileSizeInKB = fileSizeInBytes / 1024;
        const fileSizeInMB = fileSizeInKB / 1024;
    
        console.log('Dateigröße in KB:', fileSizeInKB);
        console.log('Dateigröße in MB:', fileSizeInMB);
    
        try {
            const newFormData = new FormData()
            newFormData.append("img", profilePicture)
    
            console.log(newFormData)
    
            await Axios.post("http://localhost:4000/uploaded-image", newFormData)
        } catch (error) {
          console.error("Fehler beim Hochladen des Profilbildes:", error);
        }
    };

    return (
        <form className="flex bg-[#f1f2f4]" onSubmit={uploadProfilePicture}>
            <div className="flex flex-col  h-screen w-72">
                        {setting ? (
                            <div className="relative h-screen">
                                <div className="absolute top-0 left-0 w-full p-4">
                                    <div className="flex flex-col">
                                        <div className="">
                                            <div className="flex justify-center mb-4">
                                                <span className="font-bold text-xl">Account Manager</span>
                                            </div>
                                            <input
                                                accept="iamge/*"
                                                type="file"
                                                onChange={handleProfileImageChange}
                                            />
                                            <button className="mt-4 p-2 w-full text-white font-semibold bg-[#4169E1]" onClick={uploadProfilePicture}>Upload Profile Picture</button>
                                        </div>
                                        <div className="">

                                        </div>
                                    </div>
                                </div>

                                <div class="absolute bottom-0 left-0 w-full p-4">
                                    <button className="p-4 bg-[#4169E1] w-full rounded-xl text-white font-semibold" onClick={handleSettings}>Go back</button>
                                </div>
                            </div>
                            ) : (
                                <div className="">
                                    <div className="flex justify-between p-5">
                                        <div className="flex">
                                            <h1 className="text-4xl text-[#000000] font-bold">
                                                T
                                            </h1>
                                            <h1 className="text-4xl text-[#4169E1] font-bold">
                                                AMS
                                            </h1>
                                        </div>

                                        <div className="flex p-2">
                                            <AiOutlineMenu onClick={handleSettings} className="text-2xl"/>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
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
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <div className="">
                                            <span className="text-[#4169E1] font-bold text-xl">
                                                Zdravko Jovanovic
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <div className="">
                                            <span className="text-[#AE388B] font-bold">
                                                Owner
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col p-8">
                                            <div className="flex">
                                                <div className="">
                                                    <AiFillHome className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/Dashboard" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        Dashboard
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mt-10">
                                                <span className="">Data</span>
                                            </div>

                                            <div className="flex mt-6">
                                                <div className="">
                                                    <BsFillPeopleFill className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/ManageAccout" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        Manage Accounts
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="flex mt-10">
                                                <div className="">
                                                    <BsFillFolderFill className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/Dashboard" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        Manage AI Profile
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="flex mt-10">
                                                <div className="">
                                                    <GiPlatform className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/Dashboard" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        Platforms
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mt-10">
                                                <span className="">Pages</span>
                                            </div>

                                            <div className="flex mt-6">
                                                <div className="">
                                                    <BsInstagram className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/Images" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        Instagram Post's
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="flex mt-10">
                                                <div className="">
                                                    <AiFillPlusCircle className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/Dashboard" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        Instagram Storys
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="flex mt-10">
                                                <div className="">
                                                    <AiOutlineWechat className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/AIChat" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        AI Chating
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mt-10">
                                                <span className="">Chart's</span>
                                            </div>

                                            <div className="flex mt-10">
                                                <div className="">
                                                    <BsBarChartLineFill className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/Dashboard" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        Bar Chart
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="flex mt-10">
                                                <div className="">
                                                    <BiPieChartAlt2 className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/Dashboard" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        Pie Chart
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="flex mt-10">
                                                <div className="">
                                                    <GiChart className="text-xl text-[#4169E1]"/>
                                                </div>
                                                <div className="ml-4">
                                                    <Link to="/Dashboard" className="text-[#4169E1] font-semibold hover:text-[#AE388B]">
                                                        Line Chart
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                )}
                            </div>
                        </form>
    )
}

export default Sidebar