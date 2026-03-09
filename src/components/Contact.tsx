import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Mail, ArrowUpRight, Video } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    tl.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        linksRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 md:mb-8"
          >
            Let's create
            <br />
            something together
          </h2>

          <div ref={contentRef} className="mb-6 sm:mb-8 md:mb-12">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8 px-4">
              Ready to bring your vision to life? I'd love to hear about your
              project.
            </p>

            <a
              href="mailto:hello@studio.com"
              className="inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground hover:text-muted-foreground transition-colors group"
            >
              hello@studio.com
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div ref={linksRef} className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <a
              href="https://vimeo.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
            >
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Vimeo</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Instagram</span>
            </a>
            <a
              href="mailto:hello@studio.com"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 sm:px-6 mt-12 sm:mt-16 md:mt-24 pt-6 sm:pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <span>© 2024 Studio. All rights reserved.</span>
          <span>Based in Los Angeles, CA</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
