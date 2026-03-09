import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Nike", logo: "NIKE" },
  { name: "Apple", logo: "APPLE" },
  { name: "Sony", logo: "SONY" },
  { name: "Netflix", logo: "NETFLIX" },
  { name: "Spotify", logo: "SPOTIFY" },
  { name: "Adobe", logo: "ADOBE" },
];

const ClientLogos = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      }
    );

    // Staggered logo animation
    gsap.fromTo(
      logosRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 lg:py-32 bg-secondary"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2
          ref={headingRef}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground text-center mb-8 sm:mb-12 md:mb-16"
        >
          Trusted by industry leaders
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {clients.map((client, index) => (
            <div
              key={client.name}
              ref={(el) => (logosRef.current[index] = el)}
              className="flex items-center justify-center p-2 sm:p-4 md:p-6 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            >
              <span className="text-xs sm:text-sm md:text-lg lg:text-2xl font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300">
                {client.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
