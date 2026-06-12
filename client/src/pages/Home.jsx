import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ExampleOutputSection from "../components/home/ExampleOutputSection";
import TechStackSection from "../components/home/TechStackSection";
import BenefitsSection from "../components/home/BenefitsSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ExampleOutputSection />
        <TechStackSection />
        <BenefitsSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default Home;