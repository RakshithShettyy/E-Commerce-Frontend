import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductCards from "../components/ProductCards";
import axios from "axios";

const Trending = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then((response) => {
        console.log(response);
        const allData = response.data;
        const getRandomItems = () => {
          const shuffled = [...allData].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, 4);
        };
        setProducts(getRandomItems());
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <div>
      <PageHeader title="Trending This Week" />
      <ProductCards products={products} />
    </div>
  );
};

export default Trending;
