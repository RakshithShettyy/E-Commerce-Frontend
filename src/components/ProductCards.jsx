import { encodeId } from "@/lib/crpyto";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCards = ({ products }) => {
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    const encodedId = encodeId(id.toString());
    navigate(`/product-details/${encodedId}`);
  };
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6 ">
      {products.map((product) => (
        <article
          onClick={() => {
            handleCardClick(product.id);
          }}
          key={product.id}
          className="relative flex flex-col overflow-hidden rounded-lg border w-full max-w-xs product-card">
          <div className="aspect-square overflow-hidden">
            <img
              className="h-full w-full object-cover transition-all duration-300 hover:scale-125"
              src={product.thumbnail}
              alt={`Thumbnail of ${product.title}`}
            />
          </div>
          <div className="absolute top-0 left-0 m-2">
            <p className="rounded-full bg-emerald-500 p-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {product.discountPercentage.toFixed(2)}% OFF
            </p>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-between">
            {" "}
            <div className="mb-4">
              <div className="mb-2 flex justify-between items-center">
                <p className="text-lg font-semibold">
                  ${product.price.toFixed(2)}
                </p>
                <del className="text-sm text-gray-400">
                  $
                  {(
                    product.price *
                    (1 + product.discountPercentage / 100)
                  ).toFixed(2)}
                </del>
              </div>
              <h3 className="text-md text-gray-800 dark:text-white">
                {product.title}
              </h3>{" "}
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {product.description}
              </p>{" "}
            </div>
            <button className="mx-auto mt-auto flex h-10 w-10/12 items-stretch overflow-hidden rounded-md bg-gray-100 text-gray-600 hover:bg-emerald-600 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-emerald-700">
              {" "}
              <div className="flex-1 flex items-center justify-center text-xs uppercase">
                Add to Cart
              </div>
              <div className="flex items-center justify-center bg-gray-200 px-4 text-xs dark:bg-gray-600">
                +
              </div>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ProductCards;
