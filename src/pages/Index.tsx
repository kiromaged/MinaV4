import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkGallery from "@/components/WorkGallery";
import QuoteSection from "@/components/QuoteSection";
import VideoShowcase from "@/components/VideoShowcase";
import ClientLogos from "@/components/ClientLogos";
import Contact from "@/components/Contact";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scroll setup
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <WorkGallery />
      <QuoteSection />
      <VideoShowcase />
      <ClientLogos />
      <Contact />
    </main>
  );
};

export default Index;
