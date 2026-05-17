import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/landing/HeroSection";
import TemplateCards from "../components/landing/TemplateCards";
import HowItWorks from "../components/landing/HowItWorks";
import PlatformLogos from "../components/landing/PlatformLogos";
import FeatureCards from "../components/landing/FeatureCards";
import Footer from "../components/landing/Footer";

export default function Landing() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { isAuthenticated, isLoadingAuth } = useAuth();

  useEffect(() => {
    if (isLoadingAuth) return;
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, isLoadingAuth, navigate]);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TemplateCards />
      <HowItWorks />
      <PlatformLogos />
      <FeatureCards />
      <Footer />
    </div>
  );
}