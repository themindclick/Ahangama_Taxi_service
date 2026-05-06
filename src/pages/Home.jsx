import React from "react";
import Hero from "../components/hero";
import Topcars from "../components/topcars";
import Booking from "../components/booking";
import Reviews from "../components/reviews";
import Paymentbanner from "../components/paymentbanner";



import Packages from "../components/packages";


const Home = () => {
  return (
    <div>
        <Hero/>
        
        <Paymentbanner/>
        <Packages/>
        <Booking/>
        
        <Reviews/>
        
    </div>
  )
}

export default Home