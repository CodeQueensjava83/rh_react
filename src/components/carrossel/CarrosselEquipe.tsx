import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

import SlideCarina from "./SlideCarina";
import SlideMaju from "./SlideMaju";
import SlideLuana from "./SlideLuana";
import SlideMilena from "./SlideMilena";
import SlideMyriam from "./SlideMyriam";

export default function CarrosselEquipe() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setSlidesCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", updateIndex);

    updateIndex();

    return () => {
      emblaApi?.off("select", updateIndex);
    };
  }, [emblaApi]);


  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative max-w-6xl mx-auto">

      {/* ÁREA CONTROLADA PELO EMBLA */}
      <div className="overflow-hidden group" ref={emblaRef}>
        <div className="flex">

          <div className="flex-[0_0_100%]">
            <SlideCarina />
          </div>

          <div className="flex-[0_0_100%]">
            <SlideLuana />
          </div>

          <div className="flex-[0_0_100%]">
            <SlideMaju />
          </div>

          <div className="flex-[0_0_100%]">
            <SlideMilena />
          </div>

          <div className="flex-[0_0_100%]">
            <SlideMyriam />
          </div>

        </div>

        {/* BOTÃO ANTERIOR */}
        <button
          onClick={scrollPrev}
          className="cursor-pointer hidden md:flex items-center justify-center 
          w-12 h-12 absolute left-3 top-1/2 -translate-y-1/2 z-20 
          text-white bg-black/20 backdrop-blur-sm
          rounded-full shadow-lg transition hover:bg-black/40"
        >
          <CaretLeftIcon size={40} />
        </button>

        {/* BOTÃO PRÓXIMO */}
        <button
          onClick={scrollNext}
          className="cursor-pointer hidden md:flex items-center justify-center 
          w-12 h-12 absolute right-3 top-1/2 -translate-y-1/2 z-20 
          text-white bg-black/20 backdrop-blur-sm
          rounded-full shadow-lg transition hover:bg-black/40"
        >
          <CaretRightIcon size={40} />
        </button>
      </div>

      {/* MARCADORES */}
      <div className="absolute flex gap-2 -translate-x-1/2 bottom-6 left-1/2 z-20">
        {Array.from({ length: slidesCount }).map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${selectedIndex === idx ? "bg-orange-600 scale-125" : "bg-orange-300"
              }`}
            onClick={() => emblaApi?.scrollTo(idx)}
          />
        ))}
      </div>

    </div>
  );
}
