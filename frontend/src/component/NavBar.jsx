import React from "react";
import {NavLink} from "react-router-dom";
import logo from "../assets/logo.webp";


const Navbar=()=>{
    return (
        <nav className="w-full flex justify-between sm:mb-0 mb-20 fixed bg-white z-50 shadow-xl">
            <img className="w-20 h-20" src={logo} alt="logo"/>
            <ul className="flex items-center space-x-5 cursor-pointer mr-5">
                <li className="font-semibold">
                    <NavLink
                        to="/" 
                        className={({ isActive })=>`${isActive ?'bg-sky-400 p-2 rounded border border-black' : 'hover:border-b-2'}`}
                    >Home
                    </NavLink>
                </li>
                <li className="font-semibold">
                    <NavLink
                        to="/about"
                        className={({isActive})=>`${isActive?'bg-sky-400 p-2 rounded border border-black' :'hover:border-b-2'}`}
                    >
                        About
                    </NavLink>
                </li>
                <li className="font-semibold">
                    <NavLink
                        to="/detection"
                        className={({isActive})=>`${isActive?'bg-sky-400 p-2 rounded border border-black' :'hover:border-b-2'}`}
                    >
                        Tumor Dection
                    </NavLink>
                </li>
                <li className="font-semibold">
                    <NavLink
                        to="/batch_detection"
                        className={({isActive})=>`${isActive?'bg-sky-400 p-2 rounded border border-black' :'hover:border-b-2'}`}
                    >
                        Batch Tumor
                    </NavLink>
                </li>
                <li className="font-semibold hover:border-b-3 transition-transform">
                    <NavLink
                        to="/doctor"
                        className={({isActive})=>`${isActive?'bg-sky-400 p-2 rounded border border-black' :'hover:border-b-2'}`}
                    >Doctor
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}



export default Navbar;