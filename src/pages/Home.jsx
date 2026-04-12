import React from "react";
import Hero from "../components/hero";
import Topcars from "../components/topcars";
import Booking from "../components/booking";
import How_it_works from "../components/how_it_works";
import Reviews from "../components/reviews";
import Location from "../components/location";


const Home = () => {
  return (
    <div>
        <Hero/>
        <Topcars/>
        <Booking/>
        <How_it_works/>
        <Reviews/>
        <Location/>
    </div>
  )
}

export default Home