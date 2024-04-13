import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../firebase-config";
import axios from "axios";
import { Blockquote } from "flowbite-react";
import Trending from "./Trending";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCards from "@/components/ProductCards";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topSelling, setTopSelling] = useState([]);

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
      .get("https://dummyjson.com/products")
      .then((response) => {
        console.log(response);
        setProducts(response?.data?.products);
        const shuffled = response?.data?.products.sort(
          () => 0.5 - Math.random()
        );
        // Get the first 4 items from the shuffled array
        const selected = shuffled.slice(0, 4);
        const topSelling = response.data.products.filter(
          (product) => product.rating > 4
        );
        const UpdatedTop = topSelling.sort(() => 0.5 - Math.random());
        console.log(topSelling);
        setTopSelling(UpdatedTop.slice(0, 4));

        // Set the 4 random products to the trending state
        setTrending(selected);
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
                  <div className="flex aspect-video items-center justify-center p-6">
                    <img
                      src={`/images/banners/banner${index + 1}.jpg`}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
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

      {/* <div className="w-full">
        <Blockquote>
          Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer Shop
          Now
        </Blockquote>
        <Trending />
      </div> */}
      <div className="new-arrival-section ">
        <h1 className="text-center font-semibold text-xl">New Arrival's</h1>
        <ProductCards products={trending} />
      </div>
      <div className="top-selling-section ">
        <h1 className="text-center font-semibold text-xl">Top Selling</h1>
        <ProductCards products={topSelling} />
      </div>
    </>
  );
};

export default Home;
