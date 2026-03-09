import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Mountain Escape",
    category: "Travel Film",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 2,
    title: "Urban Nights",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
  },
  {
    id: 3,
    title: "Brand Story",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
  },
  {
    id: 4,
    title: "Wedding Day",
    category: "Event",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    id: 5,
    title: "Product Launch",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    id: 6,
    title: "Nature Documentary",
    category: "Documentary",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  },
];

const WorkGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
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

    // Cards animation with alternating directions
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const fromX = index % 2 === 0 ? -80 : 80;
      
      gsap.fromTo(
        card,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-8 sm:mb-12 md:mb-16 text-center"
        >
          Selected Work
        </h2>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-4 md:p-6">
                <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1 sm:mb-2">
                  {project.category}
                </span>
                <h3 className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-foreground">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGallery;
