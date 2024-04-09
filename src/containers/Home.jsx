import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../firebase-config";
import Carousal from "../components/Carousal";
import axios from "axios";
import { Blockquote } from "flowbite-react";
import ProductCards from "../components/ProductCards";
import Trending from "./Trending";

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
      <section>
        <div>
          <Blockquote>
            Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer Shop
            Now
          </Blockquote>
        </div>
      </section>
      <Carousal hightlights={products} />
      <Trending />
    </>
  );
};

export default Home;
