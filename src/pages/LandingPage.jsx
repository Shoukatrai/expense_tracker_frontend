import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import Feature from "../components/Home/Feature";
import Footer from "../components/Home/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Feature />
      <Footer />
    </div>
  );
};

export default LandingPage;
