import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    id: 1,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "Nature Escape",
  },
  {
    id: 2,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    title: "Urban Stories",
  },
  {
    id: 3,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    title: "Adventure",
  },
  {
    id: 4,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    title: "Journey",
  },
  {
    id: 5,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    title: "Moments",
  },
  {
    id: 6,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    title: "Dreams",
  },
  {
    id: 7,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    title: "Motion",
  },
  {
    id: 8,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    title: "Cinematic",
  },
];

interface VideoCardProps {
  video: typeof videos[0];
  index: number;
}

const VideoCard = ({ video, index }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleTimeUpdate = () => {
      if (videoEl.duration) {
        setProgress((videoEl.currentTime / videoEl.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(videoEl.duration);
    };

    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    const cardEl = cardRef.current;
    if (!videoEl || !cardEl) return;

    ScrollTrigger.create({
      trigger: cardEl,
      start: "top 90%",
      end: "bottom 10%",
      onEnter: () => videoEl.play(),
      onLeave: () => videoEl.pause(),
      onEnterBack: () => videoEl.play(),
      onLeaveBack: () => videoEl.pause(),
    });
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current && duration) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-40 sm:w-56 md:w-72 lg:w-80 aspect-[9/16] rounded-lg overflow-hidden group"
    >
      <video
        ref={videoRef}
        src={video.src}
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-foreground font-semibold mb-2 sm:mb-3 text-xs sm:text-base">{video.title}</p>
        
        {/* Seek Bar */}
        <div className="mb-2 sm:mb-3">
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />
        </div>
        
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-1.5 sm:p-2 rounded-full bg-foreground/20 hover:bg-foreground/30 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          )}
        </button>
      </div>
    </div>
  );
};

const VideoShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Row 1 - expands from thin line
      if (row1Ref.current) {
        const cards1 = row1Ref.current.children;
        gsap.fromTo(
          cards1,
          { scaleX: 0.02, scaleY: 0.02, opacity: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: row1Ref.current,
              start: "top 85%",
            },
          }
        );
      }

      // Row 2 - expands from thin line with delay
      if (row2Ref.current) {
        const cards2 = row2Ref.current.children;
        gsap.fromTo(
          cards2,
          { scaleX: 0.02, scaleY: 0.02, opacity: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: row2Ref.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1Videos = videos.slice(0, 4);
  const row2Videos = videos.slice(4, 8);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-8 sm:mb-12 md:mb-16 text-center"
        >
          Video Reels
        </h2>
      </div>

      {/* Row 1 */}
      <div className="mb-4 sm:mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
        <div ref={row1Ref} className="flex gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 pb-4">
          {row1Videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="overflow-x-auto scrollbar-hide">
        <div ref={row2Ref} className="flex gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 pb-4">
          {row2Videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index + 4} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
