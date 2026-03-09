import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QuoteSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Quote Side */}
          <div ref={quoteRef} className="order-2 lg:order-1">
            <blockquote className="relative">
              <span className="absolute -top-4 sm:-top-6 md:-top-8 -left-2 sm:-left-4 text-5xl sm:text-6xl md:text-8xl text-primary/20 font-serif">
                "
              </span>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-light leading-relaxed text-foreground/90 italic pl-2 sm:pl-4">
                Every frame tells a story, every moment holds a universe of emotions waiting to be captured. 
                My lens is not just a tool—it's a bridge between fleeting seconds and eternal memories.
              </p>
              <span className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 right-0 text-5xl sm:text-6xl md:text-8xl text-primary/20 font-serif">
                "
              </span>
            </blockquote>
            <footer className="mt-10 sm:mt-12 md:mt-16">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground">Alex Rivera</p>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Visual Storyteller</p>
            </footer>
          </div>

          {/* Image Side */}
          <div ref={imageRef} className="order-1 lg:order-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&q=80"
                alt="Photographer at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
