import { useEffect, useState } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Home from "./pages/Home";

import Countries from "./pages/Countries";

import ApplyVisa from "./pages/ApplyVisa";

import TrackVisa from "./pages/TrackVisa";

import About from "./pages/About";

import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";

import Loader from "./components/Loader/Loader";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
function App() {

  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    setTimeout(()=>{

      setLoading(false);

    },2500);

  },[]);

  if(loading){

    return <Loader />;
  }

  return (

    <>
    
      <ScrollProgress />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/countries" element={<Countries />} />

        <Route path="/apply-visa" element={<ApplyVisa />} />

        <Route path="/track-visa" element={<TrackVisa />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
        
       <Route path="/visa-control-center" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />
      </Routes>

    </>

  );
}

export default App;