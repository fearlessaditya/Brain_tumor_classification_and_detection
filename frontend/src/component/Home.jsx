import React from "react";
import brain from "../assets/brain.webp";


const Home=()=>{
    return (
    <div className="px-8 z-10 sm:pt-20 pt-32 pb-10 text-white gap-8 min-h-screen bg-blue-500">
        <div className="flex flex-col sm:flex-row sm:items-center min-h-screen">

            {/* LEFT PANEL */}
            <div className="sm:w-2/3">
                <h2 className="text-2xl sm:text-5xl font-bold mb-3">Brain Tumor Detection System (MRI Image Analysis)</h2>
                <p className="sm:w-2/3 mt-20 font-semibold">A Brain Tumor Diagnosis Can Be A Daunting Experience. That's Why We're Here To Provide You With Accurate Information And The Resources You Need To Make Informed Decisions About Your Health.</p>
            </div>


            {/* RIGHT PANEL */}
            <div className="">
                <img src={brain} className="w-[300px] sm:w-[40em] sm:mt-0 mt-10 m-auto spin-x"/>
            </div>

        </div>
    </div>
    )
}



export default Home;