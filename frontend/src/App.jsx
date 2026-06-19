import React from "react";
import Home from "./component/Home"
import About from "./component/About"
import Detect from "./component/Detection";
import Navbar from "./component/NavBar";
import Doctor from "./component/Doctor";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Particle from "./component/Particle";
import Chatbot from "./component/ChatBot";
import BatchDetection from "./component/Batch_tumor";


const App=()=>{
    return (
       <Router>
            <Particle/>
            <Chatbot/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/detection" element={<Detect/>}/>
                <Route path="/batch_detection" element={<BatchDetection/>}/>
                <Route path="/doctor" element={<Doctor/>}/>
            </Routes>
       </Router> 
    )
}



export default App;