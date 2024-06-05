import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decodeId } from "@/lib/crpyto";
import { LineWave } from "react-loader-spinner";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Container from "@/components/Container";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const decodedId = decodeId(productId);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`https://dummyjson.com/products/${decodedId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [decodedId]);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="#000000"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="capitalize">
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        {product ? (
          <>
            <div className="product-details-container">
              <div className="product-detail-image">
                <img
                  src={product.thumbnail}
                  alt={`Thumbnail of ${product.title}`}
                />
              </div>
              <div className="product-detail-info">
                <div>
                  <span className="flex items-center ">
                    <h2 className="product-detail-title">{product.title}</h2>{" "}
                    <span className="text-red-600 ml-5 text-xl my-auto">
                      -{product.discountPercentage}%
                    </span>
                  </span>
                  <span className="product-detail-links">
                    {product.shippingInformation} | {product.returnPolicy}
                  </span>

                  <p className="product-detail-description">
                    {product.description}
                  </p>
                  <p className="product-detail-price">
                    Price: ${product.price}
                  </p>
                  <p className="product-detail-discountPercentage text-red-600 text-xl my-auto">
                    Discount: {product.discountPercentage.toFixed(2)}% OFF
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </Container>
  );
};

export default ProductDetails;
