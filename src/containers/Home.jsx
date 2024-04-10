import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../firebase-config";
import axios from "axios";
import { Blockquote } from "flowbite-react";
import ProductCards from "../components/ProductCards";
import Trending from "./Trending";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Logged in user:", user);
      } else {
        console.log("No user is logged in");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="mt-10 px-20 flex justify-center">
        <Carousel className="w-2/3">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  {/* Card component removed as no border is needed */}
                  <div className="flex aspect-video items-center justify-center p-6">
                    <img
                      src={`/images/banners/banner${index + 1}.jpg`} // Corrected path
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover" // Adjusted for full width and height
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="w-full">
        <Blockquote>
          Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer Shop
          Now
        </Blockquote>
        <Trending />
      </div>

      <section>
        <div></div>
      </section>
    </>
  );
};

export default Home;
