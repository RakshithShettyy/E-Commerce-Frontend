import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";

const Carousal = ({ hightlights }) => {
  const [slides, setSlides] = useState([]);
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    const getRandomItems = () => {
      const shuffled = [...hightlights].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5);
    };

    setRandomItems(getRandomItems());
  }, [hightlights]);

  return (
    <div className="h-full sm:h-64 xl:h-80 2xl:h-96 ">
      <Carousel>
        {randomItems.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="block w-full"
            />

            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4">
              {slide.offerText}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousal;
